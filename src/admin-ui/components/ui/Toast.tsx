"use client"

import React from "react"
import styled, { keyframes } from "styled-components"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { CheckCircle2, Info, AlertTriangle, X, XCircle } from "lucide-react"
import { theme } from "../../../styles/theme"
import { ComponentDefaultProps } from "../../../types/components.types"

export type ToastVariant = "success" | "info" | "warning" | "error"

interface ToastProps extends ComponentDefaultProps {
  title?: string
  description?: string
  variant?: ToastVariant
  open?: boolean
  onOpenChange?: (open: boolean) => void
  duration?: number
  action?: React.ReactNode
  altText?: string
  onClose?: () => void
}

// Animation keyframes
const slideIn = keyframes`
  from {
    transform: translateX(calc(100% + ${theme.spacing.md}));
  }
  to {
    transform: translateX(0);
  }
`

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(100% + ${theme.spacing.md}));
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const StyledViewport = styled(ToastPrimitive.Viewport)`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.md};
  gap: ${theme.spacing.sm};
  width: 380px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 9999;
  outline: none;
`

const StyledToast = styled(ToastPrimitive.Root)<{
  $variant: ToastVariant
}>`
  border-radius: ${theme.borderRadius.md};
  display: flex;
  padding: ${theme.spacing.md};
  gap: ${theme.spacing.xs};
  background: ${theme.colors.card};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${props => {
    switch (props.$variant) {
      case "success": return theme.colors.success;
      case "info": return theme.colors.info;
      case "warning": return theme.colors.warning;
      case "error": return theme.colors.error;
      default: return theme.colors.border;
    }
  }};
  color: ${theme.colors.foreground};
  position: relative;

  &[data-state="open"] {
    animation: ${slideIn} 200ms ease-out, ${fadeIn} 200ms ease-out;
  }
  
  &[data-state="closed"] {
    animation: ${slideOut} 200ms ease-out, ${fadeOut} 200ms ease-out;
  }
`

const ToastIconContainer = styled.div<{
  $variant: ToastVariant
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${props => {
    switch (props.$variant) {
      case "success": return theme.colors.success;
      case "info": return theme.colors.info;
      case "warning": return theme.colors.warning;
      case "error": return theme.colors.error;
      default: return theme.colors.primary;
    }
  }};
`

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
  flex: 1;
`

const ToastTitle = styled(ToastPrimitive.Title)`
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.foreground};
`

const ToastDescription = styled(ToastPrimitive.Description)`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors["muted-foreground"]};
`

const ToastClose = styled(ToastPrimitive.Close)`
  position: absolute;
  top: ${theme.spacing.xs};
  right: ${theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: ${theme.colors["muted-foreground"]};
  cursor: pointer;
  
  &:hover {
    color: ${theme.colors.foreground};
  }
`

const ToastAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: ${theme.spacing.xs};
`

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = "info",
  open,
  onOpenChange,
  duration = 5000,
  action,
  altText,
  onClose,
  className,
}) => {
  const handleOpenChange = (open: boolean) => {
    if (!open && onClose) onClose();
    if (onOpenChange) onOpenChange(open);
  };
  
  const renderIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle2 size={16} />;
      case "info":
        return <Info size={16} />;
      case "warning":
        return <AlertTriangle size={16} />;
      case "error":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };
  
  return (
    <StyledToast
      $variant={variant}
      open={open}
      onOpenChange={handleOpenChange}
      duration={duration}
      className={className}
    >
      <ToastIconContainer $variant={variant}>
        {renderIcon()}
      </ToastIconContainer>
      
      <ToastContent>
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
        
        {action && <ToastAction>{action}</ToastAction>}
      </ToastContent>
      
      <ToastClose aria-label="Close">
        <X size={16} />
      </ToastClose>
    </StyledToast>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastPrimitive.Provider>
      {children}
      <StyledViewport />
    </ToastPrimitive.Provider>
  );
};

Toast.displayName = "Toast";