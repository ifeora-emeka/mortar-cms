"use client"

import React from "react"
import styled from "styled-components"
import { AlertTriangle, XCircle, AlertOctagon, RefreshCw, LucideIcon } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Color } from "../../../types/components.types"
import { Text } from "../ui/Text"
import { Button } from "../ui/Button"

export type ErrorVariant = "default" | "outlined" | "filled" | "minimal"
export type ErrorType = "error" | "warning" | "info"

interface ErrorPlaceholderProps {
  heading: string
  subheading?: string
  type?: ErrorType
  variant?: ErrorVariant
  icon?: LucideIcon
  iconSize?: number
  color?: Color
  align?: "center" | "left" | "right"
  retryText?: string
  onRetry?: () => void
  className?: string
  children?: React.ReactNode
  actions?: React.ReactNode
}

const StyledErrorPlaceholder = styled.div<{
  $type: ErrorType
  $variant: ErrorVariant
  $color: Color
  $align: "center" | "left" | "right"
}>`
  display: flex;
  flex-direction: column;
  align-items: ${props => 
    props.$align === "center" ? "center" : 
    props.$align === "right" ? "flex-end" : "flex-start"
  };
  justify-content: center;
  text-align: ${props => props.$align};
  padding: ${props => props.$variant === "minimal" ? theme.spacing.lg : `${theme.spacing.xl} ${theme.spacing.lg}`};
  border-radius: ${theme.borderRadius.md};
  
  ${props => {
    const baseColor = props.$color ? theme.colors[props.$color] : 
                      props.$type === "error" ? theme.colors.error :
                      props.$type === "warning" ? theme.colors.warning :
                      theme.colors.primary;
    
    switch (props.$variant) {
      case "outlined":
        return `
          background-color: transparent;
          border: 1px dashed ${baseColor};
        `;
      case "filled":
        return `
          background-color: ${baseColor}15; /* 10% opacity */
          border: 1px solid ${baseColor}30; /* 20% opacity */
        `;
      case "minimal":
        return `
          background-color: transparent;
          border: none;
          padding: ${theme.spacing.md} 0;
        `;
      default:
        return `
          background-color: ${theme.colors.muted};
          border: 1px dashed ${theme.colors.border};
        `;
    }
  }}
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${props => props.$variant === "minimal" ? theme.spacing.md : `${theme.spacing.lg} ${theme.spacing.md}`};
  }
`

const IconWrapper = styled.div<{
  $type: ErrorType
  $color: Color
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};
  color: ${props => {
    if (props.$color) return theme.colors[props.$color];
    return props.$type === "error" ? theme.colors.error :
           props.$type === "warning" ? theme.colors.warning :
           theme.colors.primary;
  }};
`

const Content = styled.div`
  max-width: 600px;
`

const Heading = styled(Text)`
  margin-bottom: ${theme.spacing.sm};
`

const Subheading = styled(Text)`
  margin-bottom: ${theme.spacing.md};
`

const ActionsWrapper = styled.div<{
  $align: "center" | "left" | "right"
}>`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.lg};
  justify-content: ${props => 
    props.$align === "center" ? "center" : 
    props.$align === "right" ? "flex-end" : "flex-start"
  };
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
  }
`

const getDefaultIcon = (type: ErrorType): LucideIcon => {
  switch (type) {
    case "error": return XCircle;
    case "warning": return AlertTriangle;
    case "info": 
    default: return AlertOctagon;
  }
}

export const ErrorPlaceholder: React.FC<ErrorPlaceholderProps> = ({
  heading,
  subheading,
  type = "error",
  variant = "filled",
  icon,
  iconSize = 48,
  color,
  align = "center",
  retryText = "Try Again",
  onRetry,
  className,
  children,
  actions,
}) => {
  // If no explicit icon is provided, use the default one based on type
  const IconComponent = icon || getDefaultIcon(type);
  
  // Determine color based on type if not explicitly provided
  // Use 'primary' as fallback for 'info' type since 'info' is not in the Color type
  const effectiveColor = color || 
    (type === "error" ? "error" : 
     type === "warning" ? "warning" : "primary");

  return (
    <StyledErrorPlaceholder
      className={className}
      $type={type}
      $variant={variant}
      $color={effectiveColor}
      $align={align}
    >
      <IconWrapper $type={type} $color={effectiveColor}>
        <IconComponent size={iconSize} />
      </IconWrapper>
      
      <Content>
        <Heading type="h3" weight="semibold">
          {heading}
        </Heading>
        
        {subheading && (
          <Subheading type="p" muted>
            {subheading}
          </Subheading>
        )}
        
        {children}
      </Content>
      
      {(actions || onRetry) && (
        <ActionsWrapper $align={align}>
          {actions}
          
          {onRetry && !actions && (
            <Button
              variant="solid"
              color={effectiveColor}
              onClick={onRetry}
            >
              <RefreshCw size={16} />
              <span>{retryText}</span>
            </Button>
          )}
        </ActionsWrapper>
      )}
    </StyledErrorPlaceholder>
  );
};

ErrorPlaceholder.displayName = "ErrorPlaceholder"