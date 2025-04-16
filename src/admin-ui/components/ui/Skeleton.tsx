"use client"

import React from "react"
import styled, { keyframes, css } from "styled-components"
import { theme } from "../../../styles/theme"
import { BorderRadius } from "../../../types/components.types"

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded"

interface SkeletonProps {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  borderRadius?: BorderRadius | string
  animation?: "pulse" | "wave" | "none"
  className?: string
  count?: number
  gap?: string
  inline?: boolean
}

const pulse = css`
  ${keyframes`
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  `}
`

const wave = css`
  ${keyframes`
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  `}
`

const SkeletonContainer = styled.div<{
  $inline: boolean
  $gap: string
}>`
  display: ${props => props.$inline ? "inline-flex" : "flex"};
  flex-direction: column;
  gap: ${props => props.$gap};
`

const SkeletonItem = styled.span<{
  $variant: SkeletonVariant
  $width: string
  $height: string
  $borderRadius: string
  $animation: "pulse" | "wave" | "none"
}>`
  display: block;
  width: ${props => props.$width};
  height: ${props => props.$height};
  background-color: ${theme.colors.muted};
  position: relative;
  overflow: hidden;
  
  ${props => {
    switch (props.$variant) {
      case "text":
        return `
          border-radius: ${theme.borderRadius.sm};
          margin-bottom: 0.2em;
        `
      case "circular":
        return `
          border-radius: 50%;
        `
      case "rounded":
        return `
          border-radius: ${theme.borderRadius.md};
        `
      case "rectangular":
      default:
        return `
          border-radius: ${
            typeof props.$borderRadius === 'string' ? 
              props.$borderRadius :
              theme.borderRadius[props.$borderRadius as keyof typeof theme.borderRadius] || "0"
          };
        `
    }
  }}
  
  ${props => {
    switch (props.$animation) {
      case "pulse":
        return css`
          animation: ${pulse} 1.5s ease-in-out 0.5s infinite;
        `
      case "wave":
        return css`
          &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: ${wave} 1.6s linear 0.5s infinite;
          }
        `
      default:
        return ""
    }
  }}
`

const getWidth = (variant: SkeletonVariant, width?: string | number): string => {
  if (width !== undefined) {
    return typeof width === "number" ? `${width}px` : width
  }
  
  switch (variant) {
    case "text":
      return "100%"
    case "circular":
      return "40px"
    default:
      return "100%"
  }
}

const getHeight = (variant: SkeletonVariant, height?: string | number): string => {
  if (height !== undefined) {
    return typeof height === "number" ? `${height}px` : height
  }
  
  switch (variant) {
    case "text":
      return "1em"
    case "circular":
      return "40px"
    default:
      return "100px"
  }
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  borderRadius = "none",
  animation = "pulse",
  className,
  count = 1,
  gap = "8px",
  inline = false,
}) => {
  const computedWidth = getWidth(variant, width)
  const computedHeight = getHeight(variant, height)
  const computedBorderRadius = 
    typeof borderRadius === 'string' && !Object.keys(theme.borderRadius).includes(borderRadius)
      ? borderRadius
      : borderRadius

  return (
    <SkeletonContainer
      className={className}
      $inline={inline}
      $gap={gap}
      aria-busy="true"
      aria-live="polite"
    >
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <SkeletonItem
            key={i}
            $variant={variant}
            $width={computedWidth}
            $height={computedHeight}
            $borderRadius={computedBorderRadius}
            $animation={animation}
          />
        ))}
    </SkeletonContainer>
  )
}

Skeleton.displayName = "Skeleton"