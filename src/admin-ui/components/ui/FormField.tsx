"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { ComponentDefaultProps } from "../../../types/components.types"
import { Label } from "./Label"
import { Text } from "./Text"

interface FormFieldProps extends ComponentDefaultProps {
  id?: string
  name?: string
  label?: string
  required?: boolean
  optional?: boolean
  error?: string | boolean
  helpText?: string
  children: React.ReactNode
}

const FormFieldWrapper = styled.div`
  margin-bottom: ${theme.spacing.md};
`

const HelpText = styled(Text)<{ $error?: boolean }>`
  display: block;
  margin-top: ${theme.spacing.xs};
  color: ${props => props.$error ? theme.colors.error : theme.colors["muted-foreground"]};
`

export const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  required = false,
  optional = false,
  error,
  helpText,
  children,
  className,
}) => {
  const fieldId = id || name || Math.random().toString(36).substring(2, 9)
  const errorId = `${fieldId}-error`
  const helpTextId = `${fieldId}-description`
  const hasError = !!error
  const errorMessage = typeof error === 'string' ? error : undefined
  
  return (
    <FormFieldWrapper className={className}>
      {label && (
        <Label 
          htmlFor={fieldId}
          required={required} 
          optional={optional}
          error={hasError}
        >
          {label}
        </Label>
      )}
      
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child
        
        return React.cloneElement(child as React.ReactElement, {
          id: fieldId,
          name: name || fieldId,
          "aria-describedby": helpText ? helpTextId : undefined,
          "aria-invalid": hasError ? true : undefined,
          "aria-errormessage": hasError ? errorId : undefined,
          error: hasError,
          required,
          ...child.props
        })
      })}
      
      {(helpText || errorMessage) && (
        <HelpText 
          type="small" 
          id={errorMessage ? errorId : (helpText ? helpTextId : undefined)}
          $error={hasError}
        >
          {errorMessage || helpText}
        </HelpText>
      )}
    </FormFieldWrapper>
  )
}

FormField.displayName = "FormField"