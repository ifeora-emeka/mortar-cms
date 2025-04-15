"use client"

import React from "react"
import styled from "styled-components"
import { LucideIcon } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Color } from "../../../types/components.types"
import { Text } from "../ui/Text"

interface MessagePlaceholderProps {
  heading: string
  subheading?: string
  icon?: LucideIcon
  iconSize?: number
  color?: Color
  variant?: "default" | "outlined" | "filled"
  align?: "center" | "left" | "right"
  actions?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

const StyledMessagePlaceholder = styled.div<{
  $color: Color
  $variant: "default" | "outlined" | "filled"
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
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  
  ${props => {
    const baseColor = theme.colors[props.$color];
    
    switch (props.$variant) {
      case "outlined":
        return `
          background-color: transparent;
          border: 1px dashed ${theme.colors.border};
        `;
      case "filled":
        return `
          background-color: ${baseColor}15; /* 10% opacity */
          border: 1px solid ${baseColor}30; /* 20% opacity */
        `;
      default:
        return `
          background-color: ${theme.colors.muted};
          border: 1px dashed ${theme.colors.border};
        `;
    }
  }}
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`

const IconWrapper = styled.div<{
  $color: Color
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};
  color: ${props => theme.colors[props.$color]};
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

export const MessagePlaceholder: React.FC<MessagePlaceholderProps> = ({
  heading,
  subheading,
  icon,
  iconSize = 48,
  color = "primary",
  variant = "default",
  align = "center",
  actions,
  className,
  children,
}) => {
  const Icon = icon;

  return (
    <StyledMessagePlaceholder
      className={className}
      $color={color}
      $variant={variant}
      $align={align}
    >
      {Icon && (
        <IconWrapper $color={color}>
          <Icon size={iconSize} />
        </IconWrapper>
      )}
      
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
      
      {actions && (
        <ActionsWrapper $align={align}>
          {actions}
        </ActionsWrapper>
      )}
    </StyledMessagePlaceholder>
  );
};

MessagePlaceholder.displayName = "MessagePlaceholder"