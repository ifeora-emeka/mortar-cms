"use client"

import React from "react"
import styled from "styled-components"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { theme } from "../../../styles/theme"
import { Color, ComponentDefaultProps } from "../../../types/components.types"

// Rename to avoid conflict with Radix UI's type
interface CustomRadioGroupProps extends Omit<ComponentDefaultProps, 'onClick'> {
  color?: Color
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
}

// Combine our props with Radix UI's props
interface RadioGroupProps extends 
  CustomRadioGroupProps,
  Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, keyof CustomRadioGroupProps> {}

interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  color?: Color
  disabled?: boolean
  value: string
}

interface RadioGroupLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  disabled?: boolean
  htmlFor?: string; // Add htmlFor explicitly
}

const StyledRadioGroup = styled(RadioGroupPrimitive.Root)<{
  $color: Color
  $orientation: "horizontal" | "vertical"
  $disabled: boolean
}>`
  display: flex;
  flex-direction: ${props => props.$orientation === "vertical" ? "column" : "row"};
  gap: ${props => props.$orientation === "vertical" ? theme.spacing.sm : theme.spacing.md};
  opacity: ${props => props.$disabled ? 0.6 : 1};
`

const StyledRadioGroupItem = styled(RadioGroupPrimitive.Item)<{
  $color: Color
  $disabled: boolean
}>`
  all: unset;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${props => theme.colors[props.$color]};
  background-color: transparent;
  cursor: ${props => props.$disabled ? "not-allowed" : "pointer"};
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background-color: ${props => props.$disabled ? "transparent" : `${theme.colors[props.$color]}10`};
  }
  
  &:focus-visible {
    box-shadow: 0 0 0 2px ${theme.colors.ring};
  }
  
  &[data-state="checked"] {
    background-color: ${props => theme.colors[props.$color]};
  }
`

const StyledRadioGroupIndicator = styled(RadioGroupPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;
  }
`

const StyledRadioGroupLabel = styled.label<{
  $disabled?: boolean
}>`
  font-size: ${theme.fontSizes.sm};
  color: ${props => props.$disabled ? theme.colors["muted-foreground"] : theme.colors.foreground};
  cursor: ${props => props.$disabled ? "not-allowed" : "pointer"};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  user-select: none;
`

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({
  color = "primary",
  orientation = "vertical",
  disabled = false,
  className,
  ...props
}, ref) => (
  <StyledRadioGroup
    ref={ref}
    className={className}
    $color={color}
    $orientation={orientation}
    $disabled={disabled}
    disabled={disabled}
    {...props}
  />
));

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({
  color = "primary",
  disabled = false,
  className,
  children,
  ...props
}, ref) => (
  <StyledRadioGroupItem
    ref={ref}
    className={className}
    $color={color}
    $disabled={disabled}
    disabled={disabled}
    {...props}
  >
    <StyledRadioGroupIndicator />
  </StyledRadioGroupItem>
));

export const RadioGroupLabel = React.forwardRef<
  HTMLLabelElement,
  RadioGroupLabelProps
>(({
  className,
  disabled = false,
  htmlFor,
  children,
  ...props
}, ref) => (
  <StyledRadioGroupLabel
    ref={ref}
    className={className}
    $disabled={disabled}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </StyledRadioGroupLabel>
));

// RadioItem component with label for convenience
export const RadioItem: React.FC<{
  value: string
  label: string
  color?: Color
  disabled?: boolean
  id?: string
}> = ({
  value,
  label,
  color = "primary",
  disabled = false,
  id,
}) => {
  const itemId = id || `radio-${value}`;
  
  return (
    <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.xs }}>
      <RadioGroupItem 
        value={value} 
        id={itemId} 
        color={color} 
        disabled={disabled} 
      />
      <RadioGroupLabel htmlFor={itemId} disabled={disabled}>
        {label}
      </RadioGroupLabel>
    </div>
  );
};

RadioGroup.displayName = "RadioGroup";
RadioGroupItem.displayName = "RadioGroupItem";
RadioGroupLabel.displayName = "RadioGroupLabel";
RadioItem.displayName = "RadioItem";