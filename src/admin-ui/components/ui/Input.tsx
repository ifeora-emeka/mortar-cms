"use client"

import type React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { LucideIcon } from "lucide-react"
import { BorderRadius, Color, ComponentDefaultProps, Shadow, Size, Variant } from "../../../types/components.types"
import * as Slot from '@radix-ui/react-slot'

//@ts-ignore
interface InputProps extends ComponentDefaultProps {
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    leftIcon?: LucideIcon
    rightIcon?: LucideIcon
    type?: string
    name?: string
    id?: string
    required?: boolean
    readOnly?: boolean
    "aria-label"?: string
    "aria-describedby"?: string
    asChild?: boolean
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    autoComplete?: string
}

const InputWrapper = styled.div<{
    $variant: Variant
    $color: Color
    $size: Size
    $fullWidth: boolean
    $hasLeftIcon: boolean
    $hasRightIcon: boolean
    $borderRadius: BorderRadius
    $shadow: Shadow
}>`
  position: relative;
  display: inline-flex;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`

const StyledInput = styled.input<{
    $variant: Variant
    $color: Color
    $size: Size
    $hasLeftIcon: boolean
    $hasRightIcon: boolean
    $borderRadius: BorderRadius
    $shadow: Shadow
}>`
  box-sizing: border-box;
  font-family: inherit;
  width: 100%;
  transition: all 0.2s ease;
  border-color: ${theme.colors.border};
  
  padding: ${(props) => {
    const basePadding =
        props.$size === "small"
            ? `${theme.spacing.xs} ${theme.spacing.sm}`
            : props.$size === "medium"
                ? `${theme.spacing.sm} ${theme.spacing.md}`
                : `${theme.spacing.md} ${theme.spacing.lg}`

    if (props.$hasLeftIcon && !props.$hasRightIcon) {
        return props.$size === "small"
            ? `${theme.spacing.xs} ${theme.spacing.sm} ${theme.spacing.xs} 2rem`
            : props.$size === "medium"
                ? `${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.sm} 2.5rem`
                : `${theme.spacing.md} ${theme.spacing.lg} ${theme.spacing.md} 3rem`
    } else if (!props.$hasLeftIcon && props.$hasRightIcon) {
        return props.$size === "small"
            ? `${theme.spacing.xs} 2rem ${theme.spacing.xs} ${theme.spacing.sm}`
            : props.$size === "medium"
                ? `${theme.spacing.sm} 2.5rem ${theme.spacing.sm} ${theme.spacing.md}`
                : `${theme.spacing.md} 3rem ${theme.spacing.md} ${theme.spacing.lg}`
    } else if (props.$hasLeftIcon && props.$hasRightIcon) {
        return props.$size === "small"
            ? `${theme.spacing.xs} 2rem ${theme.spacing.xs} 2rem`
            : props.$size === "medium"
                ? `${theme.spacing.sm} 2.5rem ${theme.spacing.sm} 2.5rem`
                : `${theme.spacing.md} 3rem ${theme.spacing.md} 3rem`
    } else {
        return basePadding
    }
}};
  
  font-size: ${(props) =>
    props.$size === "small" ? theme.fontSizes.sm : props.$size === "medium" ? theme.fontSizes.md : theme.fontSizes.lg};
  
  border-radius: ${props => {
    if (props.$borderRadius === 'none') return '0';
    return theme.borderRadius[props.$borderRadius];
  }};
  
  box-shadow: ${props => props.$shadow !== 'none' ? theme.shadows[props.$shadow] : 'none'};
  
  ${(props) => {
    const baseColor = theme.colors[props.$color];
    
    switch (props.$variant) {
        case "solid":
            return `
          border: 1px solid ${theme.colors.border};
          background-color: ${baseColor}1a;
          color: ${theme.colors.foreground};
          &:hover { background-color: ${baseColor}33; }
          &:focus { 
            outline: none;
            border-color: ${baseColor};
            box-shadow: 0 0 0 2px ${theme.colors.ring};
          }
        `;
        case "outline":
            return `
          border: 1px solid ${theme.colors.border};
          background-color: transparent;
          color: ${theme.colors.foreground};
          &:focus { 
            outline: none;
            border-color: ${baseColor};
            box-shadow: 0 0 0 2px ${theme.colors.ring};
          }
        `;
        case "ghost":
            return `
          border: 1px solid transparent;
          background-color: transparent;
          color: ${theme.colors.foreground};
          &:hover { background-color: ${baseColor}1a; }
          &:focus { 
            outline: none;
            box-shadow: 0 0 0 2px ${theme.colors.ring};
          }
        `;
        case "link":
            return `
          border: none;
          background-color: transparent;
          color: ${baseColor};
          text-decoration: underline;
          padding-left: 0;
          padding-right: 0;
          &:hover { text-decoration: none; }
          &:focus { 
            outline: none;
            text-decoration: none;
          }
        `;
        case "text":
            return `
          border: none;
          background-color: transparent;
          color: ${theme.colors.foreground};
          &:hover { background-color: ${baseColor}1a; }
          &:focus { 
            outline: none;
            box-shadow: 0 0 0 2px ${theme.colors.ring};
          }
        `;
        default:
            return "";
    }
}}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: ${theme.colors.muted};
  }
  
  &::placeholder {
    color: ${theme.colors["muted-foreground"]};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${(props) =>
    props.$size === "large"
        ? theme.fontSizes.md
        : props.$size === "medium"
            ? theme.fontSizes.sm
            : theme.fontSizes.xs};
  }
`

const IconWrapper = styled.div<{
    $position: "left" | "right"
    $size: Size
    $color: Color
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$position === "left" ? "left: 0.75rem;" : "right: 0.75rem;")}
  color: ${props => theme.colors[props.$color]};
  pointer-events: none;
  
  svg {
    width: ${(props) => (props.$size === "small" ? "0.875rem" : props.$size === "medium" ? "1rem" : "1.25rem")};
    height: ${(props) => (props.$size === "small" ? "0.875rem" : props.$size === "medium" ? "1rem" : "1.25rem")};
  }
`

export const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    onChange,
    className,
    variant = "outline",
    color = "primary",
    size = "medium",
    fullWidth = true,
    disabled = false,
    borderRadius = "md",
    shadow = "none",
    leftIcon,
    rightIcon,
    type = "text",
    name,
    id,
    required = false,
    readOnly = false,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    asChild = false,
    onClick,
    onFocus,
    autoComplete,
}) => {
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;
    
    const LeftIconComponent = leftIcon;
    const RightIconComponent = rightIcon;
    
    const Comp = asChild ? Slot.Root : StyledInput;
    
    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (onClick) onClick(e);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (onChange) onChange(e);
    };
    
    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.stopPropagation();
        if (onFocus) onFocus(e);
    };
    
    return (
        <InputWrapper
            className={className}
            $variant={variant}
            $color={color}
            $size={size}
            $fullWidth={fullWidth}
            $hasLeftIcon={hasLeftIcon}
            $hasRightIcon={hasRightIcon}
            $borderRadius={borderRadius}
            $shadow={shadow}
            onClick={e => e.stopPropagation()}
        >
            {hasLeftIcon && LeftIconComponent && (
                <IconWrapper $position="left" $size={size} $color={color}>
                    <LeftIconComponent />
                </IconWrapper>
            )}
            
            <Comp
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onClick={handleInputClick}
                onFocus={handleInputFocus}
                disabled={disabled}
                readOnly={readOnly}
                name={name}
                id={id}
                required={required}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedby}
                autoComplete={autoComplete}
                $variant={variant}
                $color={color}
                $size={size}
                $hasLeftIcon={hasLeftIcon}
                $hasRightIcon={hasRightIcon}
                $borderRadius={borderRadius}
                $shadow={shadow}
            />
            
            {hasRightIcon && RightIconComponent && (
                <IconWrapper $position="right" $size={size} $color={color}>
                    <RightIconComponent />
                </IconWrapper>
            )}
        </InputWrapper>
    );
};
