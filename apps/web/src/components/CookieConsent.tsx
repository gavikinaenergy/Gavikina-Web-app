import { Link } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { ArrowLeft, Check, Cookie, SlidersHorizontal, X } from "lucide-react"
import { useEffect, useState } from "react"
import {
  acceptAllCookies,
  closeCookieBanner,
  declineNonEssentialCookies,
  initCookieConsent,
  saveCookiePreferences,
  setCookieConsentView,
  useCookieConsentState,
} from "../store/cookie-consent"

export default function CookieConsent() {
  const { isOpen, view, preferences, hasConsented } = useCookieConsentState()

  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    preferences.analytics
  )
  const [marketingEnabled, setMarketingEnabled] = useState(
    preferences.marketing
  )

  // Sync local toggle state when preferences update or modal opens
  useEffect(() => {
    setAnalyticsEnabled(preferences.analytics)
    setMarketingEnabled(preferences.marketing)
  }, [preferences, isOpen])

  // Initialize consent state on client mount
  useEffect(() => {
    const cleanup = initCookieConsent()
    return cleanup
  }, [])

  if (!isOpen) return null

  const handleSaveCustom = () => {
    saveCookiePreferences({
      necessary: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
    })
  }

  return (
    <aside
      role="region"
      aria-label="Cookie consent banner"
      className={cn(
        "fixed z-50 transition-all duration-300 ease-out",
        // Mobile layout: docked at bottom with safe padding
        "inset-x-0 bottom-0 p-4 sm:p-0",
        // Desktop layout: floating card at bottom-left (avoids WhatsApp button at bottom-right)
        "sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-full sm:max-w-[430px]"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-navy/10 bg-white/95 p-5 shadow-2xl backdrop-blur-md",
          "text-navy dark:border-white/10 dark:bg-ink/95 dark:text-white",
          "animate-in duration-300 slide-in-from-bottom-5 fade-in"
        )}
      >
        {/* Optional close button if user previously consented and reopened from footer */}
        {hasConsented && (
          <button
            type="button"
            onClick={closeCookieBanner}
            aria-label="Close cookie banner"
            className="absolute top-3.5 right-3.5 flex size-7 items-center justify-center rounded-lg border border-navy/10 text-navy/60 transition-colors hover:bg-cream/40 hover:text-navy dark:border-white/10 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="size-4" />
          </button>
        )}

        {view === "banner" ? (
          /* Banner Summary View */
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3.5 pr-6">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green">
                <Cookie className="size-5" />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold tracking-tight text-navy dark:text-white">
                  Cookie &amp; Privacy Choices
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-navy/70 dark:text-white/70">
                  We use cookies to deliver essential functionality and analyze
                  site traffic to enhance our clean energy advisory tools. We
                  comply with the Nigeria Data Protection Act (NDPA 2023).
                </p>
                <Link
                  to="/privacy"
                  className="mt-1.5 inline-block text-[11px] font-medium text-green underline-offset-4 hover:underline"
                >
                  Read our Privacy Policy →
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-1 sm:pt-2">
              <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <Button
                  size="sm"
                  variant="primary"
                  className="font-semibold"
                  onClick={acceptAllCookies}
                >
                  Accept All
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs font-medium text-navy sm:text-sm dark:text-white"
                  onClick={declineNonEssentialCookies}
                >
                  Decline Non-Essential
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setCookieConsentView("preferences")}
                className="mt-1 flex items-center justify-center gap-1.5 py-1 text-xs font-medium text-navy/60 transition-colors hover:text-navy dark:text-white/60 dark:hover:text-white"
              >
                <SlidersHorizontal className="size-3.5" />
                <span>Customize preferences</span>
              </button>
            </div>
          </div>
        ) : (
          /* Detailed Preferences View */
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-3 dark:border-white/10">
              <button
                type="button"
                onClick={() => setCookieConsentView("banner")}
                className="flex items-center gap-1 text-xs font-semibold text-green transition-colors hover:text-green-dark"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back</span>
              </button>
              <span className="text-xs font-semibold text-navy dark:text-white">
                Cookie Categories
              </span>
            </div>

            <p className="text-xs leading-relaxed text-navy/70 dark:text-white/70">
              Tailor your consent settings below. Strictly necessary cookies
              cannot be deactivated as they are required for security and core
              site navigation.
            </p>

            <div className="flex flex-col gap-3 py-1">
              {/* Category 1: Strictly Necessary */}
              <div className="flex items-start justify-between gap-3 rounded-xl border border-navy/5 bg-cream/30 p-3 dark:border-white/5 dark:bg-white/5">
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-navy dark:text-white">
                      Strictly Necessary
                    </span>
                    <span className="rounded-full bg-green/10 px-2 py-0.5 text-[10px] font-semibold text-green">
                      Always Active
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-navy/60 dark:text-white/60">
                    Required for core page navigation, security, and storing
                    your privacy consent.
                  </p>
                </div>
                <div
                  aria-hidden="true"
                  className="flex size-5 shrink-0 items-center justify-center rounded-md bg-green text-white"
                >
                  <Check className="size-3 stroke-[3]" />
                </div>
              </div>

              {/* Category 2: Analytics & Performance */}
              <div className="flex items-start justify-between gap-3 rounded-xl border border-navy/10 bg-white p-3 dark:border-white/10 dark:bg-ink">
                <div className="flex-1 pr-2">
                  <span className="text-xs font-semibold text-navy dark:text-white">
                    Analytics &amp; Performance
                  </span>
                  <p className="mt-1 text-[11px] leading-relaxed text-navy/60 dark:text-white/60">
                    Allows us to aggregate anonymous visitor metrics and improve
                    energy assessment tools.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsEnabled}
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-green focus-visible:outline-none",
                    analyticsEnabled
                      ? "bg-green"
                      : "bg-navy/20 dark:bg-white/20"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
                      analyticsEnabled ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>

              {/* Category 3: Marketing & Experience */}
              <div className="flex items-start justify-between gap-3 rounded-xl border border-navy/10 bg-white p-3 dark:border-white/10 dark:bg-ink">
                <div className="flex-1 pr-2">
                  <span className="text-xs font-semibold text-navy dark:text-white">
                    Marketing &amp; Experience
                  </span>
                  <p className="mt-1 text-[11px] leading-relaxed text-navy/60 dark:text-white/60">
                    Enables relevant system sizing recommendations and solar
                    product updates.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={marketingEnabled}
                  onClick={() => setMarketingEnabled(!marketingEnabled)}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-green focus-visible:outline-none",
                    marketingEnabled
                      ? "bg-green"
                      : "bg-navy/20 dark:bg-white/20"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
                      marketingEnabled ? "translate-x-4" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            </div>

            {/* Preferences Action Buttons */}
            <div className="flex flex-col items-stretch gap-2 pt-2 sm:flex-row sm:items-center">
              <Button
                size="sm"
                variant="primary"
                className="font-semibold"
                onClick={handleSaveCustom}
              >
                Save My Choices
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs font-medium text-navy sm:text-sm dark:text-white"
                onClick={acceptAllCookies}
              >
                Accept All
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
