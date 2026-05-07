// ===========================================
// SITE CONFIGURATION
// Update this file with client information
// All components will automatically use these values
// ===========================================

export const siteConfig = {
  // Business Information
  business: {
    name: "HVAC Template",
    fullName: "ABC Company Heating and Cooling",
    tagline: "Heating and Cooling",
    description: "Professional HVAC Services",
  },

  // Location
  location: {
    city: "New York",
    state: "SC",
    address: "3648 Rorance Road",
    fullAddress: "3648 Rorance Road, New York, SC 29170",
  },

  // Contact
  contact: {
    email: "dealer@domain.com",
    phone: "0123456789",
    phoneFormatted: "012-345-6789",
  },

  // Brand Colors (used in CSS variables)
  colors: {
    primary: "#0A2540",      // Deep navy blue - professional, trustworthy
    secondary: "#1E88E5",    // Bright blue - HVAC cooling, modern
    tertiary: "#E3F2FD",     // Light blue - clean, airy
    quaternary: "#FAFAFA",   // Off-white - clean background
    accent: "#00897B",       // Teal - balanced temperature
    highlight: "#FF6F00",    // Warm orange - heating, energy, urgency
    couponYellow: "#FFD700", // Bright yellow - coupon accent
    couponCyan: "#00D4D4",   // Cyan - coupon accent
    couponOrange: "#FF6B35", // Coral orange - coupon accent
  },

  // Logo
  logo: {
    src: "/images/dealer-logo-96.webp",
    alt: "Acme Inc. Logo",
  },

  // Social Media (optional)
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },

  // SEO
  seo: {
    siteName: "Acme Inc.",
    defaultTitle: "Acme Inc. | Digital Marketing in Denver",
    defaultDescription: "Denver's trusted digital marketing agency. Indoor billboard ads, web design, PPC, social media & Connected TV. Free consultation!",
    keywords: "digital marketing Denver, local advertising Denver, indoor billboard advertising, website design Denver, PPC advertising, social media management, Connected TV advertising, OTT ads, geofencing, local SEO Denver",
    siteUrl: "https://acmeinc.com", // Update with actual domain
    ogImage: "https://acmeinc.com/og-image.jpg", // Update with actual OG image
    twitterHandle: "@acmeinc",
  },

  // Template Info
  template: {
    id: "8",
    name: "Progressive Section Layout",
  },
}

// Helper to get location-aware text
export function getLocationText(text: string): string {
  return text
    .replaceAll("{city}", siteConfig.location.city)
    .replaceAll("{state}", siteConfig.location.state)
    .replaceAll("{business}", siteConfig.business.name)
    .replaceAll("{fullName}", siteConfig.business.fullName)
}

// Process an array of strings through getLocationText
export function processLocationArray(arr: string[]): string[] {
  return arr.map(getLocationText)
}
