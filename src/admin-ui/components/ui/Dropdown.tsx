"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import styled, { css, keyframes } from "styled-components"
import { Check, ChevronRight } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Text } from "./Text"
import { Color, Size, Variant } from "../../../types/components.types"
import FocusTrap from "./utils/focus-trap"

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-2px);
  }
`

// Context for the dropdown
type DropdownContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerRef: React.RefObject<HTMLDivElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    position: "top" | "bottom" | "left" | "right";
    align: "start" | "center" | "end";
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined)

// Custom hook to use the dropdown context
const useDropdown = () => {
    const context = useContext(DropdownContext)
    if (!context) {
        throw new Error("Dropdown components must be used within a DropdownRoot")
    }
    return context
}

// Root dropdown component
interface DropdownRootProps {
    children: React.ReactNode;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    position?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
    className?: string;
}

// Trigger component to open the dropdown
interface DropdownTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

// Content container
interface DropdownContentProps {
    children: React.ReactNode;
    className?: string;
    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;
    maxHeight?: string | number;
    sideOffset?: number;
    alignOffset?: number;
    avoidCollisions?: boolean;
}

// Individual item in the dropdown
interface DropdownItemProps {
    children: React.ReactNode;
    onSelect?: (e: React.MouseEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    className?: string;
    variant?: Variant;
    color?: Color;
    size?: Size;
    selected?: boolean;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    showSelectedCheckmark?: boolean;
    description?: string;
    destructive?: boolean;
}

interface DropdownLabelProps {
    children: React.ReactNode;
    className?: string;
}

interface DropdownSeparatorProps {
    className?: string;
}

interface DropdownGroupProps {
    children: React.ReactNode;
    className?: string;
}

const StyledTrigger = styled.div`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  position: relative;
`

const StyledContent = styled.div<{
    $open: boolean;
    $position: "top" | "bottom" | "left" | "right";
    $align: "start" | "center" | "end";
    $width?: string | number;
    $minWidth?: string | number;
    $maxWidth?: string | number;
    $maxHeight?: string | number;
    $sideOffset: number;
    $alignOffset: number;
}>`
  position: absolute;
  z-index: 100;
  min-width: ${props => props.$minWidth ? (typeof props.$minWidth === 'number' ? `${props.$minWidth}px` : props.$minWidth) : '200px'};
  width: ${props => props.$width ? (typeof props.$width === 'number' ? `${props.$width}px` : props.$width) : 'auto'};
  max-width: ${props => props.$maxWidth ? (typeof props.$maxWidth === 'number' ? `${props.$maxWidth}px` : props.$maxWidth) : '300px'};
  max-height: ${props => props.$maxHeight ? (typeof props.$maxHeight === 'number' ? `${props.$maxHeight}px` : props.$maxHeight) : 'calc(var(--vh, 1vh) * 80)'};
  overflow-y: auto;
  background-color: ${theme.colors.card};
  box-shadow: ${theme.shadows.lg};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.xs};
  display: ${props => props.$open ? 'block' : 'none'};
  animation: ${props => props.$open ? fadeIn : fadeOut} 0.1s ease-in-out forwards;
  
  ${props => {
        switch (props.$position) {
            case "top":
                return css`
          bottom: 100%;
          margin-bottom: ${props.$sideOffset}px;
          ${props.$align === "start" ? `left: ${props.$alignOffset}px;` :
                        props.$align === "end" ? `right: ${props.$alignOffset}px;` :
                            `left: 50%; transform: translateX(-50%);`}
        `;
            case "right":
                return css`
          left: 100%;
          margin-left: ${props.$sideOffset}px;
          ${props.$align === "start" ? `top: ${props.$alignOffset}px;` :
                        props.$align === "end" ? `bottom: ${props.$alignOffset}px;` :
                            `top: 50%; transform: translateY(-50%);`}
        `;
            case "left":
                return css`
          right: 100%;
          margin-right: ${props.$sideOffset}px;
          ${props.$align === "start" ? `top: ${props.$alignOffset}px;` :
                        props.$align === "end" ? `bottom: ${props.$alignOffset}px;` :
                            `top: 50%; transform: translateY(-50%);`}
        `;
            case "bottom":
            default:
                return css`
          top: 100%;
          margin-top: ${props.$sideOffset}px;
          ${props.$align === "start" ? `left: ${props.$alignOffset}px;` :
                        props.$align === "end" ? `right: ${props.$alignOffset}px;` :
                            `left: 50%; transform: translateX(-50%);`}
        `;
        }
    }}
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.muted};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors["muted-foreground"]};
  }
`

const StyledOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${props => props.$open ? 'block' : 'none'};
  z-index: 99;
`

const StyledItem = styled.div<{
    $disabled: boolean;
    $variant: Variant;
    $color: Color;
    $size: Size;
    $selected: boolean;
    $destructive: boolean;
}>`
  display: flex;
  align-items: center;
  position: relative;
  user-select: none;
  padding: ${props =>
        props.$size === "small" ? `${theme.spacing.xs} ${theme.spacing.sm}` :
            props.$size === "medium" ? `${theme.spacing.sm} ${theme.spacing.md}` :
                `${theme.spacing.md} ${theme.spacing.lg}`};
  gap: ${theme.spacing.sm};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  outline: none;
  transition: all 0.15s ease;
  border-radius: ${theme.borderRadius.md};
  
  ${props => {
        // Use the error color for the destructive variant
        const baseColor = props.$variant === "destructive"
            ? theme.colors.error
            : props.$destructive
                ? theme.colors.error
                : theme.colors[props.$color];

        // For destructive variant, always use error color for text
        const textColor = props.$variant === "destructive"
            ? theme.colors.error
            : props.$destructive
                ? theme.colors.error
                : props.$selected
                    ? theme.colors[props.$color]
                    : theme.colors.foreground;

        switch (props.$variant) {
            case "destructive":
                return css`
          background-color: ${props.$selected ? `${theme.colors.error}20` : 'transparent'};
          color: ${theme.colors.error};
          &:hover:not(:disabled) { background-color: ${theme.colors.error}15; }
          &:focus:not(:disabled) { background-color: ${theme.colors.error}20; }
          &:active:not(:disabled) { background-color: ${theme.colors.error}25; }
        `;
            case "solid":
                return css`
          background-color: ${props.$selected ? `${baseColor}20` : 'transparent'};
          color: ${textColor};
          &:hover:not(:disabled) { background-color: ${baseColor}33; }
          &:focus:not(:disabled) { background-color: ${baseColor}33; }
          &:active:not(:disabled) { background-color: ${baseColor}40; }
        `;
            case "outline":
                return css`
          background-color: transparent;
          border-left: 2px solid ${props.$selected ? baseColor : 'transparent'};
          color: ${textColor};
          &:hover:not(:disabled) { background-color: ${theme.colors.accent}; }
          &:focus:not(:disabled) { background-color: ${theme.colors.accent}; }
          &:active:not(:disabled) { background-color: ${theme.colors.accent}; }
        `;
            case "ghost":
            default:
                return css`
          background-color: ${props.$selected ? `${baseColor}20` : 'transparent'};
          color: ${textColor};
          &:hover:not(:disabled) { background-color: ${theme.colors.accent}; }
          &:focus:not(:disabled) { background-color: ${theme.colors.accent}; }
          &:active:not(:disabled) { background-color: ${theme.colors.accent}; }
        `;
        }
    }}
  
  opacity: ${props => props.$disabled ? 0.5 : 1};
`

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ItemDescription = styled(Text)`
  opacity: 0.7;
  font-size: ${theme.fontSizes.xs};
`

const RightSlot = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: ${theme.colors["muted-foreground"]};
`

const StyledLabel = styled.div`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  color: ${theme.colors["muted-foreground"]};
  font-size: ${theme.fontSizes.xs};
  font-weight: 500;
`

const StyledSeparator = styled.div`
  height: 1px;
  background-color: ${theme.colors.border};
  margin: ${theme.spacing.xs} 0;
`

const StyledGroup = styled.div`
  & + & {
    margin-top: ${theme.spacing.xs};
  }
`

// Component Implementations
export function DropdownRoot({
    children,
    defaultOpen = false,
    onOpenChange,
    position = "bottom",
    align = "start",
    className,
}: DropdownRootProps) {
    const [open, setOpen] = useState(defaultOpen)
    const triggerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    // Call the onOpenChange callback when open state changes
    useEffect(() => {
        if (onOpenChange) {
            onOpenChange(open)
        }
    }, [open, onOpenChange])

    // Close on escape key
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (open && e.key === 'Escape') {
                setOpen(false)
            }
        }

        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [open])

    // Handle clicks outside to close
    useEffect(() => {
        if (!open) return

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node
            if (
                triggerRef.current &&
                contentRef.current &&
                !triggerRef.current.contains(target) &&
                !contentRef.current.contains(target)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    // Position the dropdown within viewport bounds
    useEffect(() => {
        if (!open || !contentRef.current) return

        const updatePosition = () => {
            const content = contentRef.current
            if (!content || !triggerRef.current) return

            const contentRect = content.getBoundingClientRect()
            const triggerRect = triggerRef.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const viewportWidth = window.innerWidth

            // Check if dropdown will go off-screen and adjust if needed
            if (position === "bottom" && triggerRect.bottom + contentRect.height > viewportHeight) {
                content.style.top = 'auto'
                content.style.bottom = '100%'
                content.style.marginTop = '0'
                content.style.marginBottom = '8px'
            }

            if (position === "top" && triggerRect.top - contentRect.height < 0) {
                content.style.bottom = 'auto'
                content.style.top = '100%'
                content.style.marginBottom = '0'
                content.style.marginTop = '8px'
            }

            // Handle horizontal overflow
            if (align === "start" && position !== "left" && position !== "right") {
                const rightOverflow = triggerRect.left + contentRect.width - viewportWidth
                if (rightOverflow > 0) {
                    content.style.left = 'auto'
                    content.style.right = '0'
                }
            }

            if (align === "end" && position !== "left" && position !== "right") {
                const leftOverflow = triggerRect.right - contentRect.width
                if (leftOverflow < 0) {
                    content.style.right = 'auto'
                    content.style.left = '0'
                }
            }
        }

        updatePosition()
        window.addEventListener('resize', updatePosition)
        return () => window.removeEventListener('resize', updatePosition)
    }, [open, position, align])

    return (
        <DropdownContext.Provider
            value={{
                open,
                setOpen,
                triggerRef,
                contentRef,
                position,
                align
            }}
        >
            <div className={className} style={{ position: 'relative' }}>
                {children}
            </div>
            <StyledOverlay $open={open} />
        </DropdownContext.Provider>
    )
}

export function DropdownTrigger({ children, asChild = false, className }: DropdownTriggerProps) {
    const { open, setOpen, triggerRef } = useDropdown()

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setOpen(!open)
    }

    // If asChild is true, clone the child and pass the props
    if (asChild && React.Children.count(children) === 1) {
        const child = React.Children.only(children) as React.ReactElement<{
            onClick?: (e: React.MouseEvent) => void;
            ref?: React.Ref<HTMLDivElement>;
            'aria-expanded'?: boolean;
            'aria-haspopup'?: boolean | 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
        }>

        return React.cloneElement(child, {
            ref: triggerRef as React.RefObject<HTMLDivElement>,
            onClick: (e: React.MouseEvent) => {
                handleClick(e)
                if (child.props.onClick) child.props.onClick(e)
            },
            'aria-expanded': open,
            'aria-haspopup': true,
        })
    }

    return (
        <StyledTrigger
            ref={triggerRef}
            className={className}
            onClick={handleClick}
            aria-expanded={open}
            aria-haspopup={true}
        >
            {children}
        </StyledTrigger>
    )
}

export function DropdownContent({
    children,
    className,
    width,
    minWidth,
    maxWidth,
    maxHeight,
    sideOffset = 4,
    alignOffset = 0,
    avoidCollisions = true,
}: DropdownContentProps) {
    const { open, contentRef, position, align } = useDropdown()

    if (!open) return null

    return (
        <FocusTrap active={open}>
            <StyledContent
                ref={contentRef}
                className={className}
                $open={open}
                $position={position}
                $align={align}
                $width={width}
                $minWidth={minWidth}
                $maxWidth={maxWidth}
                $maxHeight={maxHeight}
                $sideOffset={sideOffset}
                $alignOffset={alignOffset}
                role="menu"
                aria-orientation="vertical"
            >
                {children}
            </StyledContent>
        </FocusTrap>
    )
}

export function DropdownItem({
    children,
    onSelect,
    disabled = false,
    className,
    variant = "ghost",
    color = "primary",
    size = "medium",
    selected = false,
    icon,
    rightIcon,
    showSelectedCheckmark = false,
    description,
    destructive = false,
}: DropdownItemProps) {
    const { setOpen } = useDropdown()

    if (destructive) {
        variant = "destructive";
        color = "error";
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return

        if (onSelect) {
            onSelect(e)
        }

        setOpen(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (onSelect) {
                onSelect(e as unknown as React.MouseEvent<HTMLDivElement>)
            }
            setOpen(false)
        }
    }

    return (
        <StyledItem
            className={className}
            $disabled={disabled}
            $variant={variant}
            $color={color}
            $size={size}
            $selected={selected}
            $destructive={destructive}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="menuitem"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
        >
            {icon && (
                <span style={{ flexShrink: 0, display: 'flex' }}>
                    {icon}
                </span>
            )}

            <ItemContent>
                {typeof children === 'string' ? (
                    <Text type="p" weight={selected ? "medium" : "normal"}>
                        {children}
                    </Text>
                ) : (
                    children
                )}

                {description && (
                    <ItemDescription type="small">
                        {description}
                    </ItemDescription>
                )}
            </ItemContent>

            <RightSlot>
                {selected && showSelectedCheckmark && <Check size={16} />}
                {rightIcon && rightIcon}
            </RightSlot>
        </StyledItem>
    )
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
    return (
        <StyledLabel className={className} role="presentation">
            {children}
        </StyledLabel>
    )
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
    return <StyledSeparator className={className} role="separator" />
}

export function DropdownGroup({ children, className }: DropdownGroupProps) {
    return (
        <StyledGroup className={className} role="group">
            {children}
        </StyledGroup>
    )
}

export const Dropdown = {
    Root: DropdownRoot,
    Trigger: DropdownTrigger,
    Content: DropdownContent,
    Item: DropdownItem,
    Label: DropdownLabel,
    Separator: DropdownSeparator,
    Group: DropdownGroup,
}