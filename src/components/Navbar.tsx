import * as React from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Menu, ChevronDown, ChevronRight, Phone, Settings, DollarSign,
  Snowflake, Flame, Droplet, Waves, Zap, Leaf, Wind,
  Building, Shield, Search, AlertCircle, Filter,
  ClipboardList, Wrench
} from "lucide-react"
import { utilityNavItems, mainNavItems, quickActions, type MegaMenuItem } from "@/config/navigation"
import { siteConfig } from "@/config/site"

const iconMap: Record<string, React.ReactNode> = {
  snowflake: <Snowflake className="h-5 w-5" />,
  flame: <Flame className="h-5 w-5" />,
  droplet: <Droplet className="h-5 w-5" />,
  waves: <Waves className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
  leaf: <Leaf className="h-5 w-5" />,
  wind: <Wind className="h-5 w-5" />,
  building: <Building className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  search: <Search className="h-5 w-5" />,
  alert: <AlertCircle className="h-5 w-5" />,
  filter: <Filter className="h-5 w-5" />,
  clipboard: <ClipboardList className="h-5 w-5" />,
  wrench: <Wrench className="h-5 w-5" />,
  settings: <Settings className="h-5 w-5" />,
}

/* ─── Utility bar dropdown (top row) ─── */
function UtilityDropdown({ item }: { item: (typeof utilityNavItems)[0] }) {
  const [open, setOpen] = React.useState(false)

  if (!item.children) {
    return (
      <a href={item.href} className="text-xs tracking-[0.12em] uppercase text-white/70 hover:text-brand-highlight transition-colors font-medium">
        {item.title}
      </a>
    )
  }

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <a href={item.href} className="flex items-center gap-1 text-xs tracking-[0.12em] uppercase text-white/70 hover:text-brand-highlight transition-colors font-medium">
        {item.title}
        <ChevronDown className={`h-2.5 w-2.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </a>
      {open && (
        <>
          <div className="absolute top-full left-0 right-0 h-3" />
          <div className="absolute top-full right-0 mt-3 bg-brand-primary shadow-2xl py-2 min-w-[220px] z-[95]">
            <div className="h-[2px] bg-brand-highlight absolute top-0 left-0 right-0" />
            {item.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                className="group flex items-center gap-2.5 px-5 py-3 text-xs tracking-[0.08em] uppercase text-white/60 hover:text-brand-highlight hover:bg-white/5 transition-colors font-medium"
              >
                <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-brand-highlight transition-colors flex-shrink-0" />
                {child.title}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Mega menu panel ─── */
function MegaMenuPanel({ item }: { item: MegaMenuItem }) {
  const [activeCategory, setActiveCategory] = React.useState(0)
  const active = item.categories[activeCategory]

  return (
    <div className="fixed left-0 right-0 z-[90] shadow-2xl" style={{ top: "var(--navbar-height)" }}>
      <div className="h-[3px] bg-brand-highlight" />
      <div className="flex">
        {/* Left sidebar — dark with category tabs */}
        <div className="w-72 flex-shrink-0 bg-brand-primary">
          <div className="py-3">
            {item.categories.map((cat, i) => (
              <button
                key={cat.title}
                onMouseEnter={() => setActiveCategory(i)}
                className={`flex items-center gap-3 w-full px-6 py-4 text-left text-xs tracking-[0.1em] uppercase font-semibold transition-all ${
                  i === activeCategory
                    ? "text-brand-highlight bg-white/10 border-l-[3px] border-brand-highlight"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5 border-l-[3px] border-transparent"
                }`}
              >
                <span className={i === activeCategory ? "text-brand-highlight" : "text-white/30"}>
                  {iconMap[cat.icon] || <Settings className="h-5 w-5" />}
                </span>
                {cat.title}
                <ChevronRight className={`h-4 w-4 ml-auto transition-opacity ${i === activeCategory ? "opacity-100 text-brand-highlight" : "opacity-0"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right content — cream bg with service links */}
        <div className="flex-1 bg-white">
          <div className="px-10 py-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-brand-highlight">{iconMap[active.icon]}</span>
              <h3 className="text-xs tracking-[0.15em] uppercase font-bold text-brand-primary border-b-2 border-brand-highlight pb-1.5">{active.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-1">
              {active.items.map((service) => (
                <a
                  key={service.href}
                  href={service.href}
                  className="group flex items-center gap-3 py-2.5 text-sm text-brand-secondary hover:text-brand-primary transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/30 group-hover:bg-brand-highlight group-hover:scale-150 transition-all flex-shrink-0" />
                  {service.title}
                </a>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-brand-highlight/15">
              <a href={item.href} className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase font-bold text-brand-secondary hover:text-brand-highlight transition-colors">
                View all {item.title.toLowerCase()} <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Single nav item in the main bar ─── */
function NavLink({ item, isActive, onHover }: { item: MegaMenuItem; isActive: boolean; onHover: (href: string | null) => void }) {
  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => onHover(item.href)}
    >
      <a
        href={item.href}
        className={`flex items-center gap-1.5 px-3 xl:px-5 h-full text-xs tracking-[0.1em] uppercase font-semibold whitespace-nowrap transition-colors ${
          isActive ? "text-brand-primary" : "text-brand-secondary hover:text-brand-primary"
        }`}
      >
        {item.title}
        <ChevronDown className={`h-2.5 w-2.5 transition-transform ${isActive ? "rotate-180" : ""}`} />
      </a>
      {isActive && <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-brand-highlight" />}
    </div>
  )
}

/* ─── Main Navbar ─── */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleHover = (href: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveMenu(href)
  }

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150)
  }

  const activeItem = mainNavItems.find((i) => i.href === activeMenu)

  return (
    <header className="sticky top-0 z-[100] w-full" style={{ "--navbar-height": "126px" } as React.CSSProperties}>
      {/* ── Row 1: Dark top bar — Logo + utility links ── */}
      <div className="hidden lg:block bg-brand-primary border-b-[3px] border-brand-highlight">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex h-[68px] items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3.5 flex-shrink-0" aria-label={`${siteConfig.business.name} - Home`}>
              <img
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                className="h-11 w-11 object-contain brightness-0 invert"
                width={44}
                height={44}
                decoding="async"
                loading="eager"
              />
              <span className="text-base font-bold uppercase tracking-[0.1em] text-white">
                {siteConfig.business.name}
              </span>
            </a>

            {/* Utility links */}
            <div className="flex items-center gap-8">
              {utilityNavItems.map((item) => (
                <UtilityDropdown key={item.href} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: Cream service bar — nav + actions ── */}
      <div className="bg-brand-tertiary border-b border-brand-highlight/20 shadow-sm" onMouseLeave={handleLeave}>
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex h-[58px] items-center gap-4">
            {/* Service nav links */}
            <nav className="hidden lg:flex items-center h-[58px]">
              {mainNavItems.map((item) => (
                <NavLink key={item.href} item={item} isActive={activeMenu === item.href} onHover={handleHover} />
              ))}
            </nav>

            {/* Right side: quick actions + phone */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 ml-auto flex-shrink-0">
              {quickActions.map((action) => (
                <a
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-2 bg-white border border-brand-secondary/20 text-brand-secondary px-5 py-2.5 text-xs tracking-[0.08em] uppercase font-semibold hover:border-brand-highlight hover:bg-brand-highlight/10 hover:text-brand-primary transition-all whitespace-nowrap"
                >
                  {action.icon === "settings" ? <Settings className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />}
                  {action.title}
                </a>
              ))}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-2 bg-brand-primary text-white px-6 py-2.5 text-xs tracking-[0.08em] uppercase font-bold hover:bg-brand-secondary transition-colors whitespace-nowrap shadow-md"
              >
                <Phone className="h-4 w-4 text-brand-highlight" />
                {siteConfig.contact.phoneFormatted}
              </a>
            </div>

            {/* Mobile: logo + trigger */}
            <a href="/" className="flex lg:hidden items-center gap-3 flex-shrink-0" aria-label={`${siteConfig.business.name} - Home`}>
              <img
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                className="h-9 w-9 object-contain"
                width={36}
                height={36}
                decoding="async"
                loading="eager"
              />
              <span className="hidden md:block text-sm font-bold uppercase tracking-[0.08em] text-brand-primary">
                {siteConfig.business.name}
              </span>
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden ml-auto">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col overflow-hidden">
                <SheetHeader className="sr-only">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                  <MobileNav onClose={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mega menu */}
        {activeItem && (
          <div onMouseEnter={() => handleHover(activeItem.href)} onMouseLeave={handleLeave}>
            <MegaMenuPanel item={activeItem} />
          </div>
        )}
      </div>
    </header>
  )
}

/* ─── Mobile navigation ─── */
function MobileNav({ onClose }: { onClose: () => void }) {
  const [expandedService, setExpandedService] = React.useState<string | null>(null)
  const [expandedUtil, setExpandedUtil] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col">
      {/* Phone CTA */}
      <a
        href={`tel:${siteConfig.contact.phone}`}
        className="flex items-center justify-center gap-2 bg-brand-primary text-white p-4 hover:bg-brand-secondary transition-colors"
      >
        <Phone className="h-5 w-5 text-brand-highlight" />
        <span className="font-bold text-lg">{siteConfig.contact.phoneFormatted}</span>
      </a>

      {/* Main nav links (Home, About, etc.) */}
      <div className="p-4 bg-brand-tertiary/50">
        {utilityNavItems.map((item) => (
          <div key={item.href} className="border-b border-brand-highlight/10 last:border-b-0">
            {item.children ? (
              <>
                <div className="flex items-center justify-between w-full py-3">
                  <a href={item.href} className="text-[12px] tracking-[0.08em] uppercase font-semibold text-brand-primary hover:text-brand-highlight" onClick={onClose}>
                    {item.title}
                  </a>
                  <button
                    onClick={() => setExpandedUtil(expandedUtil === item.href ? null : item.href)}
                    aria-label={`Toggle ${item.title} submenu`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 text-brand-secondary transition-transform ${expandedUtil === item.href ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
                {expandedUtil === item.href && (
                  <div className="pb-3 pl-4">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-[11px] tracking-[0.06em] uppercase text-brand-secondary hover:text-brand-highlight"
                        onClick={onClose}
                      >
                        {child.title}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a href={item.href} className="block py-3 text-[12px] tracking-[0.08em] uppercase font-semibold text-brand-primary hover:text-brand-highlight" onClick={onClose}>
                {item.title}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="p-4 bg-white border-t border-brand-tertiary">
        <p className="text-[10px] font-bold text-brand-highlight uppercase tracking-[0.15em] mb-2 border-b-2 border-brand-highlight pb-1 inline-block">Services</p>
        {mainNavItems.map((service) => (
          <div key={service.href} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => setExpandedService(expandedService === service.href ? null : service.href)}
              className="flex items-center justify-between w-full py-3 text-left"
            >
              <span className="text-[12px] tracking-[0.08em] uppercase font-semibold text-brand-primary">{service.title}</span>
              <ChevronDown
                className={`h-4 w-4 text-brand-secondary transition-transform ${expandedService === service.href ? "rotate-180" : ""}`}
              />
            </button>
            {expandedService === service.href && (
              <div className="pb-3 pl-4">
                {service.categories.flatMap((cat) =>
                  cat.items.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block py-1.5 text-[11px] tracking-[0.06em] uppercase text-brand-secondary hover:text-brand-highlight"
                      onClick={onClose}
                    >
                      {link.title}
                    </a>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex border-t border-brand-tertiary">
        {quickActions.map((action, i) => (
          <a
            key={action.href}
            href={action.href}
            className={`flex flex-1 items-center justify-center gap-2 p-4 bg-brand-tertiary/60 hover:bg-brand-tertiary transition-colors ${i > 0 ? "border-l border-brand-highlight/15" : ""}`}
            onClick={onClose}
          >
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              {action.icon === "settings" ? (
                <Settings className="h-4 w-4 text-brand-secondary" />
              ) : (
                <DollarSign className="h-4 w-4 text-brand-secondary" />
              )}
            </div>
            <span className="text-[11px] tracking-[0.06em] uppercase font-semibold text-brand-primary">{action.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
