// Fitpulse page content and behavior live here; styles are in styles.css.
const iconPaths = {
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  dumbbell: '<path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/><path d="m3 14 7 7"/><path d="m14 3 7 7"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
  moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  sparkle: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z"/><path d="m19 14 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  zap: '<path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  facebook: '<path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.5-.14-2.85-.14C11.75 2 10 3.68 10 7.5v2H7v4h3V22h4v-8.5z"/>',
  instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
  linkedin: '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74V10.13H5.07v8.37z"/>',
  twitter: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
};

const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.sparkle}</svg>`;

const images = {
  gym: "assets/gym-4k.jpg",
  strength: "assets/strength-4k.jpg",
  coaching: "assets/coaching-4k.jpg",
  cycling: "assets/cycling-4k.jpg",
  yoga: "assets/yoga-4k.jpg",
  football: "assets/football-4k.jpg",
  basketball: "assets/basketball-4k.jpg",
  running: "assets/running-4k.jpg",
  coach: "assets/coach.jpg",
};

const navigation = [
  ["home", "Home"],
  ["programs", "Programs"],
  ["sports", "Sports"],
  ["membership", "Membership"],
  ["about", "About"],
  ["contact", "Contact"],
];

const programs = [
  {
    name: "Strength training",
    description: "Build strength with smart, coach-led sessions.",
    image: "strength",
    icon: "dumbbell",
  },
  {
    name: "Cardio & endurance",
    description: "Find your pace and build stamina that lasts.",
    image: "running",
    icon: "heart",
  },
  {
    name: "Sports performance",
    description: "Train with purpose. Show up ready to play.",
    image: "football",
    icon: "zap",
  },
  {
    name: "Mobility & recovery",
    description: "Move freely and feel better in every session.",
    image: "yoga",
    icon: "sparkle",
  },
];

const programCards = [
  {
    name: "Find your strength",
    category: "strength",
    description: "A progressive plan for building confidence and strength.",
    image: "strength",
    label: "Strength",
  },
  {
    name: "Everyday energy",
    category: "weight loss",
    description: "A balanced, sustainable approach to feeling your best.",
    image: "coaching",
    label: "Personal training",
  },
  {
    name: "Go the distance",
    category: "endurance",
    description: "Build a stronger engine, one good session at a time.",
    image: "running",
    label: "Endurance",
  },
  {
    name: "Move with ease",
    category: "flexibility",
    description: "Find more mobility, balance and room to breathe.",
    image: "yoga",
    label: "Mobility",
  },
  {
    name: "Play your best",
    category: "strength",
    description: "Get game-ready with sport-specific conditioning.",
    image: "football",
    label: "Sports",
    searchTerms: "football basketball",
  },
  {
    name: "Start where you are",
    category: "weight loss",
    description: "Simple, welcoming workouts that fit your life.",
    image: "gym",
    label: "All levels",
  },
];

const sports = [
  {
    name: "Football",
    description: "Build agility, speed and confidence on the pitch.",
    image: "football",
    label: "Team sports",
  },
  {
    name: "Basketball",
    description: "Train coordination, quickness and explosive power.",
    image: "basketball",
    label: "Court sports",
  },
  {
    name: "Running",
    description: "Find a training rhythm that takes you further.",
    image: "running",
    label: "Endurance",
  },
  {
    name: "Cycling",
    description: "Build your engine with focused cycling sessions.",
    image: "cycling",
    label: "Endurance",
  },
];

const coaches = [
  ["Sarah Mitchell", "Strength & conditioning", "4.9", "coach.jpg"],
  ["James Carter", "Sports performance", "4.8", "coaching-4k.jpg"],
  ["Priya Sharma", "Yoga & mobility", "5.0", "yoga-4k.jpg"],
  ["Daniel Wilson", "Endurance coaching", "4.9", "running-4k.jpg"],
];

const plans = [
  {
    name: "Essential",
    monthlyPrice: 49,
    description: "A great place to get moving and find your rhythm.",
    features: ["Full gym access", "Group classes", "Member community"],
  },
  {
    name: "Plus",
    monthlyPrice: 79,
    description: "Extra guidance to help you keep making progress.",
    features: ["Everything in Essential", "Personalised training plan", "Monthly coach check-in", "Priority class booking"],
    featured: true,
  },
  {
    name: "Unlimited",
    monthlyPrice: 99,
    description: "One-to-one coaching for your biggest goals.",
    features: ["Everything in Plus", "Weekly personal training", "Nutrition guidance", "Guest passes"],
  },
];

const faqs = [
  [
    "Can I cancel my membership at any time?",
    "Yes. You can cancel from your account at any time. If you have a fixed-term plan, the cancellation details will be shown before you join.",
  ],
  ["Can I try Fitpulse before joining?", "Absolutely. New members can try a 7-day pass before choosing a membership."],
  ["What payment methods do you accept?", "We accept major credit and debit cards, UPI and online banking."],
  ["Is there a joining fee?", "No. There is no joining fee for any Fitpulse plan."],
  ["Are personal trainers included?", "Our Plus plan includes monthly coach check-ins. Unlimited includes a weekly personal training session."],
];

const testimonials = [
  [
    "The plan actually fits my life. I feel stronger, more consistent, and a lot more confident.",
    "Emily Davis",
    "Fitpulse member",
  ],
  [
    "Great coaches, zero intimidation, and a community that makes showing up easier.",
    "Michael Brown",
    "Plus member",
  ],
  [
    "The small, steady progress adds up. I’m enjoying exercise again for the first time in years.",
    "Sophia Patel",
    "Unlimited member",
  ],
];

const navLinks = document.querySelector("#nav-links");
const app = document.querySelector("#app");
const loadingScreen = document.querySelector("#loading-screen");
const toastElement = document.querySelector("#toast");
const themeToggle = document.querySelector("#theme-toggle");
let currentRoute = "";
let renderTimer;
let loadingTimer;
let loadingStartedAt = performance.now();
let toastTimer;
let revealObserver;

function showLoader() {
  window.clearTimeout(loadingTimer);
  loadingStartedAt = performance.now();
  loadingScreen.setAttribute("aria-hidden", "false");
  loadingScreen.classList.add("is-visible");
  app.setAttribute("aria-busy", "true");
}

function hideLoader() {
  const minimumDuration = 500;
  const remainingDuration = Math.max(0, minimumDuration - (performance.now() - loadingStartedAt));

  window.clearTimeout(loadingTimer);
  loadingTimer = window.setTimeout(() => {
    loadingScreen.classList.remove("is-visible");
    loadingScreen.setAttribute("aria-hidden", "true");
    app.removeAttribute("aria-busy");
  }, remainingDuration);
}

function imagePath(name) {
  return images[name] || images.gym;
}

function heading(kicker, title, description, centered = false) {
  return `
    <div class="section-heading reveal${centered ? " centered" : ""}">
      <div>
        <span class="eyebrow">${kicker}</span>
        <h2>${title}</h2>
      </div>
      <p>${description}</p>
    </div>`;
}

function hero({ kicker, title, description, image, primary, href, note }) {
  const words = title.replace(/[.!?]$/, "").split(" ");
  const lastWord = words.pop();
  const titleMarkup = `${words.join(" ")} <em>${lastWord}</em>`;

  return `
    <section class="hero" aria-labelledby="hero-title">
      <img class="hero-image" src="${imagePath(image)}" alt="" fetchpriority="high" />
      <div class="hero-shade"></div>
      <div class="hero-content">
        <span class="eyebrow">${kicker}</span>
        <h1 id="hero-title">${titleMarkup}</h1>
        <p class="hero-description">${description}</p>
        <div class="hero-actions">
          <a class="button button-accent" href="${href}">${primary}${icon("arrow")}</a>
          <span class="hero-note">${icon("check")}${note}</span>
        </div>
      </div>
      <div class="hero-stats" aria-label="Fitpulse community">
        <div class="hero-stat"><strong>10k+</strong><span>active members</span></div>
        <div class="hero-stat"><strong>50+</strong><span>expert coaches</span></div>
        <div class="hero-stat"><strong>4.9/5</strong><span>member rating</span></div>
      </div>
    </section>`;
}

function ticker() {
  const words = ["Strength", "Cardio", "Mobility", "Football", "Running", "Good energy"];
  const repeatedWords = [...words, ...words];

  return `
    <div class="ticker" aria-label="Fitpulse training: ${words.join(", ")}">
      <div class="ticker-track" aria-hidden="true">
        ${repeatedWords.map((word) => `<span class="ticker-item">${word}</span>`).join("")}
      </div>
    </div>`;
}

function programPreview() {
  return `
    <section class="shell">
      ${heading(
        "Made for real life",
        "A plan that moves with you.",
        "Start with what matters to you. Our coaches help you find a pace you can keep.",
      )}
      <div class="program-layout">
        <div class="program-list reveal" id="program-list">
          ${programs
            .map(
              (program, index) => `
                <button
                  class="program-item${index === 0 ? " is-active" : ""}"
                  type="button"
                  data-program="${index}"
                  aria-pressed="${index === 0}"
                >
                  <span class="program-number">0${index + 1}</span>
                  <span class="program-copy">
                    <strong>${program.name}</strong>
                    <span>${program.description}</span>
                  </span>
                  <span class="icon" aria-hidden="true">${icon("arrow")}</span>
                </button>`,
            )
            .join("")}
          <a class="button button-outline" href="#programs">Explore all programs ${icon("arrow")}</a>
        </div>
        <div class="program-visual reveal" id="program-visual" aria-label="Featured training program">
          ${programs
            .map(
              (program, index) => `
                <img
                  src="${imagePath(program.image)}"
                  alt=""
                  class="${index === 0 ? "is-active" : ""}"
                  data-program-image="${index}"
                  loading="lazy"
                />`,
            )
            .join("")}
          <div class="visual-label">
            <span class="icon">${icon(programs[0].icon)}</span>
            <span><strong id="visual-title">${programs[0].name}</strong><span>Built around your goals</span></span>
          </div>
        </div>
      </div>
    </section>`;
}

function imageCard(item, index) {
  return `
    <article
      class="image-card reveal"
      style="transition-delay:${index * 70}ms"
      data-category="${item.category || ""}"
      data-search="${`${item.name} ${item.description} ${item.label} ${item.category || ""} ${item.searchTerms || ""}`.toLowerCase()}"
    >
      <img src="${imagePath(item.image)}" alt="" loading="lazy" />
      <div class="image-card-copy">
        <span class="card-kicker">${item.label}</span>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <a class="text-link" href="#signup">Explore ${icon("arrow")}</a>
      </div>
    </article>`;
}

function coachCards() {
  return coaches
    .map(
      ([name, specialty, rating, image], index) => `
        <article class="coach-card reveal" style="transition-delay:${index * 60}ms">
          <div class="coach-photo">
            <img src="assets/${image}" alt="${name}, ${specialty} coach" loading="lazy" />
            <span class="coach-rating">${icon("star")}${rating}</span>
          </div>
          <div class="coach-info">
            <h3>${name}</h3>
            <p>${specialty}</p>
          </div>
        </article>`,
    )
    .join("");
}

function planCards(yearly = false) {
  return plans
    .map((plan) => {
      const price = yearly ? Math.round(plan.monthlyPrice * 0.8) : plan.monthlyPrice;

      return `
        <article class="plan-card reveal${plan.featured ? " is-featured" : ""}">
          <div class="plan-topline">
            <span>${plan.name}</span>
            ${plan.featured ? '<span class="plan-badge">Most popular</span>' : ""}
          </div>
          <p class="plan-price">$${price}<span> / month</span></p>
          <p class="plan-description">${plan.description}</p>
          <ul class="plan-features">
            ${plan.features.map((feature) => `<li>${icon("check")}${feature}</li>`).join("")}
          </ul>
          <a class="button ${plan.featured ? "button-accent" : "button-outline"}" href="#signup">
            Choose ${plan.name}
          </a>
        </article>`;
    })
    .join("");
}

function pricingSection(includeToggle = false) {
  return `
    <section class="shell" id="plans">
      ${heading(
        "Membership",
        "Good things happen when you show up.",
        "Choose the support that feels right for you. Change your plan whenever your goals change.",
        true,
      )}
      ${
        includeToggle
          ? `
            <div class="pricing-switch" id="pricing-switch" role="group" aria-label="Billing period">
              <button type="button" class="is-active" data-billing="monthly" aria-pressed="true">Monthly</button>
              <button type="button" data-billing="yearly" aria-pressed="false">Yearly <span class="save-note">· save 20%</span></button>
            </div>`
          : ""
      }
      <div class="plan-grid" id="plan-grid">${planCards()}</div>
    </section>`;
}

function testimonialsSection() {
  return `
    <section class="shell">
      ${heading(
        "Good company",
        "Progress looks different on everyone.",
        "A little encouragement can make a big difference. Hear from the people who make Fitpulse.",
      )}
      <div class="testimonial-grid">
        ${testimonials
          .map(
            ([quote, name, membership], index) => `
              <figure class="testimonial reveal" style="transition-delay:${index * 70}ms">
                <div class="stars" aria-label="5 out of 5 stars">${icon("star")}${icon("star")}${icon("star")}${icon("star")}${icon("star")}</div>
                <blockquote>“${quote}”</blockquote>
                <figcaption><strong>${name}</strong>${membership}</figcaption>
              </figure>`,
          )
          .join("")}
      </div>
    </section>`;
}

function faqSection() {
  return `
    <section class="shell">
      ${heading(
        "A few quick answers",
        "Good to know before you go.",
        "Still have a question? Our friendly team is happy to help.",
        true,
      )}
      <div class="faq-list">
        ${faqs
          .map(
            ([question, answer], index) => `
              <article class="faq-item reveal" style="transition-delay:${index * 45}ms">
                <h3>
                  <button
                    class="faq-question"
                    type="button"
                    aria-expanded="false"
                    aria-controls="faq-answer-${index}"
                  >
                    ${question}<span class="icon">${icon("plus")}</span>
                  </button>
                </h3>
                <div class="faq-answer" id="faq-answer-${index}">${answer}</div>
              </article>`,
          )
          .join("")}
      </div>
    </section>`;
}

function callToAction(title, description) {
  return `
    <section class="shell">
      <div class="cta-panel reveal">
        <div>
          <span class="eyebrow">YOUR NEXT STEP</span>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
        <a class="button button-light" href="#signup">Start your 7-day pass ${icon("arrow")}</a>
      </div>
    </section>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <div class="shell">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="#home"><span class="brand-mark" aria-hidden="true">F</span><span>fitpulse<span class="brand-period">.</span></span></a>
            <p>Find your pace. Feel good in your body and build a routine that stays with you.</p>
            <div class="footer-socials" aria-label="Official Social Media Links">
              <a href="https://www.facebook.com/people/Stackly-Stackly/pfbid02NmgSaxmeD8WJngqrhKudvxzak9GvzPLz6YS9NMdJJM9rSeJ7ZTyG6h3HF3p3koBEl/?rdid=3qmngFeLJe3ChGfe&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BrqaZkJRe%2F" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${icon("facebook")}</a>
              <a href="https://www.instagram.com/thestackly" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${icon("instagram")}</a>
              <a href="https://www.linkedin.com/company/the-stackly/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${icon("linkedin")}</a>
              <a href="https://x.com/The_Stackly" target="_blank" rel="noopener noreferrer" aria-label="Twitter">${icon("twitter")}</a>
            </div>
          </div>
          <div class="footer-column">
            <h2>Explore</h2>
            <a href="#programs">Programs</a><a href="#sports">Sports</a><a href="#membership">Membership</a>
          </div>
          <div class="footer-column">
            <h2>Fitpulse</h2>
            <a href="#about">Our story</a><a href="#about">Meet the team</a><a href="#contact">Contact</a>
          </div>
          <div class="footer-column">
            <h2>Get started</h2>
            <a href="#signup">Create an account</a><a href="#login">Log in</a><a href="#membership">FAQs</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} Fitpulse. Move at your own pace.</span>
          <span>Made for stronger, happier days.</span>
        </div>
      </div>
    </footer>`;
}

function homePage() {
  return `
    ${hero({
      kicker: "Movement for every kind of you",
      title: "Find your pace.",
      description: "Expert coaches, thoughtful training plans, and a community that makes showing up feel good.",
      image: "gym",
      primary: "Find your program",
      href: "#programs",
      note: "A welcoming place to start",
    })}
    <section class="shell">
      <div class="intro-strip reveal">
        <p>Fitness doesn’t have to be all-or-nothing. Find a routine that feels good, fits real life, and helps you keep going.</p>
        <div class="trust-row">
          <span>${icon("check")} All levels welcome</span>
          <span>${icon("check")} Expert-led plans</span>
          <span>${icon("check")} Your pace, always</span>
        </div>
      </div>
    </section>
    ${ticker()}
    ${programPreview()}
    <section class="shell">
      ${heading("Move your way", "What are you in the mood for?", "From your first gym session to your next personal best, there’s a place for you here.")}
      <div class="card-grid">${sports.slice(0, 3).map(imageCard).join("")}</div>
    </section>
    <section class="shell">
      ${heading("People who get you", "Good coaches make all the difference.", "Work with experienced coaches who listen first and help you build a plan that fits.")}
      <div class="coach-grid">${coachCards()}</div>
    </section>
    ${pricingSection()}
    ${testimonialsSection()}
    ${callToAction("A good day to get started.", "Take your first week at your own pace. We’ll be right here when you’re ready.")}
    ${footer()}`;
}

function programsPage() {
  const filters = ["All programs", "Weight loss", "Strength", "Endurance", "Flexibility"];

  return `
    ${hero({
      kicker: "Programs for real life",
      title: "Your goals. Your way.",
      description: "A little more strength, a little more energy, or a brand-new challenge. Find a plan that meets you where you are.",
      image: "strength",
      primary: "See membership",
      href: "#membership",
      note: "Personalised around you",
    })}
    <section class="shell">
      ${heading("A place to begin", "Pick a goal. We’ll help with the rest.", "Explore coach-guided programs designed to make progress feel achievable.")}
      <div class="filter-bar" id="program-filters">
        ${filters
          .map(
            (filter, index) => `
              <button
                type="button"
                class="filter-chip${index === 0 ? " is-active" : ""}"
                data-filter="${filter.toLowerCase()}"
                aria-pressed="${index === 0}"
              >${filter}</button>`,
          )
          .join("")}
      </div>
      <div class="card-grid" id="program-cards">${programCards.map(imageCard).join("")}</div>
    </section>
    ${programPreview()}
    ${callToAction("The best plan is the one you enjoy.", "Tell us what you’re working towards. We’ll help you build a routine that works for you.")}
    ${footer()}`;
}

function sportsPage() {
  return `
    ${hero({
      kicker: "Find your game",
      title: "Train for the joy of it.",
      description: "Build your skills, feel stronger, and get ready for whatever game day means to you.",
      image: "football",
      primary: "Find your sport",
      href: "#sports-list",
      note: "Train with supportive coaches",
    })}
    <section class="shell" id="sports-list">
      ${heading("Find your sport", "A little friendly competition?", "Choose a sport, build your foundation, and enjoy getting better one session at a time.")}
      <div class="card-grid">${sports.map(imageCard).join("")}</div>
    </section>
    <section class="shell">
      ${heading("The good stuff", "Room to learn. Space to grow.", "Our coaches, flexible schedules, and welcoming community make it easier to keep moving.")}
      <div class="values-grid">
        <article class="value-card reveal"><span class="icon">${icon("users")}</span><h3>Good people</h3><p>Train alongside a community that cheers on every kind of progress.</p></article>
        <article class="value-card reveal"><span class="icon">${icon("sparkle")}</span><h3>Expert guidance</h3><p>Get practical, personal support from coaches who care about your goals.</p></article>
        <article class="value-card reveal"><span class="icon">${icon("heart")}</span><h3>Find your rhythm</h3><p>Flexible sessions help you make movement part of your everyday.</p></article>
      </div>
    </section>
    ${callToAction("Your next favorite thing might be here.", "Come for a session, meet your coaches, and see how it feels.")}
    ${footer()}`;
}

function membershipPage() {
  return `
    ${hero({
      kicker: "Membership that fits",
      title: "Good support. No pressure.",
      description: "Choose the level of coaching that feels right today. You can always change things as you go.",
      image: "gym",
      primary: "Compare plans",
      href: "#plans",
      note: "No joining fee",
    })}
    ${pricingSection(true)}
    ${faqSection()}
    ${footer()}`;
}

function aboutPage() {
  return `
    ${hero({
      kicker: "A little about us",
      title: "Better together.",
      description: "We believe feeling good is a better goal than looking a certain way. Fitpulse is here to make movement more welcoming, personal, and part of everyday life.",
      image: "coaching",
      primary: "Come meet us",
      href: "#signup",
      note: "Everyone belongs here",
    })}
    <section class="shell">
      <div class="about-grid">
        <div class="about-copy reveal">
          <span class="eyebrow">Why Fitpulse</span>
          <h2>Made for the person you are today.</h2>
          <p>We started with a simple idea: getting active should feel like something you do for yourself, not something you have to do perfectly. So we brought together thoughtful coaches, flexible programs, and a community that celebrates small wins.</p>
          <div class="stats-grid">
            <div class="stat-card"><strong data-count="10">0</strong><span>thousand members</span></div>
            <div class="stat-card"><strong data-count="50">0</strong><span>expert coaches</span></div>
            <div class="stat-card"><strong data-count="5">0</strong><span>years moving together</span></div>
          </div>
        </div>
        <div class="about-image reveal">
          <img src="${imagePath("coach")}" alt="A coach helping a member with her training" loading="lazy" />
        </div>
      </div>
    </section>
    <section class="shell">
      ${heading("What we believe", "Progress has no one-size-fits-all.", "These are the things we come back to in every class, conversation, and coaching session.")}
      <div class="values-grid">
        <article class="value-card reveal"><span class="icon">${icon("heart")}</span><h3>People first</h3><p>We listen, meet you where you are, and make space for everyone.</p></article>
        <article class="value-card reveal"><span class="icon">${icon("sparkle")}</span><h3>Small steps count</h3><p>Good habits are built with patience, kindness, and a little consistency.</p></article>
        <article class="value-card reveal"><span class="icon">${icon("users")}</span><h3>Better together</h3><p>We celebrate each other and make it easier to keep showing up.</p></article>
      </div>
    </section>
    ${callToAction("Come as you are. Start when you’re ready.", "There’s always room for one more in the Fitpulse community.")}
    ${footer()}`;
}

function authPage(isSignup) {
  const mode = isSignup ? "signup" : "login";

  return `
    <section class="auth-layout">
      <div class="auth-image">
        <img src="${imagePath(isSignup ? "strength" : "gym")}" alt="" />
        <div class="auth-image-copy">
          <span class="eyebrow">MOVE AT YOUR PACE</span>
          <h2>Make room for feeling good.</h2>
          <p>Small steps, steady progress, and a community in your corner.</p>
        </div>
      </div>
      <div class="auth-content">
        <form class="auth-form" id="auth-form" data-mode="${mode}" novalidate>
          <span class="eyebrow">${isSignup ? "YOUR NEXT CHAPTER" : "GOOD TO SEE YOU"}</span>
          <h1>${isSignup ? "Join Fitpulse." : "Welcome back."}</h1>
          <p class="auth-intro">${isSignup ? "Create your account and take your first week at your own pace." : "Log in to pick up where you left off."}</p>
          <div class="auth-switch" aria-label="Account options">
            <a href="#login" class="${isSignup ? "" : "is-active"}" ${isSignup ? "" : 'aria-current="page"'}>Log in</a>
            <a href="#signup" class="${isSignup ? "is-active" : ""}" ${isSignup ? 'aria-current="page"' : ""}>Create account</a>
          </div>
          ${isSignup ? '<label class="field-label" for="full-name">Your name</label><input class="field-input" id="full-name" name="name" type="text" autocomplete="name" placeholder="Alex Morgan" required />' : ""}
          ${isSignup ? '<label class="field-label" for="phone">Phone number</label><input class="field-input" id="phone" name="phone" type="tel" autocomplete="tel" placeholder="+91 98765 43210" />' : ""}
          <label class="field-label" for="email">Email address</label>
          <input class="field-input" id="email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required />
          <label class="field-label" for="password">Password</label>
          <input class="field-input" id="password" name="password" type="password" autocomplete="${isSignup ? "new-password" : "current-password"}" minlength="6" placeholder="At least 6 characters" required />
          <div class="auth-options">
            <label><input type="checkbox" name="remember" /> Remember me</label>
            <a href="#login" data-forgot-password>Forgot password?</a>
          </div>
          <button class="button button-dark" type="submit">${isSignup ? "Create your account" : "Log in"}</button>
          <p class="auth-disclaimer">${isSignup ? "Secure SQLite backed registration." : "Secure SQLite backed authentication."}</p>
        </form>
      </div>
    </section>`;
}

function contactPage() {
  return `
    ${hero({
      kicker: "WE ARE HERE FOR YOU",
      title: "Get in touch.",
      description: "Have questions about our programs, memberships, or personal coaching? Reach out to our team or visit us.",
      image: "coaching",
      primary: "Explore programs",
      href: "#programs",
      note: "Prompt response within 24 hours",
    })}
    <section class="shell">
      <div class="contact-grid">
        <div class="contact-info-card reveal">
          <span class="eyebrow">OUR LOCATION & DETAILS</span>
          <h2>Connect with Fitpulse</h2>
          <p style="color:var(--ink-soft); margin: 8px 0 24px;">Drop by our center or reach out directly through any of our channels.</p>

          <div class="contact-info-item">
            <span class="contact-info-icon">${icon("map-pin")}</span>
            <div>
              <h3>Address</h3>
              <p>Salem, Tamil Nadu, India</p>
            </div>
          </div>

          <div class="contact-info-item">
            <span class="contact-info-icon">${icon("phone")}</span>
            <div>
              <h3>Phone</h3>
              <p><a href="tel:+919876543210">+91 98765 43210</a></p>
            </div>
          </div>

          <div class="contact-info-item">
            <span class="contact-info-icon">${icon("mail")}</span>
            <div>
              <h3>Email</h3>
              <p><a href="mailto:hello@fitpulse.example">hello@fitpulse.example</a></p>
            </div>
          </div>

          <div style="margin-top: 30px; padding-top: 22px; border-top: 1px solid var(--line);">
            <h3 style="margin: 0 0 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-soft);">Official Social Media</h3>
            <div class="contact-social-pills">
              <a class="contact-social-pill" href="https://www.facebook.com/people/Stackly-Stackly/pfbid02NmgSaxmeD8WJngqrhKudvxzak9GvzPLz6YS9NMdJJM9rSeJ7ZTyG6h3HF3p3koBEl/?rdid=3qmngFeLJe3ChGfe&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BrqaZkJRe%2F" target="_blank" rel="noopener noreferrer">
                ${icon("facebook")} Facebook
              </a>
              <a class="contact-social-pill" href="https://www.instagram.com/thestackly" target="_blank" rel="noopener noreferrer">
                ${icon("instagram")} Instagram
              </a>
              <a class="contact-social-pill" href="https://www.linkedin.com/company/the-stackly/" target="_blank" rel="noopener noreferrer">
                ${icon("linkedin")} LinkedIn
              </a>
              <a class="contact-social-pill" href="https://x.com/The_Stackly" target="_blank" rel="noopener noreferrer">
                ${icon("twitter")} Twitter (X)
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form-card reveal">
          <span class="eyebrow">SEND US A MESSAGE</span>
          <h2>We'd love to hear from you</h2>
          <p style="color:var(--ink-soft); margin: 8px 0 20px;">Fill out this form and our team will get back to you shortly.</p>

          <div class="contact-success-box" id="contact-success" role="alert">
            <strong>Message Received!</strong> Your inquiry has been saved to the database. Our team will contact you soon.
          </div>

          <form id="contact-form" novalidate>
            <label class="field-label" for="contact-name">Full name</label>
            <input class="field-input" id="contact-name" name="name" type="text" placeholder="Alex Morgan" required />

            <label class="field-label" for="contact-email">Email address</label>
            <input class="field-input" id="contact-email" name="email" type="email" placeholder="alex@example.com" required />

            <label class="field-label" for="contact-phone">Phone number</label>
            <input class="field-input" id="contact-phone" name="phone" type="tel" placeholder="+91 98765 43210" />

            <label class="field-label" for="contact-subject">Goal / Interest</label>
            <select class="field-input" id="contact-subject" name="subject">
              <option value="General Inquiry">General Inquiry</option>
              <option value="Strength Training">Strength Training</option>
              <option value="Cardio & Endurance">Cardio & Endurance</option>
              <option value="Sports Performance">Sports Performance</option>
              <option value="Personal Coaching">Personal Coaching</option>
              <option value="Membership Plans">Membership Plans</option>
            </select>

            <label class="field-label" for="contact-message">Message</label>
            <textarea class="field-input" id="contact-message" name="message" rows="4" style="padding: 12px; resize: vertical;" placeholder="Tell us how we can help you..." required></textarea>

            <button class="button button-dark" type="submit" style="width: 100%; margin-top: 20px;">
              Send Message ${icon("arrow")}
            </button>
          </form>
        </div>
      </div>
    </section>
    ${callToAction("Ready to begin your fitness journey?", "Join Fitpulse today and find your pace with supportive coaches.")}
    ${footer()}`;
}

const pages = {
  home: homePage,
  programs: programsPage,
  sports: sportsPage,
  membership: membershipPage,
  about: aboutPage,
  contact: contactPage,
  login: () => authPage(false),
  signup: () => authPage(true),
};

function showToast(message) {
  toastElement.textContent = message;
  toastElement.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastElement.classList.remove("is-visible");
  }, 2800);
}

const apiBase = window.location.origin.includes(":8000") ? "" : "http://127.0.0.1:8000";

function updateNavigation(route) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    const active = link.hash === `#${route}`;
    link.classList.toggle("is-active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const loginLink = document.querySelector("#login-link");
  if (loginLink) {
    const rawUser = localStorage.getItem("fitpulse_user");
    if (rawUser) {
      try {
        const user = JSON.parse(rawUser);
        const namePart = user.name ? user.name.split(" ")[0] : "Member";
        loginLink.hidden = false;
        loginLink.textContent = `Log out (${namePart})`;
        loginLink.href = "#logout";
        loginLink.onclick = async (e) => {
          e.preventDefault();
          try {
            await fetch(`${apiBase}/api/logout`, { method: "POST" });
          } catch (err) {
            console.log("Logout API call error:", err);
          }
          localStorage.removeItem("fitpulse_user");
          showToast("Successfully logged out.");
          updateNavigation("home");
          window.location.hash = "#home";
        };
      } catch (err) {
        localStorage.removeItem("fitpulse_user");
        loginLink.textContent = "Log in";
        loginLink.href = "#login";
        loginLink.onclick = null;
        loginLink.hidden = route === "login";
      }
    } else {
      loginLink.textContent = "Log in";
      loginLink.href = "#login";
      loginLink.onclick = null;
      loginLink.hidden = route === "login";
    }
  }
}

function observeReveals() {
  revealObserver?.disconnect();
  const elements = document.querySelectorAll(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((element) => revealObserver.observe(element));
}

function applySearch(query) {
  const cards = document.querySelectorAll("#program-cards .image-card");
  const search = query.trim().toLowerCase();
  let matches = 0;

  document.querySelectorAll("#program-filters [data-filter]").forEach((button) => {
    const active = button.dataset.filter === "all programs";
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  cards.forEach((card) => {
    const matchesSearch = !search || card.dataset.search.includes(search);
    card.classList.toggle("is-filtered", !matchesSearch);
    if (matchesSearch) matches += 1;
  });

  if (cards.length > 0) {
    showToast(matches ? `Showing ${matches} matching program${matches === 1 ? "" : "s"}.` : "No programs match that search.");
    document.querySelector("#program-cards")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function renderPage() {
  const hash = window.location.hash.slice(1);
  const isRoute = Boolean(pages[hash]);
  const previousRoute = app.dataset.route || currentRoute;

  if (!isRoute && previousRoute) {
    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  const route = isRoute ? hash : "home";

  if (route === previousRoute) {
    if (isRoute) window.scrollTo(0, 0);
    return;
  }
  currentRoute = route;
  app.dataset.route = route;
  window.clearTimeout(renderTimer);
  if (!previousRoute || route === "login" || route === "signup") {
    showLoader();
  }
  app.classList.add("is-transitioning");
  updateNavigation(route);
  closeMenu();

  renderTimer = window.setTimeout(() => {
    app.innerHTML = pages[route]();
    app.classList.remove("is-transitioning");

    wirePage(route);
    observeReveals();

    if (route === "about") {
      animateCounters();
    }

    if (window.location.hash === `#${route}` || !window.location.hash) {
      window.scrollTo(0, 0);
    } else {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    hideLoader();
  }, 140);
}

function closeMenu() {
  const menuToggle = document.querySelector("#menu-toggle");
  navLinks.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.innerHTML = `<span class="icon" aria-hidden="true">${icon("menu")}</span>`;
}

function wireProgramSelector() {
  const buttons = document.querySelectorAll("[data-program]");
  const pictures = document.querySelectorAll("[data-program-image]");
  const title = document.querySelector("#visual-title");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.program);

      buttons.forEach((item, index) => {
        const active = index === selected;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      pictures.forEach((picture, index) => {
        picture.classList.toggle("is-active", index === selected);
      });

      title.textContent = programs[selected].name;
      document.querySelector(".visual-label .icon").innerHTML = icon(programs[selected].icon);
    });
  });
}

function wireProgramFilters() {
  const filters = document.querySelector("#program-filters");
  if (!filters) return;

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    const selected = button.dataset.filter;
    filters.querySelectorAll("[data-filter]").forEach((filterButton) => {
      const active = filterButton === button;
      filterButton.classList.toggle("is-active", active);
      filterButton.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("#program-cards .image-card").forEach((card) => {
      const matches = selected === "all programs" || card.dataset.category === selected;
      card.classList.toggle("is-filtered", !matches);
    });
  });
}

function wirePricing() {
  const billingSwitch = document.querySelector("#pricing-switch");
  if (!billingSwitch) return;

  billingSwitch.addEventListener("click", (event) => {
    const button = event.target.closest("[data-billing]");
    if (!button) return;

    const yearly = button.dataset.billing === "yearly";
    billingSwitch.querySelectorAll("[data-billing]").forEach((option) => {
      const active = option === button;
      option.classList.toggle("is-active", active);
      option.setAttribute("aria-pressed", String(active));
    });

    document.querySelector("#plan-grid").innerHTML = planCards(yearly);
    observeReveals();
  });
}

function wireFaq() {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpening = !item.classList.contains("is-open");

      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("is-open");
        faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      if (isOpening) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function wireAuthForm() {
  const form = document.querySelector("#auth-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;
    const name = form.elements.name ? form.elements.name.value.trim() : "";
    const phone = form.elements.phone ? form.elements.phone.value.trim() : "";
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail || password.length < 6 || (form.dataset.mode === "signup" && !name)) {
      form.classList.remove("form-shake");
      void form.offsetWidth;
      form.classList.add("form-shake");
      showToast("Enter a valid email and complete all required fields.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Please wait...";
    }

    try {
      if (form.dataset.mode === "signup") {
        try {
          const response = await fetch(`${apiBase}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, phone })
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.detail || "Signup failed. Please try again.");
          }
          showToast(data.message || "Account created successfully! Please log in.");
          window.location.hash = "#login";
          return;
        } catch (apiErr) {
          if (apiErr.message && !apiErr.message.toLowerCase().includes("fetch")) {
            throw apiErr;
          }
          let localUsers = [];
          try { localUsers = JSON.parse(localStorage.getItem("fitpulse_local_users") || "[]"); } catch (e) {}
          if (localUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            throw new Error("This email is already registered. Please log in.");
          }
          localUsers.push({ id: `user_${Date.now()}`, name, email, phone, password });
          localStorage.setItem("fitpulse_local_users", JSON.stringify(localUsers));
          showToast("Account created! (Saved locally. Start backend for SQLite database).");
          window.location.hash = "#login";
          return;
        }
      } else {
        try {
          const response = await fetch(`${apiBase}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.detail || "Login failed. Check your email or password.");
          }
          if (data.user) {
            localStorage.setItem("fitpulse_user", JSON.stringify(data.user));
          }
          showToast(data.message || "Logged in successfully!");
          updateNavigation("home");
          window.location.hash = "#home";
          return;
        } catch (apiErr) {
          if (apiErr.message && !apiErr.message.toLowerCase().includes("fetch")) {
            throw apiErr;
          }
          let localUsers = [];
          try { localUsers = JSON.parse(localStorage.getItem("fitpulse_local_users") || "[]"); } catch (e) {}
          const found = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
          if (found) {
            localStorage.setItem("fitpulse_user", JSON.stringify({ id: found.id, name: found.name, email: found.email, phone: found.phone }));
            showToast(`Welcome back, ${found.name}!`);
            updateNavigation("home");
            window.location.hash = "#home";
            return;
          }
          throw new Error("Backend server is not running! Start server: cd backend; python main.py");
        }
      }
    } catch (err) {
      form.classList.remove("form-shake");
      void form.offsetWidth;
      form.classList.add("form-shake");
      showToast(err.message || "Operation failed.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });

  form.querySelector("[data-forgot-password]")?.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Password recovery: please contact hello@fitpulse.example or support.");
  });
}

function wireContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = form.elements.name ? form.elements.name.value.trim() : "";
    const email = form.elements.email ? form.elements.email.value.trim() : "";
    const phone = form.elements.phone ? form.elements.phone.value.trim() : "";
    const subject = form.elements.subject ? form.elements.subject.value : "General Inquiry";
    const message = form.elements.message ? form.elements.message.value.trim() : "";

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !validEmail || !message) {
      showToast("Please enter your name, valid email, and message.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn ? submitBtn.innerHTML : "Send Message";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Saving to database...";
    }

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Failed to submit contact form.");
      }
      showToast(data.message || "Message saved successfully into database!");
      const successBox = document.querySelector("#contact-success");
      if (successBox) {
        successBox.classList.add("is-visible");
      }
      form.reset();
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes("fetch")) {
        let localContacts = [];
        try { localContacts = JSON.parse(localStorage.getItem("fitpulse_local_contacts") || "[]"); } catch (e) {}
        localContacts.push({ id: Date.now(), name, email, phone, subject, message, date: new Date().toISOString() });
        localStorage.setItem("fitpulse_local_contacts", JSON.stringify(localContacts));
        showToast("Inquiry saved locally! (Start backend to sync into SQLite database).");
        const successBox = document.querySelector("#contact-success");
        if (successBox) {
          successBox.classList.add("is-visible");
        }
        form.reset();
      } else {
        showToast(err.message || "Failed to submit form.");
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
}

function wirePage(route) {
  wireProgramSelector();
  wireProgramFilters();
  wirePricing();
  wireFaq();
  wireAuthForm();
  wireContactForm();

  if (route === "programs" && window.sessionStorage.getItem("fitpulse-search")) {
    const query = window.sessionStorage.getItem("fitpulse-search");
    window.sessionStorage.removeItem("fitpulse-search");
    applySearch(query);
  }
}

function animateCounters() {
  document.querySelectorAll("[data-count]").forEach((element) => {
    const target = Number(element.dataset.count);
    const duration = 900;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = Math.round(target * (1 - (1 - progress) ** 3));
      if (progress < 1) window.requestAnimationFrame(update);
    }

    window.requestAnimationFrame(update);
  });
}

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  themeToggle.title = `Switch to ${isDark ? "light" : "dark"} mode`;
  themeToggle.innerHTML = `<span class="icon" aria-hidden="true">${icon(isDark ? "sun" : "moon")}</span>`;
  window.localStorage.setItem("fitpulse-theme", theme);
}

function initializeTheme() {
  const savedTheme = window.localStorage.getItem("fitpulse-theme");
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  setTheme(savedTheme || preferredTheme);
}

function wireChat() {
  const launcher = document.querySelector("#chat-launcher");
  const panel = document.querySelector("#chat-panel");
  const messages = document.querySelector("#chat-messages");
  const questions = document.querySelector("#chat-questions");
  const closeButton = document.querySelector("#chat-close");

  questions.innerHTML = faqs
    .map(([question], index) => `<button type="button" data-question="${index}">${question}</button>`)
    .join("");

  function setOpen(open) {
    launcher.setAttribute("aria-expanded", String(open));
    launcher.setAttribute("aria-label", open ? "Close membership help" : "Open membership help");
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
    if (open) closeButton.focus();
  }

  launcher.addEventListener("click", () => {
    setOpen(launcher.getAttribute("aria-expanded") !== "true");
  });
  closeButton.addEventListener("click", () => setOpen(false));

  questions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-question]");
    if (!button) return;

    const [question, answer] = faqs[Number(button.dataset.question)];
    const userMessage = document.createElement("p");
    userMessage.className = "chat-message is-user";
    userMessage.textContent = question;

    const answerMessage = document.createElement("p");
    answerMessage.className = "chat-message";
    answerMessage.textContent = answer;

    messages.append(userMessage, answerMessage);
    messages.scrollTop = messages.scrollHeight;
  });
}

function initializeNavigation() {
  navLinks.innerHTML = navigation
    .map(([route, label]) => `<a class="nav-link" href="#${route}">${label}</a>`)
    .join("");

  document.querySelector("#menu-toggle").addEventListener("click", (event) => {
    const button = event.currentTarget;
    const open = button.getAttribute("aria-expanded") !== "true";
    navLinks.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    button.innerHTML = `<span class="icon" aria-hidden="true">${icon(open ? "close" : "menu")}</span>`;
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.querySelector("#site-search").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const query = event.currentTarget.value.trim();
    if (!query) {
      showToast("Type a program or goal to search.");
      return;
    }

    window.sessionStorage.setItem("fitpulse-search", query);
    if (window.location.hash === "#programs") {
      applySearch(query);
    } else {
      window.location.hash = "#programs";
    }
  });
}

function initializePage() {
  initializeTheme();
  document.querySelectorAll("[data-icon]").forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });
  initializeNavigation();
  wireChat();
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  window.addEventListener("scroll", () => {
    document.querySelector("#site-header").classList.toggle("is-scrolled", window.scrollY > 15);
  }, { passive: true });

  window.addEventListener("hashchange", renderPage);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      document.querySelector("#chat-close").click();
    }
  });

  renderPage();
}

initializePage();
