"use client"

import React from "react"
import styled from "styled-components"
import * as LabelPrimitive from "@radix-ui/react-label"
import { theme } from "../../../styles/theme"
import { ComponentDefaultProps } from "../../../types/components.types"

interface LabelProps extends ComponentDefaultProps, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  htmlFor?: string
  required?: boolean
  optional?: boolean
  disabled?: boolean
  error?: boolean
}

const StyledLabel = styled(LabelPrimitive.Root)<{
  $disabled?: boolean
  $error?: boolean
}>`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
  color: ${props => {
    if (props.$disabled) return theme.colors["muted-foreground"]
    if (props.$error) return theme.colors.error
    return theme.colors.foreground
  }};
  cursor: ${props => (props.$disabled ? "not-allowed" : "default")};
  display: block;
  margin-bottom: ${theme.spacing.xs};
`

const RequiredIndicator = styled.span`
  color: ${theme.colors.error};
  margin-left: ${theme.spacing.xxs};
`

const OptionalLabel = styled.span`
  color: ${theme.colors["muted-foreground"]};
  font-size: ${theme.fontSizes.xs};
  margin-left: ${theme.spacing.xs};
  font-weight: normal;
`

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
  optional = false,
  disabled = false,
  error = false,
  className,
  ...props
}) => {
  return (
    <StyledLabel 
      htmlFor={htmlFor}
      $disabled={disabled}
      $error={error}
      className={className}
      {...props}
    >
      {children}
      
      {required && <RequiredIndicator aria-hidden="true">*</RequiredIndicator>}
      {optional && <OptionalLabel>(optional)</OptionalLabel>}
    </StyledLabel>
  )
}

Label.displayName = "Label"