"use client"

import React from "react"
import styled, { keyframes, css } from "styled-components"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, LucideIcon } from "lucide-react"
import { Color } from "../../../types/components.types"
import { theme } from "../../../styles/theme"
import { Button } from "./Button"

export type ToastVariant = "success" | "error" | "info" | "warning"
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

interface ToastProps {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  onClose: () => void
  showIcon?: boolean
  showCloseButton?: boolean
  className?: string
}

// Animation keyframes
const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const getToastColors = (variant: ToastVariant) => {
  switch (variant) {
    case "success":
      return {
        background: `${theme.colors.success}15`,
        border: theme.colors.success,
        color: theme.colors.success,
        icon: CheckCircle
      }
    case "error":
      return {
        background: `${theme.colors.error}15`,
        border: theme.colors.error,
        color: theme.colors.error,
        icon: AlertCircle
      }
    case "warning":
      return {
        background: `${theme.colors.warning}15`,
        border: theme.colors.warning,
        color: theme.colors.warning,
        icon: AlertTriangle
      }
    case "info":
    default:
      return {
        background: `${theme.colors.info}15`,
        border: theme.colors.info,
        color: theme.colors.info,
        icon: Info
      }
  }
}

const ToastContainer = styled.div<{ $variant: ToastVariant }>`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background-color: ${props => getToastColors(props.$variant).background};
  box-shadow: ${theme.shadows.md};
  border-left: 4px solid ${props => getToastColors(props.$variant).border};
  animation: ${props => css`${slideIn} 0.3s ease-out`};
  width: 100%;
  max-width: 460px;
  pointer-events: all;
  z-index: 9000;
`

const IconWrapper = styled.div<{ $variant: ToastVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => getToastColors(props.$variant).color};
  flex-shrink: 0;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${theme.spacing.xs};
`

const Title = styled.h4`
  margin: 0;
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  color: ${theme.colors.foreground};
`

const Description = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors["muted-foreground"]};
`

const CloseButton = styled(Button)`
  padding: 0;
  color: ${theme.colors["muted-foreground"]};
`

export const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant = "info",
  onClose,
  showIcon = true,
  showCloseButton = true,
  className,
}) => {
  const { icon: IconComponent } = getToastColors(variant)
  
  return (
    <ToastContainer $variant={variant} className={className}>
      {showIcon && (
        <IconWrapper $variant={variant}>
          <IconComponent size={20} />
        </IconWrapper>
      )}
      
      <ContentContainer>
        {title && <Title>{title}</Title>}
        {description && <Description>{description}</Description>}
      </ContentContainer>
      
      {showCloseButton && (
        <CloseButton 
          variant="ghost" 
          size="small" 
          onClick={onClose}
          aria-label="Close toast"
        >
          <X size={16} />
        </CloseButton>
      )}
    </ToastContainer>
  )
}

Toast.displayName = "Toast"