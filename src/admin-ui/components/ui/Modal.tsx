"use client"

import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { X } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Button } from "./Button"
import { Text } from "./Text"
import * as DialogPrimitive from '@radix-ui/react-dialog'

type ModalSize = "sm" | "md" | "lg" | "xl" | "full"
type ModalPosition = "center" | "top" | "right" | "bottom" | "left"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  closeOnOverlayClick?: boolean
  closeOnEsc?: boolean
  children: React.ReactNode
  className?: string
  size?: ModalSize
  position?: ModalPosition
  showCloseButton?: boolean
  preventScroll?: boolean
}

interface ModalHeaderProps {
  heading: React.ReactNode
  subheading?: React.ReactNode
  showCloseButton?: boolean
  onClose?: () => void
  className?: string
}

interface ModalBodyProps {
  children: React.ReactNode
  className?: string
  scrollable?: boolean
  padding?: "none" | "sm" | "md" | "lg"
}

interface ModalFooterProps {
  children: React.ReactNode
  className?: string
  align?: "left" | "center" | "right" | "between" | "around"
}

// Animation keyframes
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

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(20px);
    opacity: 0;
  }
`

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`

const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const slideOutToBottom = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideOutToLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`

const slideInFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`

const slideOutToTop = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`

// Helper to get modal size styles
const getModalSizeStyles = (size: ModalSize) => {
  switch (size) {
    case "sm":
      return `width: 400px; max-width: calc(100vw - 32px);`
    case "md":
      return `width: 600px; max-width: calc(100vw - 32px);`
    case "lg":
      return `width: 800px; max-width: calc(100vw - 32px);`
    case "xl":
      return `width: 1000px; max-width: calc(100vw - 32px);`
    case "full":
      return `width: calc(100vw - 32px); height: calc(100vh - 32px);`
  }
}

// Helper to get modal position styles
const getModalPositionStyles = (position: ModalPosition) => {
  switch (position) {
    case "top":
      return `
        position: fixed;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 16px;
      `
    case "right":
      return `
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 400px;
        max-width: 100vw;
        border-radius: ${theme.borderRadius.md} 0 0 ${theme.borderRadius.md};
        height: 100vh;
      `
    case "bottom":
      return `
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 16px;
      `
    case "left":
      return `
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 400px;
        max-width: 100vw;
        border-radius: 0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0;
        height: 100vh;
      `
    case "center":
    default:
      return `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `
  }
}

// Helper to determine which animation to use based on position and open state
const getModalAnimation = (position: ModalPosition, isOpen: boolean) => {
  switch (position) {
    case "top":
      return isOpen ? slideInFromTop : slideOutToTop
    case "right":
      return isOpen ? slideInFromRight : slideOutToRight
    case "bottom":
      return isOpen ? slideInFromBottom : slideOutToBottom
    case "left":
      return isOpen ? slideInFromLeft : slideOutToLeft
    default:
      return isOpen ? slideIn : slideOut
  }
}

const StyledOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  animation: ${fadeIn} 0.2s ease-out;
  
  &[data-state="closed"] {
    animation: ${fadeOut} 0.2s ease-in;
  }
`

const StyledModalContainer = styled(DialogPrimitive.Content)<{
  $size: ModalSize
  $position: ModalPosition
}>`
  background: ${theme.colors.card};
  color: ${theme.colors.foreground};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.lg};
  display: flex;
  flex-direction: column;
  max-height: ${props => props.$position !== "center" ? "100%" : "90vh"};
  ${props => getModalSizeStyles(props.$size)}
  ${props => getModalPositionStyles(props.$position)}
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
  z-index: 1000;
  
  &[data-state="open"] {
    animation: ${props => getModalAnimation(props.$position, true)} 0.3s ease-in-out forwards;
  }
  
  &[data-state="closed"] {
    animation: ${props => getModalAnimation(props.$position, false)} 0.3s ease-in-out forwards;
  }
`

const StyledModalHeader = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  position: relative;
`

const CloseButton = styled(Button)`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
`

const StyledModalBody = styled.div<{
  $scrollable: boolean
  $padding: "none" | "sm" | "md" | "lg"
}>`
  flex-grow: 1;
  padding: ${props => 
    props.$padding === "none" ? "0" : 
    props.$padding === "sm" ? theme.spacing.sm : 
    props.$padding === "lg" ? theme.spacing.lg : 
    theme.spacing.md
  };
  overflow-y: ${props => (props.$scrollable ? "auto" : "visible")};
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.background};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.muted};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors["muted-foreground"]};
  }
`

const StyledModalFooter = styled.div<{
  $align: "left" | "center" | "right" | "between" | "around"
}>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  
  ${props => {
    switch (props.$align) {
      case "left":
        return `justify-content: flex-start;`
      case "center":
        return `justify-content: center;`
      case "right":
        return `justify-content: flex-end;`
      case "between":
        return `justify-content: space-between;`
      case "around":
        return `justify-content: space-around;`
      default:
        return `justify-content: flex-end;`
    }
  }}
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

export function Modal({
  isOpen,
  onClose,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  children,
  className,
  size = "md",
  position = "center",
  showCloseButton = true,
  preventScroll = true,
}: ModalProps) {
  // Handle scroll locking
  useEffect(() => {
    if (preventScroll && isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`
      
      return () => {
        document.body.style.overflow = ""
        document.body.style.paddingRight = ""
      }
    }
    return undefined
  }, [isOpen, preventScroll])
  
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <StyledOverlay onClick={closeOnOverlayClick ? onClose : undefined} />
        <StyledModalContainer
          className={className}
          $size={size}
          $position={position}
          onEscapeKeyDown={closeOnEsc ? onClose : undefined}
          onInteractOutside={closeOnOverlayClick ? onClose : undefined}
        >
          {children}
        </StyledModalContainer>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

export function ModalHeader({
  heading,
  subheading,
  showCloseButton = true,
  onClose,
  className,
}: ModalHeaderProps) {
  return (
    <StyledModalHeader className={className}>
      {typeof heading === 'string' ? (
        <Text type="h4" weight="semibold">
          {heading}
        </Text>
      ) : (
        heading
      )}
      
      {subheading && (
        typeof subheading === 'string' ? (
          <Text type="p" muted>
            {subheading}
          </Text>
        ) : (
          subheading
        )
      )}
      
      {showCloseButton && onClose && (
        <CloseButton variant="ghost" size="small" onClick={onClose} aria-label="Close">
          <X size={16} />
        </CloseButton>
      )}
    </StyledModalHeader>
  )
}

export function ModalBody({
  children,
  className,
  scrollable = true,
  padding = "md",
}: ModalBodyProps) {
  return (
    <StyledModalBody
      className={className}
      $scrollable={scrollable}
      $padding={padding}
    >
      {children}
    </StyledModalBody>
  )
}

export function ModalFooter({
  children,
  className,
  align = "right",
}: ModalFooterProps) {
  return (
    <StyledModalFooter className={className} $align={align}>
      {children}
    </StyledModalFooter>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter