"use client"

import React from "react"
import styled, { keyframes } from "styled-components"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { theme } from "../../../styles/theme"
import { ComponentDefaultProps } from "../../../types/components.types"

// Animation keyframes
const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const StyledContent = styled(DropdownMenuPrimitive.Content)`
  min-width: 220px;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.border};
  z-index: 100;
  
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 0.4s;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;
    will-change: transform, opacity;
    
    &[data-state="open"][data-side="top"] {
      animation-name: ${slideDownAndFade};
    }
    
    &[data-state="open"][data-side="right"] {
      animation-name: ${slideLeftAndFade};
    }
    
    &[data-state="open"][data-side="bottom"] {
      animation-name: ${slideUpAndFade};
    }
    
    &[data-state="open"][data-side="left"] {
      animation-name: ${slideRightAndFade};
    }
  }
`

const StyledItem = styled(DropdownMenuPrimitive.Item)`
  all: unset;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.foreground};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  position: relative;
  user-select: none;
  
  &[data-highlighted] {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.foreground};
  }
  
  &[data-disabled] {
    color: ${theme.colors["muted-foreground"]};
    pointer-events: none;
  }
  
  &[data-highlighted][data-keyboard-focus="visible"] {
    outline: 2px solid ${theme.colors.ring};
    outline-offset: -2px;
  }
`

const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  all: unset;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.foreground};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  position: relative;
  padding-left: ${theme.spacing.xl};
  user-select: none;
  
  &[data-highlighted] {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.foreground};
  }
  
  &[data-disabled] {
    color: ${theme.colors["muted-foreground"]};
    pointer-events: none;
  }
`

const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  all: unset;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.foreground};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  position: relative;
  padding-left: ${theme.spacing.xl};
  user-select: none;
  
  &[data-highlighted] {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.foreground};
  }
  
  &[data-disabled] {
    color: ${theme.colors["muted-foreground"]};
    pointer-events: none;
  }
`

const StyledLabel = styled(DropdownMenuPrimitive.Label)`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.fontSizes.xs};
  line-height: 1;
  font-weight: 600;
  color: ${theme.colors["muted-foreground"]};
`

const StyledSeparator = styled(DropdownMenuPrimitive.Separator)`
  height: 1px;
  background-color: ${theme.colors.border};
  margin: ${theme.spacing.xs};
`

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator)`
  position: absolute;
  left: ${theme.spacing.xs};
  width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const StyledSubTrigger = styled(DropdownMenuPrimitive.SubTrigger)`
  all: unset;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.foreground};
  border-radius: ${theme.borderRadius.sm};
  display: flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  position: relative;
  user-select: none;
  
  &[data-highlighted] {
    background-color: ${theme.colors.accent};
    color: ${theme.colors.foreground};
  }
  
  &[data-state="open"] {
    background-color: ${theme.colors.accent};
  }
`

const StyledSubContent = styled(DropdownMenuPrimitive.SubContent)`
  min-width: 220px;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.border};
  z-index: 101;
  
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 0.4s;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: forwards;
    will-change: transform, opacity;
    
    &[data-state="open"][data-side="top"] {
      animation-name: ${slideDownAndFade};
    }
    
    &[data-state="open"][data-side="right"] {
      animation-name: ${slideLeftAndFade};
    }
    
    &[data-state="open"][data-side="bottom"] {
      animation-name: ${slideUpAndFade};
    }
    
    &[data-state="open"][data-side="left"] {
      animation-name: ${slideRightAndFade};
    }
  }
`

const RightSlot = styled.div`
  margin-left: auto;
  padding-left: ${theme.spacing.md};
  color: ${theme.colors["muted-foreground"]};
  
  [data-highlighted] > & {
    color: currentColor;
  }
  
  [data-disabled] & {
    color: ${theme.colors["muted-foreground"]};
  }
`

type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> & ComponentDefaultProps

export const Dropdown = DropdownMenuPrimitive.Root

export const DropdownTrigger = DropdownMenuPrimitive.Trigger

export const DropdownGroup = DropdownMenuPrimitive.Group

export const DropdownPortal = DropdownMenuPrimitive.Portal

export const DropdownSub = DropdownMenuPrimitive.Sub

export const DropdownRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <StyledContent
      ref={ref}
      sideOffset={sideOffset}
      className={className}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

export const DropdownItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, ...props }, ref) => (
  <StyledItem
    ref={ref}
    className={className}
    {...props}
  />
))

export const DropdownCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <StyledCheckboxItem
    ref={ref}
    className={className}
    checked={checked}
    {...props}
  >
    <StyledItemIndicator>
      <Check size={12} />
    </StyledItemIndicator>
    {children}
  </StyledCheckboxItem>
))

export const DropdownRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <StyledRadioItem
    ref={ref}
    className={className}
    {...props}
  >
    <StyledItemIndicator>
      <Circle size={8} fill="currentColor" />
    </StyledItemIndicator>
    {children}
  </StyledRadioItem>
))

export const DropdownLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, ...props }, ref) => (
  <StyledLabel
    ref={ref}
    className={className}
    {...props}
  />
))

export const DropdownSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <StyledSeparator
    ref={ref}
    className={className}
    {...props}
  />
))

export const DropdownShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <RightSlot className={className} {...props} />
  )
}

export const DropdownSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, children, ...props }, ref) => (
  <StyledSubTrigger
    ref={ref}
    className={className}
    {...props}
  >
    {children}
    <RightSlot>
      <ChevronRight size={16} />
    </RightSlot>
  </StyledSubTrigger>
))

export const DropdownSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <StyledSubContent
    ref={ref}
    className={className}
    {...props}
  />
))

// Assign display names
DropdownContent.displayName = "DropdownContent"
DropdownItem.displayName = "DropdownItem"
DropdownCheckboxItem.displayName = "DropdownCheckboxItem"
DropdownRadioItem.displayName = "DropdownRadioItem"
DropdownLabel.displayName = "DropdownLabel"
DropdownSeparator.displayName = "DropdownSeparator"
DropdownShortcut.displayName = "DropdownShortcut"
DropdownSubTrigger.displayName = "DropdownSubTrigger"
DropdownSubContent.displayName = "DropdownSubContent"