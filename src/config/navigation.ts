export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

export interface ServiceCategory {
  title: string
  icon: string
  items: { title: string; href: string }[]
}

export interface MegaMenuItem {
  title: string
  href: string
  categories: ServiceCategory[]
}

// Utility links (top-right area)
export const utilityNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    children: [
      { title: "Specials and Offers", href: "/specials-and-offers" },
    ],
  },
  { title: "Reviews", href: "/reviews" },
  { title: "Contact Us", href: "/contact" },
  { title: "Careers", href: "/careers" },
  {
    title: "Service Areas",
    href: "/service-areas",
    children: [
      { title: "Santa Monica", href: "/santa-monica" },
      { title: "Pasadena", href: "/pasadena" },
      { title: "Glendale", href: "/glendale" },
    ],
  },
]

// Quick action items
export const quickActions = [
  { title: "Maintenance Plan", href: "/maintenance-plan", icon: "settings" },
  { title: "Financing", href: "/financing", icon: "dollar" },
]

// Primary service navigation with mega menu categories
export const mainNavItems: MegaMenuItem[] = [
  {
    title: "Air Conditioning Services",
    href: "/air-conditioning",
    categories: [
      {
        title: "AC Services",
        icon: "snowflake",
        items: [
          { title: "AC Repair", href: "/air-conditioning/ac-repair" },
          { title: "AC Tune-Up/ Maintenance", href: "/air-conditioning/ac-tune-up-maintenance" },
          { title: "AC Installation and Replacement", href: "/air-conditioning/ac-installation-replacement" },
          { title: "Mini-Split Systems", href: "/air-conditioning/mini-split-systems" },
          { title: "HVAC Brands", href: "/air-conditioning/hvac-brands" },
          { title: "HVAC Warranties", href: "/air-conditioning/hvac-warranties" },
          { title: "Thermostats", href: "/air-conditioning/thermostats" },
        ],
      },
    ],
  },
  {
    title: "Heating Services",
    href: "/heating",
    categories: [
      {
        title: "Heating Services",
        icon: "flame",
        items: [
          { title: "Furnace Repair", href: "/heating/furnace-repair" },
          { title: "Furnace Tune Up/ Maintenance", href: "/heating/furnace-tune-up-maintenance" },
          { title: "Furnace Installation and Replacement", href: "/heating/furnace-installation-replacement" },
          { title: "Boilers Installation and Replacement", href: "/heating/boilers-installation-replacement" },
        ],
      },
    ],
  },
  {
    title: "Indoor Air Quality",
    href: "/indoor-air-quality",
    categories: [
      {
        title: "Indoor Air Quality Services",
        icon: "wind",
        items: [
          { title: "Air Filtration Systems", href: "/indoor-air-quality/air-filtration-systems" },
          { title: "Duct Cleaning and Sealing", href: "/indoor-air-quality/duct-cleaning-sealing" },
          { title: "Duct Repair and Replacement", href: "/indoor-air-quality/duct-repair-replacement" },
          { title: "Attic Insulation and Ventilation", href: "/indoor-air-quality/attic-insulation-ventilation" },
        ],
      },
    ],
  },
  {
    title: "Emergency HVAC",
    href: "/emergency",
    categories: [
      {
        title: "Emergency HVAC Services",
        icon: "alert",
        items: [
          { title: "24/7 AC Repairs", href: "/emergency/24-7-ac-repairs" },
          { title: "24/7 Heating and Cooling Repairs", href: "/emergency/24-7-heating-cooling-repairs" },
          { title: "24/7 Emergency Repairs", href: "/emergency/24-7-emergency-repairs" },
        ],
      },
    ],
  },
  {
    title: "Commercial",
    href: "/commercial",
    categories: [
      {
        title: "Commercial HVAC Services",
        icon: "building",
        items: [
          { title: "HVAC Repair", href: "/commercial/hvac-repair" },
          { title: "HVAC Maintenance", href: "/commercial/hvac-maintenance" },
          { title: "HVAC Installation", href: "/commercial/hvac-installation" },
          { title: "HVAC Warranty", href: "/commercial/hvac-warranty" },
        ],
      },
    ],
  },
]
