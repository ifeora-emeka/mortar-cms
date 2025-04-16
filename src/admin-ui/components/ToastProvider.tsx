"use client"

import React, { createContext, useContext, useState } from "react"
import { Toast, ToastVariant, ToastProvider as RadixToastProvider } from "./ui/Toast"
import * as ToastPrimitive from "@radix-ui/react-toast"

type ToastContextType = {
  toast: (props: {
    title?: string
    description?: string
    variant?: ToastVariant
    duration?: number
    action?: React.ReactNode
    altText?: string
  }) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastItem {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: React.ReactNode
  open: boolean
  altText?: string
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = ({
    title,
    description,
    variant = "info",
    duration = 5000,
    action,
    altText,
  }: {
    title?: string
    description?: string
    variant?: ToastVariant
    duration?: number
    action?: React.ReactNode
    altText?: string
  }) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastItem = {
      id,
      title,
      description,
      variant,
      duration,
      action,
      open: true,
      altText,
    }
    setToasts((prev) => [...prev, newToast])
    return id
  }

  const dismiss = (id: string) => {
    setToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, open: false } : toast))
    )
    // Remove toast after animation is complete
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 200)
  }

  const handleOpenChange = (open: boolean, id: string) => {
    if (!open) {
      dismiss(id)
    }
  }

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            duration={toast.duration}
            action={toast.action}
            open={toast.open}
            onOpenChange={(open) => handleOpenChange(open, toast.id)}
            altText={toast.altText}
          />
        ))}
        
        <ToastPrimitive.Viewport 
          className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-[380px] max-w-[100vw] m-0 list-none z-[9999] outline-none"
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}