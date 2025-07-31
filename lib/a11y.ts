// Accessibility utilities for WCAG 2.1 AA compliance

// Skip to main content link
export const skipToMainContent = () => {
  const main = document.querySelector('main')
  if (main) {
    main.focus()
    main.scrollIntoView()
  }
}

// Announce to screen readers
export const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div')
  announcement.setAttribute('role', 'status')
  announcement.setAttribute('aria-live', priority)
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Focus trap for modals
export const createFocusTrap = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstFocusable = focusableElements[0] as HTMLElement
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable.focus()
        }
      }
    }
    
    if (e.key === 'Escape') {
      // Handle escape key
      const closeButton = element.querySelector('[aria-label*="Close"]') as HTMLElement
      if (closeButton) {
        closeButton.click()
      }
    }
  }
  
  element.addEventListener('keydown', handleKeyDown)
  
  // Focus first element
  firstFocusable?.focus()
  
  return () => {
    element.removeEventListener('keydown', handleKeyDown)
  }
}