import { Link } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { ArrowLeft, Check, X } from "lucide-react"
import { useEffect, useState } from "react"
import {
  acceptAllCookies,
  dismissCookieBanner,
  initCookieConsent,
  saveCookiePreferences,
  setCookieConsentView,
  useCookieConsentState,
} from "../store/cookie-consent"

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const { isOpen, view, preferences } = useCookieConsentState()

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
    setMounted(true)
    const cleanup = initCookieConsent()
    return cleanup
  }, [])

  if (!mounted || !isOpen) return null

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
        "sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-full sm:max-w-4xl"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-navy/10 bg-white/95 p-5 shadow-2xl backdrop-blur-xl",
          "text-navy dark:border-white/10 dark:bg-ink/95 dark:text-white",
          "animate-in duration-300 slide-in-from-bottom-5 fade-in"
        )}
      >
        {/* Clear close (X) button */}
        <button
          type="button"
          onClick={dismissCookieBanner}
          aria-label="Close cookie consent"
          className={cn(
            "absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-lg text-navy/40 transition-colors hover:bg-navy/5 hover:text-navy dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white",
            view === "preferences" && "hidden"
          )}
        >
          <X className="size-4" />
        </button>

        {view === "banner" ? (
          /* Banner Summary View matching user example */
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 pr-2 sm:pr-4">
              <h2 className="text-base font-bold tracking-tight text-navy dark:text-white">
                Cookie Consent
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-navy/70 dark:text-white/70">
                By clicking &ldquo;Accept All Cookies&rdquo;, you agree to the
                storing of cookies on your device to enhance site navigation,
                analyze site usage, and assist in our marketing efforts.{" "}
                <Link
                  to="/privacy"
                  className="font-medium text-green underline underline-offset-4 hover:text-green-dark"
                >
                  Privacy policy
                </Link>
              </p>
            </div>

            {/* Two useful action buttons to avoid fatigue */}
            <div className="flex shrink-0 items-center gap-2.5 pt-1 sm:pt-0">
              <Button
                variant="primary"
                className="px-4"
                onClick={() => setCookieConsentView("preferences")}
              >
                Manage cookies
              </Button>
              <Button
                variant="outline"
                className="border-green px-4 text-green hover:bg-green/10 hover:text-green-dark dark:border-green-light dark:text-green-light"
                onClick={acceptAllCookies}
              >
                Accept all
              </Button>
            </div>
          </div>
        ) : (
          /* Detailed Preferences View */
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-3 dark:border-white/10">
              <button
                type="button"
                onClick={() => setCookieConsentView("banner")}
                className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-green transition-colors hover:text-green-dark"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back</span>
              </button>
              <span className="text-xs font-semibold text-navy dark:text-white">
                Cookie Preferences
              </span>
              <button
                type="button"
                onClick={dismissCookieBanner}
                aria-label="Close preferences"
                className="flex size-7 cursor-pointer items-center justify-center rounded-lg text-navy/40 transition-colors hover:bg-navy/5 hover:text-navy dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs leading-relaxed text-navy/70 dark:text-white/70">
              Choose which cookies you allow us to use. Essential cookies are
              required for basic security and site functionality.
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
                  <Check className="size-3 stroke-3" />
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
                Accept all
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
