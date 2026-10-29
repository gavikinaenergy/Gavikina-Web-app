import { Link } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"
import facebookIcon from "../assets/facebook.svg"
import instagramIcon from "../assets/instagram.svg"
import linkedinIcon from "../assets/linkedin.svg"
import logo from "../assets/logo-primary-ondark.svg"
import xIcon from "../assets/twitter-x.svg"
import { FOOTER_COLS } from "../lib/content"
import { openAssess } from "../store/modal"
import { openCookiePreferences } from "../store/cookie-consent"
import { siteConfig } from "#/config/site"

const SOCIAL_LINKS = [
  {
    label: "X",
    href: siteConfig.social.twitterUrl,
    icon: xIcon,
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagramUrl,
    icon: instagramIcon,
  },
  {
    label: "Facebook",
    href: siteConfig.social.facebookUrl,
    icon: facebookIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedinUrl,
    icon: linkedinIcon,
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)] lg:gap-12">
          {/* Brand Column */}
          <div>
            <img
              src={logo}
              alt={siteConfig.name}
              className="block h-9 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Reliable solar and energy solutions for homes, businesses and
              multi-site operations across Nigeria.
            </p>
            <Button className="mt-6" size="sm" onClick={() => openAssess()}>
              Free Online Energy Assessment
            </Button>
            <Link
              to="/agent"
              className="mt-4 block text-sm font-semibold text-white transition-colors hover:text-white/80"
            >
              Become an agent →
            </Link>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow ${siteConfig.name} on ${item.label}`}
                  title={item.label}
                  className="group flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:scale-105 hover:border-white/25 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-green focus-visible:outline-none"
                >
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="size-4 object-contain opacity-75 brightness-0 invert transition-opacity group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.label}>
              <span className="text-xs font-semibold tracking-wider text-white/40 uppercase">
                {col.label}
              </span>
              <div className="mt-4 flex flex-col items-start gap-3">
                {col.items.map(([path, label]) => (
                  <Link
                    key={path}
                    to={path}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-white/50">
                © {new Date().getFullYear()} {siteConfig.name}.{" "}
                {siteConfig.tagline}
              </span>
              <span className="text-[11px] text-white/35">
                {siteConfig.name} is a brand of {siteConfig.legalName}.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy"
                className="text-xs text-white/50 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-xs text-white/50 transition-colors hover:text-white"
              >
                Terms &amp; Conditions
              </Link>
              <button
                type="button"
                onClick={() => openCookiePreferences()}
                className="cursor-pointer text-xs text-white/50 transition-colors hover:text-white"
              >
                Cookie Preferences
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t border-white/5 pt-2 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <span>{siteConfig.pricingDisclaimer}</span>
            <span>
              Designed &amp; developed by{" "}
              <a
                href={siteConfig.agency.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/70 underline-offset-2 transition-colors hover:text-green hover:underline"
              >
                {siteConfig.agency.name}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
