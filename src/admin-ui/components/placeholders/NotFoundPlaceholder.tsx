"use client"

import React from "react"
import styled, { keyframes } from "styled-components"
import { FileQuestion, Home, ChevronLeft, Search } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Color } from "../../../types/components.types"
import { Text } from "../ui/Text"
import { Button } from "../ui/Button"

interface NotFoundPlaceholderProps {
  title?: string
  message?: string
  goBackLabel?: string
  goHomeLabel?: string
  searchLabel?: string
  color?: Color
  onGoBack?: () => void
  onGoHome?: () => void
  onSearch?: () => void
  className?: string
}

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`

const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.98);
  }
`

const StyledNotFoundPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${theme.spacing.xl};
  min-height: 100vh;
`

const IconContainer = styled.div<{
  $color: Color
}>`
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
  animation: ${float} 4s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${props => `${theme.colors[props.$color]}15`};
    animation: ${pulse} 3s ease-in-out infinite;
  }
`

const IconWrapper = styled.div<{
  $color: Color
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: ${props => `${theme.colors[props.$color]}30`};
  color: ${props => theme.colors[props.$color]};
  z-index: 1;
`

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const ErrorCode = styled.div`
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(
    135deg, 
    ${theme.colors.primary} 0%, 
    ${theme.colors.secondary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${theme.spacing.md};
  letter-spacing: -2px;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 80px;
  }
`

const Title = styled(Text)`
  margin-bottom: ${theme.spacing.sm};
`

const Message = styled(Text)`
  margin-bottom: ${theme.spacing.xl};
`

const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: ${theme.spacing.lg} auto 0;
  }
`

export const NotFoundPlaceholder: React.FC<NotFoundPlaceholderProps> = ({
  title = "Page Not Found",
  message = "The page you are looking for doesn't exist or has been moved.",
  goBackLabel = "Go Back",
  goHomeLabel = "Go Home",
  searchLabel = "Search",
  color = "primary",
  onGoBack,
  onGoHome,
  onSearch,
  className,
}) => {
  return (
    <StyledNotFoundPlaceholder className={className}>
      <IconContainer $color={color}>
        <IconWrapper $color={color}>
          <FileQuestion size={50} />
        </IconWrapper>
      </IconContainer>
      
      <Content>
        <ErrorCode>404</ErrorCode>
        
       <Title type="h2" weight="semibold" align="center">
          {title}
        </Title>
        
        <Message type="p" muted align="center">
          {message}
        </Message>
        
        <ActionsWrapper>
          {onGoBack && (
            <Button
              variant="outline"
              color={color}
              onClick={onGoBack}
            >
              <ChevronLeft size={16} />
              <span>{goBackLabel}</span>
            </Button>
          )}
          
          {onGoHome && (
            <Button
              variant="solid"
              color={color}
              onClick={onGoHome}
            >
              <Home size={16} />
              <span>{goHomeLabel}</span>
            </Button>
          )}
          
          {onSearch && (
            <Button
              variant="ghost"
              color={color}
              onClick={onSearch}
            >
              <Search size={16} />
              <span>{searchLabel}</span>
            </Button>
          )}
        </ActionsWrapper>
      </Content>
    </StyledNotFoundPlaceholder>
  );
};

NotFoundPlaceholder.displayName = "NotFoundPlaceholder"