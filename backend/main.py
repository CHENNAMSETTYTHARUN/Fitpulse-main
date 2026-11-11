import hashlib
import sqlite3
import time
from pathlib import Path
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(
    title="Fitpulse Fitness Backend",
    description="Backend API for Fitpulse with Signup, Login, Logout, and Contact Form storage.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_pna_header(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Private-Network"] = "true"
    return response

@app.options("/{full_path:path}")
def options_handler(full_path: str):
    from fastapi.responses import Response
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Private-Network": "true",
        }
    )

DB_PATH = Path(__file__).resolve().parent / "database.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            subject TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()

class SignupData(BaseModel):
    name: str
    email: str
    password: str
    phone: Optional[str] = ""

class LoginData(BaseModel):
    email: str
    password: str

class ContactData(BaseModel):
    name: str
    email: str
    message: str
    phone: Optional[str] = ""
    subject: Optional[str] = "General Inquiry"

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def check_password(entered_password: str, stored_password: str) -> bool:
    if entered_password == stored_password:
        return True
    if hash_password(entered_password) == stored_password:
        return True
    return False

@app.post("/api/signup", status_code=201)
@app.post("/signup", status_code=201)
def signup(data: SignupData):
    name = data.name.strip()
    email = data.email.strip().lower()
    phone = (data.phone or "").strip()
    password = data.password

    if not name or not email or not password:
        raise HTTPException(status_code=400, detail="Name, email, and password are required.")

    if len(password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters.")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=409, detail="This email is already registered. Please log in.")

    user_id = f"user_{int(time.time() * 1000)}"
    hashed_pwd = hash_password(password)

    cursor.execute(
        "INSERT INTO users (id, name, email, phone, password) VALUES (?, ?, ?, ?, ?)",
        (user_id, name, email, phone, hashed_pwd)
    )
    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": "Account created successfully! Please log in.",
        "user": {
            "id": user_id,
            "name": name,
            "email": email,
            "phone": phone
        }
    }

@app.post("/api/login")
@app.post("/login")
def login(data: LoginData):
    email = data.email.strip().lower()
    password = data.password

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password are required.")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, phone, password FROM users WHERE email = ?", (email,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="No account found with this email. Please sign up first.")

    user_id, name, user_email, phone, stored_password = row

    if not check_password(password, stored_password):
        raise HTTPException(status_code=401, detail="Incorrect password. Please try again.")

    return {
        "success": True,
        "message": f"Welcome back, {name}!",
        "user": {
            "id": user_id,
            "name": name,
            "email": user_email,
            "phone": phone or ""
        }
    }

@app.post("/api/logout")
@app.get("/api/logout")
@app.post("/logout")
@app.get("/logout")
def logout():
    return {
        "success": True,
        "message": "Successfully logged out."
    }

@app.post("/api/contact", status_code=201)
@app.post("/contact", status_code=201)
@app.post("/api/enquiry", status_code=201)
def save_contact(data: ContactData):
    name = data.name.strip()
    email = data.email.strip().lower()
    phone = (data.phone or "").strip()
    subject = (data.subject or "General Inquiry").strip()
    message = data.message.strip()

    if not name or not email or not message:
        raise HTTPException(status_code=400, detail="Name, email, and message are required.")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)",
        (name, email, phone, subject, message)
    )
    contact_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": "Thank you! Your contact form has been submitted and saved successfully.",
        "contact_id": contact_id
    }

@app.get("/api/contacts")
@app.get("/contacts")
def get_contacts():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, phone, subject, message, created_at FROM contacts ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()

    contacts = [
        {
            "id": r[0],
            "name": r[1],
            "email": r[2],
            "phone": r[3],
            "subject": r[4],
            "message": r[5],
            "created_at": r[6]
        }
        for r in rows
    ]
    return {"success": True, "count": len(contacts), "contacts": contacts}

@app.get("/api/users")
@app.get("/users")
def get_users():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, phone, created_at FROM users ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()

    users = [
        {
            "id": r[0],
            "name": r[1],
            "email": r[2],
            "phone": r[3],
            "created_at": r[4]
        }
        for r in rows
    ]
    return {"success": True, "count": len(users), "users": users}

@app.get("/api/contact-info")
def get_contact_info():
    return {
        "phone": "+91 98765 43210",
        "address": "Salem, Tamil Nadu, India",
        "email": "hello@fitpulse.example",
        "social_media": {
            "facebook": "https://www.facebook.com/people/Stackly-Stackly/pfbid02NmgSaxmeD8WJngqrhKudvxzak9GvzPLz6YS9NMdJJM9rSeJ7ZTyG6h3HF3p3koBEl/?rdid=3qmngFeLJe3ChGfe&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BrqaZkJRe%2F",
            "instagram": "https://www.instagram.com/thestackly",
            "linkedin": "https://www.linkedin.com/company/the-stackly/",
            "twitter": "https://x.com/The_Stackly"
        }
    }

@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "Fitpulse Backend",
        "database": str(DB_PATH)
    }

candidate_dirs = [
    Path(__file__).resolve().parent.parent / "fitpulse-main",
    Path(__file__).resolve().parent / "fitpulse-main",
    Path(__file__).resolve().parent.parent,
    Path.cwd() / "fitpulse-main",
    Path.cwd(),
]

for candidate in candidate_dirs:
    if (candidate / "index.html").exists() and candidate != Path(__file__).resolve().parent:
        app.mount("/", StaticFiles(directory=str(candidate), html=True), name="frontend")
        break

if __name__ == "__main__":
    import sys
    import uvicorn
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    uvicorn.run(app, host="127.0.0.1", port=8000)
