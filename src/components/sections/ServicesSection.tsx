import { useState, useEffect, useRef } from 'react';

interface Service {
  title: string;
  description: string;
  href?: string;
}

interface ServiceCategory {
  title: string;
  services: Service[];
}

interface Props {  
  title: string;
  description: string;
  categories: ServiceCategory[];
}

const serviceIcons: { keywords: string[]; icon: React.ReactNode }[] = [
  {
    keywords: ['kitchen'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    ),
  },
  {
    keywords: ['bathroom', 'bath'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        <line x1="10" y1="5" x2="8" y2="7" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="7" y1="19" x2="7" y2="21" />
        <line x1="17" y1="19" x2="17" y2="21" />
      </svg>
    ),
  },
  {
    keywords: ['leak detection', 'leak repair', 'leak prevention', 'leak'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        <path d="M9.5 15.5a3 3 0 0 0 4.5 2" />
      </svg>
    ),
  },
  {
    keywords: ['water heater', 'water heating'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        <circle cx="12" cy="17" r="1" />
      </svg>
    ),
  },
  {
    keywords: ['drain', 'sewer', 'hydro jetting', 'jetting'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v3" /><path d="M18.5 5.5 16.4 7.6" /><path d="M21 12h-3" />
        <path d="M18.5 18.5 16.4 16.4" /><path d="M12 21v-3" />
        <path d="M5.5 18.5 7.6 16.4" /><path d="M3 12h3" /><path d="M5.5 5.5 7.6 7.6" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    keywords: ['gas', 'gas line', 'gas piping'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    keywords: ['backflow', 'filtration', 'filter', 'purification', 'purif', 'indoor air', 'air quality'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
      </svg>
    ),
  },
  {
    keywords: ['maintenance', 'preventative', 'appliance', 'tune-up', 'tune up'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    keywords: ['pipe', 'repiping', 'repipe', 'sewer line', 'trenchless'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    keywords: ['building', 'commercial', 'green', 'eco'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" />
        <path d="M9 9v.01" /><path d="M9 12v.01" /><path d="M9 15v.01" />
      </svg>
    ),
  },
  {
    keywords: ['ac', 'air conditioning', 'cooling', 'cool'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    keywords: ['heat', 'furnace', 'boiler', 'warm'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
        <circle cx="12" cy="17" r="1" />
      </svg>
    ),
  },
  {
    keywords: ['thermostat', 'smart'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="14" r="4" />
        <path d="M12 6v4" />
      </svg>
    ),
  },
  {
    keywords: ['mini-split', 'ductless', 'split'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="8" rx="1" />
        <path d="M12 12v4" />
        <path d="M8 16h8" />
        <path d="M6 20h12" />
      </svg>
    ),
  },
  {
    keywords: ['install', 'replacement', 'replace'],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

const fallbackIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

function getIconForService(title: string): React.ReactNode {
  const lower = title.toLowerCase();
  for (const entry of serviceIcons) {
    if (entry.keywords.some((kw) => lower.includes(kw))) return entry.icon;
  }
  return fallbackIcon;
}

// Generate URL from service title
function getServiceUrl(title: string, providedHref?: string): string {
  if (providedHref) return providedHref;
  
  const lower = title.toLowerCase();
  
  // Specific service page mappings
  const serviceMap: Record<string, string> = {
    // AC Services
    'ac repair': '/air-conditioning/ac-repair',
    'ac tune-up': '/air-conditioning/ac-tune-up-maintenance',
    'ac maintenance': '/air-conditioning/ac-tune-up-maintenance',
    'ac installation': '/air-conditioning/ac-installation-replacement',
    'ac replacement': '/air-conditioning/ac-installation-replacement',
    'mini-split': '/air-conditioning/mini-split-systems',
    'thermostat': '/air-conditioning/thermostats',
    
    // Heating Services
    'furnace repair': '/heating/furnace-repair',
    'furnace tune-up': '/heating/furnace-tune-up-maintenance',
    'furnace maintenance': '/heating/furnace-tune-up-maintenance',
    'furnace installation': '/heating/furnace-installation-replacement',
    'furnace replacement': '/heating/furnace-installation-replacement',
    'boiler': '/heating/boilers-installation-replacement',
    'heat pump': '/heating',
    
    // Indoor Air Quality
    'air filtration': '/indoor-air-quality/air-filtration-systems',
    'duct cleaning': '/indoor-air-quality/duct-cleaning-sealing',
    'duct sealing': '/indoor-air-quality/duct-cleaning-sealing',
    'duct repair': '/indoor-air-quality/duct-repair-replacement',
    'duct replacement': '/indoor-air-quality/duct-repair-replacement',
    'attic insulation': '/indoor-air-quality/attic-insulation-ventilation',
    'humidity': '/indoor-air-quality',
    
    // View All links
    'view all ac': '/air-conditioning',
    'view all heating': '/heating',
    'view all iaq': '/indoor-air-quality',
    'view all commercial': '/commercial',
  };
  
  // Check for matches
  for (const [key, url] of Object.entries(serviceMap)) {
    if (lower.includes(key)) return url;
  }
  
  // Commercial services
  if (lower.includes('commercial')) return '/commercial';
  
  // Default fallback
  return '/contact';
}

export function ServicesSection({ title, description, categories }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeCategory = categories[activeTab];

  return (
    <section ref={sectionRef} className="ss-r-section">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className={`ss-r-header transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="ss-r-eyebrow">
            <span className="ss-r-eyebrow-text">Our Services</span>
          </div>
          <div className="ss-r-header-grid">
            <h2 className="ss-r-title">{title}</h2>
            <p className="ss-r-desc">{description}</p>
          </div>
        </div>

        {/* Tabs */}
        {categories.length > 1 && (
          <div 
            className={`ss-r-tabs transition-all duration-700 delay-100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            role="tablist"
            aria-label="Service categories"
          >
            {categories.map((cat, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`panel-${i}`}
                id={`tab-${i}`}
                onClick={() => setActiveTab(i)}
                className={`ss-r-tab ${activeTab === i ? 'ss-r-tab--active' : ''}`}
              >
                <span className="ss-r-tab-text">{cat.title}</span>
                <span className="ss-r-tab-bar" />
              </button>
            ))}
          </div>
        )}

        {/* Cards grid */}
        <div 
          className="ss-r-grid"
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {activeCategory.services.map((service, i) => {
            // Smart URL generation based on service title
            const href = getServiceUrl(service.title, service.href);

            return (
              <a
                key={`${activeTab}-${i}`}
                href={href}
                className={`ss-r-card group transition-all duration-500 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="ss-r-card-strip" />

                <div className="ss-r-card-inner">
                  <div className="ss-r-icon">
                    {getIconForService(service.title)}
                  </div>

                  <h3 className="ss-r-card-title">{service.title}</h3>
                  <p className="ss-r-card-desc">{service.description}</p>

                  <div className="ss-r-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .ss-r-section {
          background: var(--background);
          padding: 5rem 0 7rem;
        }
        @media (min-width: 768px) {
          .ss-r-section {
            padding: 7rem 0;
          }
        }

        /* ─── Header ─── */
        .ss-r-header {
          margin-bottom: 2.5rem;
        }
        .ss-r-eyebrow {
          margin-bottom: 1.5rem;
        }
        .ss-r-eyebrow-text {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--brand-highlight);
          display: inline-block;
          padding: 0.4rem 1rem;
          background: var(--brand-primary);
        }

        .ss-r-header-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        @media (min-width: 1024px) {
          .ss-r-header-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: start;
          }
        }

        .ss-r-title {
          font-size: 2rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 1.1;
          color: var(--brand-primary);
        }
        @media (min-width: 768px) {
          .ss-r-title { font-size: 2.5rem; }
        }

        .ss-r-desc {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--brand-secondary);
        }

        /* ─── Tabs ─── */
        .ss-r-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          margin-bottom: 2.5rem;
          border-bottom: 2px solid rgba(0, 0, 0, 0.18);
        }

        .ss-r-tab {
          position: relative;
          padding: 0.85rem 1.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--brand-secondary);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .ss-r-tab:hover {
          color: var(--brand-primary);
        }
        .ss-r-tab--active {
          color: var(--brand-primary);
        }

        .ss-r-tab-bar {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: transparent;
          transition: background 0.3s ease;
        }
        .ss-r-tab--active .ss-r-tab-bar {
          background: var(--brand-highlight);
        }

        /* ─── Cards Grid ─── */
        .ss-r-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .ss-r-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 640px) {
          .ss-r-grid {
            grid-template-columns: 1fr;
          }
        }

        /* ─── Card ─── */
        .ss-r-card {
          position: relative;
          display: block;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.06);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: all 0.35s ease;
        }
        .ss-r-card:hover {
          border-color: var(--brand-highlight);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
        }

        /* Left accent strip */
        .ss-r-card-strip {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 0;
          background: var(--brand-highlight);
          transition: height 0.35s ease;
        }
        .ss-r-card:hover .ss-r-card-strip {
          height: 100%;
        }

        .ss-r-card-inner {
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          min-height: 180px;
        }

        /* Icon */
        .ss-r-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--brand-tertiary);
          border: 1px solid rgba(0, 0, 0, 0.06);
          color: var(--brand-primary);
          margin-bottom: 1.25rem;
          transition: all 0.3s ease;
        }
        .ss-r-card:hover .ss-r-icon {
          background: var(--brand-highlight);
          border-color: var(--brand-highlight);
          color: var(--brand-primary);
        }

        .ss-r-card-title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          color: var(--brand-primary);
          margin-bottom: 0.5rem;
          line-height: 1.25;
          transition: color 0.3s ease;
        }

        .ss-r-card-desc {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--brand-secondary);
          flex: 1;
          margin-bottom: 1rem;
        }

        /* Arrow */
        .ss-r-arrow {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--brand-tertiary);
          color: var(--brand-secondary);
          transition: all 0.3s ease;
        }
        .ss-r-card:hover .ss-r-arrow {
          background: var(--brand-highlight);
          color: var(--brand-primary);
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}

export default ServicesSection;
