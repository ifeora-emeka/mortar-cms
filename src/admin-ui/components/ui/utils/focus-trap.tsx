"use client"

import React, { useEffect, useRef } from "react"

interface FocusTrapProps {
  active: boolean
  children: React.ReactNode
}

const FocusTrap: React.FC<FocusTrapProps> = ({ active, children }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!active || !rootRef.current) return
    
    const root = rootRef.current
    const focusableElements = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    // Focus the first element when the trap activates
    if (firstElement) {
      setTimeout(() => {
        firstElement.focus()
      }, 50)
    }
    
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      
      if (event.shiftKey) {
        // If shift + tab and on the first element, move to the last element
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        // If tab and on the last element, move to the first element
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }
    
    document.addEventListener('keydown', handleTabKey)
    
    // Store the element that had focus before activating the trap
    const previouslyFocused = document.activeElement as HTMLElement
    
    return () => {
      document.removeEventListener('keydown', handleTabKey)
      
      // Restore focus when trap is deactivated
      if (previouslyFocused) {
        setTimeout(() => {
          previouslyFocused?.focus?.()
        }, 50)
      }
    }
  }, [active])
  
  return <div ref={rootRef}>{children}</div>
}

export default FocusTrap