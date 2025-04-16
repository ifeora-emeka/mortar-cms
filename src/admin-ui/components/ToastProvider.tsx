"use client"

import React from "react"
import { Toaster, ToastOptions, toast as hotToast } from "react-hot-toast"
import styled from "styled-components"
import { Toast, ToastVariant, ToastPosition } from "./ui/Toast"
import { theme } from "../../styles/theme"

// Styled container for the toast
const ToastWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  pointer-events: none;
`

// Toast options interface
interface CustomToastOptions {
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  position?: ToastPosition
  showIcon?: boolean
  showCloseButton?: boolean
}

// Creates a toast context for the application
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        gutter={12}
        containerClassName="toast-container"
        containerStyle={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        toastOptions={{
          duration: 5000,
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
            overflow: "visible",
          },
        }}
      />
    </>
  )
}

// Helper functions to create toasts
export const toast = {
  // Base toast creator
  custom: (options: CustomToastOptions) => {
    const { title, description, variant = "info", duration = 5000, position = "top-right", showIcon = true, showCloseButton = true } = options
    
    return hotToast.custom(
      (t) => (
        <Toast
          id={t.id}
          title={title}
          description={description}
          variant={variant}
          duration={duration}
          onClose={() => hotToast.dismiss(t.id)}
          showIcon={showIcon}
          showCloseButton={showCloseButton}
        />
      ),
      {
        duration,
        position,
      }
    )
  },

  // Shorthand methods
  success: (options: Omit<CustomToastOptions, "variant">) => {
    return toast.custom({ ...options, variant: "success" })
  },
  
  error: (options: Omit<CustomToastOptions, "variant">) => {
    return toast.custom({ ...options, variant: "error" })
  },
  
  warning: (options: Omit<CustomToastOptions, "variant">) => {
    return toast.custom({ ...options, variant: "warning" })
  },
  
  info: (options: Omit<CustomToastOptions, "variant">) => {
    return toast.custom({ ...options, variant: "info" })
  },
  
  // Dismiss method
  dismiss: hotToast.dismiss,
}

export default ToastProvider