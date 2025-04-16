"use client"

import React, { Fragment, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styled, { css, keyframes } from "styled-components"
import { X } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Button } from "./Button"
import { Text } from "./Text"
import FocusTrap from "./utils/focus-trap"

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

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${props => props.$isOpen ? fadeIn : fadeOut} 0.2s ease-in-out forwards;
`

const getModalSizeStyles = (size: ModalSize) => {
  switch (size) {
    case "sm":
      return css`
        width: 400px;
        max-width: 90vw;
      `
    case "md":
      return css`
        width: 600px;
        max-width: 90vw;
      `
    case "lg":
      return css`
        width: 800px;
        max-width: 90vw;
      `
    case "xl":
      return css`
        width: 1000px;
        max-width: 90vw;
      `
    case "full":
      return css`
        width: 90vw;
        height: 90vh;
      `
    default:
      return ""
  }
}

const getModalPositionStyles = (position: ModalPosition) => {
  switch (position) {
    case "center":
      return css`
        position: relative;
        margin: auto;
      `
    case "top":
      return css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      `
    case "right":
      return css`
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        margin: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      `
    case "bottom":
      return css`
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      `
    case "left":
      return css`
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        height: 100vh;
        margin: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      `
    default:
      return ""
  }
}

const getModalAnimation = (position: ModalPosition, isOpen: boolean) => {
  switch (position) {
    case "center":
      return isOpen ? slideIn : slideOut
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

const ModalContainer = styled.div<{
  $size: ModalSize
  $position: ModalPosition
  $isOpen: boolean
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
  animation: ${props => getModalAnimation(props.$position, props.$isOpen)} 0.3s ease-in-out forwards;
  border: 1px solid ${theme.colors.border};
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
        return css`justify-content: flex-start;`
      case "center":
        return css`justify-content: center;`
      case "right":
        return css`justify-content: flex-end;`
      case "between":
        return css`justify-content: space-between;`
      case "around":
        return css`justify-content: space-around;`
      default:
        return css`justify-content: flex-end;`
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
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (isOpen && closeOnEsc && event.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
      
      if (preventScroll) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = "hidden"
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
      
      if (preventScroll) {
        document.body.style.overflow = ""
        document.body.style.paddingRight = ""
      }
    }
  }, [isOpen, closeOnEsc, preventScroll])

  const handleClose = () => {
    setIsAnimatingOut(true)
    const animationDuration = position === "center" ? 200 : 300
    
    setTimeout(() => {
      onClose()
      setIsAnimatingOut(false)
    }, animationDuration)
  }

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      handleClose()
    }
  }

  if (!isMounted) return null

  return isOpen ? createPortal(
    <Fragment>
      <ModalOverlay
        data-testid="modal-overlay"
        onClick={handleOverlayClick}
        $isOpen={!isAnimatingOut}
      >
        <FocusTrap active={isOpen}>
          <ModalContainer
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            $size={size}
            $position={position}
            $isOpen={!isAnimatingOut}
            className={className}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </ModalContainer>
        </FocusTrap>
      </ModalOverlay>
    </Fragment>,
    document.body
  ) : null
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
      {typeof heading === "string" ? (
        <Text type="h3" weight="semibold">
          {heading}
        </Text>
      ) : (
        heading
      )}
      
      {subheading && (
        typeof subheading === "string" ? (
          <Text type="p" muted>
            {subheading}
          </Text>
        ) : (
          subheading
        )
      )}
      
      {showCloseButton && onClose && (
        <CloseButton
          variant="ghost"
          size="small"
          color="accent"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={18} />
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