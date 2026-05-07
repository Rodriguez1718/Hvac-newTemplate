import * as React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ChevronDown, Phone, Settings, DollarSign } from "lucide-react"
import { utilityNavItems, mainNavItems, quickActions } from "@/config/navigation"
import { siteConfig } from "@/config/site"

function MobileNav({ onClose }: { onClose: () => void }) {
  const [expandedService, setExpandedService] = React.useState<string | null>(null)
  const [expandedUtil, setExpandedUtil] = React.useState<string | null>(null)

  return (
    <div className="flex flex-col">
      <a
        href={`tel:${siteConfig.contact.phone}`}
        className="flex items-center justify-center gap-2 bg-brand-primary text-white p-4 hover:bg-brand-secondary transition-colors"
      >
        <Phone className="h-5 w-5 text-brand-highlight" />
        <span className="font-bold text-lg">{siteConfig.contact.phoneFormatted}</span>
      </a>

      <div className="p-4 bg-brand-tertiary/50">
        {utilityNavItems.map((item) => (
          <div key={item.href} className="border-b border-brand-highlight/10 last:border-b-0">
            {item.children ? (
              <>
                <div className="flex items-center justify-between w-full py-3">
                  <a href={item.href} className="text-[12px] tracking-[0.08em] uppercase font-semibold text-brand-primary hover:text-brand-highlight" onClick={onClose}>
                    {item.title}
                  </a>
                  <button onClick={() => setExpandedUtil(expandedUtil === item.href ? null : item.href)} aria-label={`Toggle ${item.title} submenu`}>
                    <ChevronDown className={`h-4 w-4 text-brand-secondary transition-transform ${expandedUtil === item.href ? "rotate-180" : ""}`} />
                  </button>
                </div>
                {expandedUtil === item.href && (
                  <div className="pb-3 pl-4">
                    {item.children.map((child) => (
                      <a key={child.href} href={child.href} className="block py-2 text-[11px] tracking-[0.06em] uppercase text-brand-secondary hover:text-brand-highlight" onClick={onClose}>
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

      <div className="p-4 bg-white border-t border-brand-tertiary">
        <p className="text-[10px] font-bold text-brand-highlight uppercase tracking-[0.15em] mb-2 border-b-2 border-brand-highlight pb-1 inline-block">Services</p>
        {mainNavItems.map((service) => (
          <div key={service.href} className="border-b border-gray-100 last:border-b-0">
            <button onClick={() => setExpandedService(expandedService === service.href ? null : service.href)} className="flex items-center justify-between w-full py-3 text-left">
              <span className="text-[12px] tracking-[0.08em] uppercase font-semibold text-brand-primary">{service.title}</span>
              <ChevronDown className={`h-4 w-4 text-brand-secondary transition-transform ${expandedService === service.href ? "rotate-180" : ""}`} />
            </button>
            {expandedService === service.href && (
              <div className="pb-3 pl-4">
                {service.categories.flatMap((cat) =>
                  cat.items.map((link) => (
                    <a key={link.href} href={link.href} className="block py-1.5 text-[11px] tracking-[0.06em] uppercase text-brand-secondary hover:text-brand-highlight" onClick={onClose}>
                      {link.title}
                    </a>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex border-t border-brand-tertiary">
        {quickActions.map((action, i) => (
          <a key={action.href} href={action.href} className={`flex flex-1 items-center justify-center gap-2 p-4 bg-brand-tertiary/60 hover:bg-brand-tertiary transition-colors ${i > 0 ? "border-l border-brand-highlight/15" : ""}`} onClick={onClose}>
            <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
              {action.icon === "settings" ? <Settings className="h-4 w-4 text-brand-secondary" /> : <DollarSign className="h-4 w-4 text-brand-secondary" />}
            </div>
            <span className="text-[11px] tracking-[0.06em] uppercase font-semibold text-brand-primary">{action.title}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)

  // Listen for the custom event from the static hamburger button
  React.useEffect(() => {
    const handler = () => setOpen(true)
    document.addEventListener("open-mobile-menu", handler)
    return () => document.removeEventListener("open-mobile-menu", handler)
  }, [])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col overflow-hidden">
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <MobileNav onClose={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
