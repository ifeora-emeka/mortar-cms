"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { BorderRadius, Color, ComponentDefaultProps, Shadow, Size, Variant } from "../../../types/components.types"
import * as Slot from '@radix-ui/react-slot'

//@ts-ignore
interface TextAreaProps extends ComponentDefaultProps {
  placeholder?: string
  value?: string | null
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  name?: string
  id?: string
  rows?: number
  minHeight?: string
  maxHeight?: string
  required?: boolean
  disabled?: boolean
  "aria-label"?: string
  "aria-describedby"?: string
  error?: boolean
  asChild?: boolean
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}

const StyledTextArea = styled.textarea<{
  $variant: Variant
  $color: Color
  $size: Size
  $fullWidth: boolean
  $borderRadius: BorderRadius
  $shadow: Shadow
  $minHeight?: string
  $maxHeight?: string
  $error?: boolean
}>`
  box-sizing: border-box;
  font-family: inherit;
  width: 100%;
  min-height: ${props => props.$minHeight || "80px"};
  max-height: ${props => props.$maxHeight || "none"};
  resize: vertical;
  transition: all 0.2s ease;
  border-color: ${theme.colors.border};
  
  padding: ${props => 
    props.$size === "small" 
      ? theme.spacing.sm
      : props.$size === "medium"
        ? theme.spacing.md
        : theme.spacing.lg
  };
  
  font-size: ${props => 
    props.$size === "small" 
      ? theme.fontSizes.sm 
      : props.$size === "medium" 
        ? theme.fontSizes.md 
        : theme.fontSizes.lg
  };
  
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
          border: 1px solid ${props.$error ? theme.colors.error : theme.colors.border};
          background-color: ${baseColor}1a;
          color: ${theme.colors.foreground};
          &:hover { background-color: ${baseColor}33; }
          &:focus { 
            outline: none;
            border-color: ${props.$error ? theme.colors.error : baseColor};
            box-shadow: 0 0 0 2px ${props.$error ? `${theme.colors.error}30` : theme.colors.ring};
          }
        `;
      case "outline":
        return `
          border: 1px solid ${props.$error ? theme.colors.error : theme.colors.border};
          background-color: transparent;
          color: ${theme.colors.foreground};
          &:focus { 
            outline: none;
            border-color: ${props.$error ? theme.colors.error : baseColor};
            box-shadow: 0 0 0 2px ${props.$error ? `${theme.colors.error}30` : theme.colors.ring};
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
    font-size: ${props =>
      props.$size === "large" ? theme.fontSizes.md :
      props.$size === "medium" ? theme.fontSizes.sm :
      theme.fontSizes.xs
    };
  }
`

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
  className,
  variant = "outline",
  color = "primary",
  size = "medium",
  fullWidth = true,
  borderRadius = "md",
  shadow = "none",
  rows = 4,
  minHeight,
  maxHeight,
  name,
  id,
  required = false,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  error = false,
  asChild = false,
  onClick,
  onFocus,
}) => {
  // Convert null to empty string to satisfy TypeScript
  const safeValue = value === null ? "" : value;
  
  const TextAreaComp = asChild ? Slot.Root : StyledTextArea;
  
  const handleTextAreaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (onChange) onChange(e);
  };
  
  const handleTextAreaFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (onFocus) onFocus(e);
  };
  
  return (
    <TextAreaComp
      placeholder={placeholder}
      value={safeValue}
      onChange={handleTextAreaChange}
      onClick={handleTextAreaClick}
      onFocus={handleTextAreaFocus}
      rows={rows}
      name={name}
      id={id}
      required={required}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      className={className}
      $variant={variant}
      $color={color}
      $size={size}
      $fullWidth={fullWidth}
      $borderRadius={borderRadius}
      $shadow={shadow}
      $minHeight={minHeight}
      $maxHeight={maxHeight}
      $error={error}
    />
  )
}

TextArea.displayName = "TextArea"