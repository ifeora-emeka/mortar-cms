"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { Text } from "./Text"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
  required?: boolean
  optional?: boolean
  error?: boolean
  description?: string
  className?: string
}

const StyledLabel = styled.label<{ $error: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  width: 100%;
  margin-bottom: ${theme.spacing.xs};
  cursor: pointer;
`

const LabelText = styled(Text)<{ $error: boolean, $required: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${props => props.$error ? theme.colors.error : theme.colors.foreground};

  &::after {
    content: "";
    display: ${props => props.$required ? "inline-block" : "none"};
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${theme.colors.error};
    margin-left: 2px;
  }
`

const OptionalText = styled(Text)`
  margin-left: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.xs};
`

const DescriptionText = styled(Text)<{ $error: boolean }>`
  font-size: ${theme.fontSizes.sm};
  color: ${props => props.$error ? theme.colors.error : theme.colors["muted-foreground"]};
`

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
  optional = false,
  error = false,
  description,
  className,
  ...props
}) => {
  return (
    <StyledLabel htmlFor={htmlFor} className={className} $error={error} {...props}>
      <LabelText 
        type="label" 
        weight="medium" 
        $error={error}
        $required={required}
      >
        {children}
        {optional && !required && (
          <OptionalText type="span" muted>
            (optional)
          </OptionalText>
        )}
      </LabelText>
      {description && (
        <DescriptionText type="small" $error={error}>
          {description}
        </DescriptionText>
      )}
    </StyledLabel>
  )
}

Label.displayName = "Label"