import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, m as maybeRenderHead } from "./astro/server-DD07jsDe.js";
import "piccolore";
import "clsx";
const siteConfig = {
  // Business Information
  business: {
    name: "HVAC Template",
    fullName: "ABC Company Heating and Cooling"
  },
  // Location
  location: {
    city: "New York",
    state: "SC",
    address: "3648 Rorance Road"
  },
  // Contact
  contact: {
    email: "dealer@domain.com",
    phone: "0123456789",
    phoneFormatted: "012-345-6789"
  },
  // Brand Colors (used in CSS variables)
  colors: {
    primary: "#0A2540",
    // Deep navy blue - professional, trustworthy
    secondary: "#1E88E5",
    // Bright blue - HVAC cooling, modern
    tertiary: "#E3F2FD",
    // Light blue - clean, airy
    quaternary: "#FAFAFA",
    // Off-white - clean background
    accent: "#00897B",
    // Teal - balanced temperature
    highlight: "#FF6F00"
  },
  // Logo
  logo: {
    src: "/images/dealer-logo-96.webp",
    alt: "Acme Inc. Logo"
  },
  // SEO
  seo: {
    siteName: "Acme Inc.",
    defaultDescription: "Denver's trusted digital marketing agency. Indoor billboard ads, web design, PPC, social media & Connected TV. Free consultation!",
    keywords: "digital marketing Denver, local advertising Denver, indoor billboard advertising, website design Denver, PPC advertising, social media management, Connected TV advertising, OTT ads, geofencing, local SEO Denver",
    siteUrl: "https://acmeinc.com",
    // Update with actual domain
    ogImage: "https://acmeinc.com/og-image.jpg",
    // Update with actual OG image
    twitterHandle: "@acmeinc"
  }
};
function getLocationText(text) {
  return text.replaceAll("{city}", siteConfig.location.city).replaceAll("{state}", siteConfig.location.state).replaceAll("{business}", siteConfig.business.name).replaceAll("{fullName}", siteConfig.business.fullName);
}
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://acmeinc.com");
const $$PopupModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PopupModal;
  const {
    delay = 5e3,
    showOnce = true,
    triggerId = "free-scan-trigger"
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<div id="popup-modal" class="fixed inset-0 z-[200] hidden items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="popup-title"', "", "", ' data-astro-cid-i6oesblb> <div class="popup-card animate-popup-in" data-astro-cid-i6oesblb> <!-- Close button --> <button id="close-popup" class="popup-close" aria-label="Close popup" data-astro-cid-i6oesblb> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-i6oesblb> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" data-astro-cid-i6oesblb></path> </svg> </button> <!-- Header with background pattern --> <div class="popup-header" data-astro-cid-i6oesblb> <div class="popup-header-bg" data-astro-cid-i6oesblb></div> <div class="popup-header-content" data-astro-cid-i6oesblb> <div class="popup-badge" data-astro-cid-i6oesblb> <div class="popup-badge-dot" data-astro-cid-i6oesblb></div> <span data-astro-cid-i6oesblb>Limited Time</span> </div> <h2 id="popup-title" class="popup-header-title" data-astro-cid-i6oesblb>$69 HVAC Diagnostic</h2> <p class="popup-header-subtitle" data-astro-cid-i6oesblb>Complete system inspection & performance report</p> </div> <!-- Floating price circle --> <div class="popup-price-circle" data-astro-cid-i6oesblb> <div class="popup-price-inner" data-astro-cid-i6oesblb> <span class="popup-price-currency" data-astro-cid-i6oesblb>$</span> <span class="popup-price-amount" data-astro-cid-i6oesblb>69</span> </div> <div class="popup-price-label" data-astro-cid-i6oesblb>Special Price</div> </div> </div> <!-- Content --> <div class="popup-content" data-astro-cid-i6oesblb> <!-- Features grid --> <div class="popup-features-grid" data-astro-cid-i6oesblb> <div class="popup-feature-card" data-astro-cid-i6oesblb> <div class="popup-feature-icon" data-astro-cid-i6oesblb> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-i6oesblb> <path d="M9 12l2 2 4-4" data-astro-cid-i6oesblb></path> <circle cx="12" cy="12" r="9" data-astro-cid-i6oesblb></circle> </svg> </div> <div class="popup-feature-text" data-astro-cid-i6oesblb> <h4 data-astro-cid-i6oesblb>Complete Inspection</h4> <p data-astro-cid-i6oesblb>Full system diagnostic</p> </div> </div> <div class="popup-feature-card" data-astro-cid-i6oesblb> <div class="popup-feature-icon" data-astro-cid-i6oesblb> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-i6oesblb> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-i6oesblb></path> <polyline points="14,2 14,8 20,8" data-astro-cid-i6oesblb></polyline> <line x1="16" y1="13" x2="8" y2="13" data-astro-cid-i6oesblb></line> <line x1="16" y1="17" x2="8" y2="17" data-astro-cid-i6oesblb></line> <polyline points="10,9 9,9 8,9" data-astro-cid-i6oesblb></polyline> </svg> </div> <div class="popup-feature-text" data-astro-cid-i6oesblb> <h4 data-astro-cid-i6oesblb>Detailed Report</h4> <p data-astro-cid-i6oesblb>Performance analysis</p> </div> </div> <div class="popup-feature-card" data-astro-cid-i6oesblb> <div class="popup-feature-icon" data-astro-cid-i6oesblb> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-i6oesblb> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-i6oesblb></path> </svg> </div> <div class="popup-feature-text" data-astro-cid-i6oesblb> <h4 data-astro-cid-i6oesblb>No Hidden Fees</h4> <p data-astro-cid-i6oesblb>Transparent pricing</p> </div> </div> </div> <!-- Trust indicators --> <div class="popup-trust-bar" data-astro-cid-i6oesblb> <div class="popup-trust-item" data-astro-cid-i6oesblb> <svg class="popup-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-i6oesblb> <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-astro-cid-i6oesblb></path> </svg> <span data-astro-cid-i6oesblb>Licensed & Insured</span> </div> <div class="popup-trust-item" data-astro-cid-i6oesblb> <svg class="popup-trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-i6oesblb> <circle cx="12" cy="12" r="10" data-astro-cid-i6oesblb></circle> <polyline points="12,6 12,12 16,14" data-astro-cid-i6oesblb></polyline> </svg> <span data-astro-cid-i6oesblb>Same Day Service</span> </div> </div> <!-- Action buttons --> <div class="popup-actions" data-astro-cid-i6oesblb> <a href="/contact" class="popup-btn popup-btn-primary" data-astro-cid-i6oesblb> <svg class="popup-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-i6oesblb> <rect x="3" y="4" width="18" height="18" rx="2" ry="2" data-astro-cid-i6oesblb></rect> <line x1="16" y1="2" x2="16" y2="6" data-astro-cid-i6oesblb></line> <line x1="8" y1="2" x2="8" y2="6" data-astro-cid-i6oesblb></line> <line x1="3" y1="10" x2="21" y2="10" data-astro-cid-i6oesblb></line> </svg>\nSchedule Online\n</a> <a', ' class="popup-btn popup-btn-secondary" data-astro-cid-i6oesblb> <svg class="popup-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-i6oesblb> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-i6oesblb></path> </svg>\nCall ', ` </a> </div> <button id="close-popup-bottom" class="popup-dismiss" data-astro-cid-i6oesblb>No thanks, maybe later</button> </div> </div> </div> <script>
  function showPopup(force) {
    var popup = document.getElementById("popup-modal");
    if (!popup) return;
    if (!force && sessionStorage.getItem("popup-shown") === "true") return;
    popup.classList.remove("hidden");
    popup.classList.add("flex");
    document.body.style.overflow = "hidden";
    sessionStorage.setItem("popup-shown", "true");
  }

  function closePopup() {
    var popup = document.getElementById("popup-modal");
    if (!popup) return;
    popup.classList.add("hidden");
    popup.classList.remove("flex");
    document.body.style.overflow = "";
  }

  function initPopup() {
    var popup = document.getElementById("popup-modal");
    if (!popup) return;

    var alreadyShown = sessionStorage.getItem("popup-shown") === "true";
    var triggerId = popup.getAttribute("data-trigger-id");
    var abortController = new AbortController();
    var signal = abortController.signal;

    var closeBtn = document.getElementById("close-popup");
    var closeBtnBottom = document.getElementById("close-popup-bottom");
    if (closeBtn) closeBtn.addEventListener("click", closePopup, { signal: signal });
    if (closeBtnBottom) closeBtnBottom.addEventListener("click", closePopup, { signal: signal });
    popup.addEventListener("click", function(e) { if (e.target === popup) closePopup(); }, { signal: signal });
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && !popup.classList.contains("hidden")) closePopup();
    }, { signal: signal });

    if (triggerId) {
      var trigger = document.getElementById(triggerId);
      if (trigger) trigger.addEventListener("click", function(e) {
        e.preventDefault();
        showPopup(true);
      }, { signal: signal });
    }

    var delay = parseInt(popup.getAttribute("data-delay") || "0") || 0;
    if (delay > 0 && window.innerWidth >= 768 && !alreadyShown) {
      setTimeout(function() { if (window.innerWidth >= 768) showPopup(false); }, delay);
    }

    document.addEventListener('astro:before-swap', function() {
      closePopup();
      abortController.abort();
    }, { once: true });
  }

  document.addEventListener("astro:page-load", initPopup);
<\/script> `])), maybeRenderHead(), addAttribute(delay, "data-delay"), addAttribute(showOnce, "data-show-once"), addAttribute(triggerId, "data-trigger-id"), addAttribute(`tel:${siteConfig.contact.phone}`, "href"), siteConfig.contact.phoneFormatted);
}, "C:/Users/rodriguez/TemplateHvac/src/components/ui/PopupModal.astro", void 0);
const $$FreeScanButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="free-scan-wrapper" class="hidden md:block fixed bottom-8 right-8 z-40" data-astro-cid-xlg5khpw> <button id="free-scan-trigger" class="fab-btn group" aria-label="$69 service request special" data-astro-cid-xlg5khpw> <!-- Icon --> <span class="fab-icon" data-astro-cid-xlg5khpw> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-xlg5khpw> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" data-astro-cid-xlg5khpw></path> </svg> </span> <!-- Text --> <span class="fab-text" data-astro-cid-xlg5khpw> <span class="fab-label" data-astro-cid-xlg5khpw>Service Special</span> <span class="fab-value" data-astro-cid-xlg5khpw>$69 Offer</span> </span> <!-- Highlight strip --> <span class="fab-strip" data-astro-cid-xlg5khpw></span> </button> </div> `;
}, "C:/Users/rodriguez/TemplateHvac/src/components/ui/FreeScanButton.astro", void 0);
export {
  $$PopupModal as $,
  $$FreeScanButton as a,
  getLocationText as g,
  siteConfig as s
};
