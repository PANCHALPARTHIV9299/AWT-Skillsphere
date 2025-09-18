import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    // This function checks if the window object exists to prevent errors
    // during server-side rendering (SSR) where 'window' is not defined.
    const updateMobileStatus = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Check if window is defined before proceeding
    if (typeof window !== 'undefined') {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

      // Set the initial value
      updateMobileStatus()

      // Add listener for changes
      mql.addEventListener("change", updateMobileStatus)

      // Cleanup function to remove the listener
      return () => mql.removeEventListener("change", updateMobileStatus)
    }
  }, [])

  return !!isMobile
}