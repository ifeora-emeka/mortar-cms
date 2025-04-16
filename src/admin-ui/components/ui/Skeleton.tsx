"use client"

import React from "react"
import styled, { keyframes } from "styled-components"
import { theme } from "../../../styles/theme"
import { BorderRadius, ComponentDefaultProps } from "../../../types/components.types"

// Define specific variant types for Skeleton component
type SkeletonVariant = "rectangle" | "circle" | "text"
type SkeletonAnimation = "pulse" | "wave" | "none"

// Extend ComponentDefaultProps but exclude both variant and borderRadius properties
interface SkeletonProps extends Omit<ComponentDefaultProps, 'variant' | 'borderRadius'> {
  height?: string
  width?: string | number
  borderRadius?: BorderRadius | string // Accept both BorderRadius enum and custom string values
  variant?: SkeletonVariant
  animation?: SkeletonAnimation
}

const pulse = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`

const wave = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`

const StyledSkeleton = styled.div<{
  $height?: string
  $width?: string | number
  $borderRadius?: string
  $variant: SkeletonVariant
  $animation: SkeletonAnimation
}>`
  display: inline-block;
  background-color: ${theme.colors.muted};
  height: ${props => 
    props.$variant === "text" 
      ? props.$height || "1em" 
      : props.$height || "100%"
  };
  width: ${props => {
    if (typeof props.$width === "number") {
      return `${props.$width}px`;
    }
    return props.$width || (props.$variant === "text" ? "100%" : "auto");
  }};
  border-radius: ${props => {
    if (props.$borderRadius) return props.$borderRadius;
    if (props.$variant === "circle") return "50%";
    if (props.$variant === "text") return theme.borderRadius.sm;
    return theme.borderRadius.md;
  }};

  ${props => {
    switch (props.$animation) {
      case "pulse":
        return `animation: ${pulse} 1.5s ease-in-out infinite;`;
      case "wave":
        return `
          background: linear-gradient(
            90deg,
            ${theme.colors.muted} 25%,
            ${theme.colors.accent} 50%,
            ${theme.colors.muted} 75%
          );
          background-size: 200px 100%;
          animation: ${wave} 1.5s linear infinite;
        `;
      case "none":
      default:
        return "";
    }
  }}
  
  /* For text variant, we can add a subtle gradient to make it look more like text */
  ${props =>
    props.$variant === "text" &&
    `
      margin-top: 0;
      margin-bottom: 0;
      display: inline-block;
      vertical-align: middle;
    `}
    
  /* Helper for screen readers to announce this is a loading element */
  &::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`

export const Skeleton: React.FC<SkeletonProps> = ({
  height,
  width,
  borderRadius,
  variant = "rectangle",
  animation = "pulse",
  className,
}) => {
  return (
    <StyledSkeleton
      $height={height}
      $width={width}
      $borderRadius={typeof borderRadius === 'string' ? borderRadius : undefined}
      $variant={variant}
      $animation={animation}
      className={className}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading content"
    />
  );
};

// Additional Skeleton convenience components
export const SkeletonText: React.FC<Omit<SkeletonProps, "variant">> = (props) => {
  return <Skeleton variant="text" {...props} />;
};

export const SkeletonCircle: React.FC<Omit<SkeletonProps, "variant">> = (props) => {
  return <Skeleton variant="circle" {...props} />;
};

export const SkeletonRect: React.FC<Omit<SkeletonProps, "variant">> = (props) => {
  return <Skeleton variant="rectangle" {...props} />;
};

Skeleton.displayName = "Skeleton";