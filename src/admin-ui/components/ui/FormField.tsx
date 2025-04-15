"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { Label } from "./Label"
import { Text } from "./Text"

interface FormFieldProps {
  label?: string
  children: React.ReactNode
  error?: string
  description?: string
  required?: boolean
  optional?: boolean
  className?: string
}

const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${theme.spacing.md};
`

const ErrorMessage = styled(Text)`
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.sm};
`

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  error,
  description,
  required = false,
  optional = false,
  className,
}) => {
  const hasError = !!error
  const id = React.useId()
  
  return (
    <FormFieldWrapper className={className}>
      {label && (
        <Label 
          htmlFor={id} 
          required={required} 
          optional={optional}
          error={hasError}
          description={description}
        >
          {label}
        </Label>
      )}
      
      {React.isValidElement(children) &&
        React.cloneElement(
          children as React.ReactElement<any>, 
          {
            id,
            error: hasError,
            ...(required ? { required: true } : {}),
          }
        )
      }
      
      {hasError && <ErrorMessage type="small">{error}</ErrorMessage>}
    </FormFieldWrapper>
  )
}

FormField.displayName = "FormField"