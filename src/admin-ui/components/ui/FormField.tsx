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
  description?: string
  children: React.ReactNode
}

const FormFieldWrapper = styled.div`
  margin-bottom: ${theme.spacing.md};
  width: 100%;
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
  description,
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
      
      {description && (
        <HelpText 
          type="small"
          as="div"
        >
          {description}
        </HelpText>
      )}
      
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child
        
        // Type assertion to access props safely
        const childElement = child as React.ReactElement;
        const props = childElement.props as Record<string, any>;
        
        // Only apply ARIA attributes if the child component supports them
        const childProps: Record<string, any> = {}; 
        
        // Common props that most form controls accept
        if (typeof childElement.type === 'string' || 'id' in props) {
          childProps.id = fieldId;
        }
        
        if (typeof childElement.type === 'string' || 'name' in props) {
          childProps.name = name || fieldId;
        }
        
        if ('error' in props) {
          childProps.error = hasError;
        }
        
        if (typeof childElement.type === 'string' || 'required' in props) {
          childProps.required = required;
        }
        
        // ARIA attributes for accessibility
        if (typeof childElement.type === 'string' || 'aria-describedby' in props) {
          if (helpText) {
            childProps['aria-describedby'] = helpTextId;
          }
        }
        
        if (typeof childElement.type === 'string' || 'aria-invalid' in props) {
          if (hasError) {
            childProps['aria-invalid'] = true;
          }
        }
        
        if (typeof childElement.type === 'string' || 'aria-errormessage' in props) {
          if (hasError) {
            childProps['aria-errormessage'] = errorId;
          }
        }
        
        return React.cloneElement(childElement, {
          ...props,
          ...childProps
        });
      })}
      
      {(helpText || errorMessage) && (
        <HelpText 
          type="small"
          $error={hasError}
          as="div" // Use div instead which can have an id attribute
          className={errorMessage ? errorId : (helpText ? helpTextId : undefined)}
        >
          {errorMessage || helpText}
        </HelpText>
      )}
    </FormFieldWrapper>
  )
}

FormField.displayName = "FormField"