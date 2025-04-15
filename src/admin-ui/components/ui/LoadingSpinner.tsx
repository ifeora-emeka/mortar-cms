"use client"

import React from "react"
import styled, { keyframes, css } from "styled-components"
import { theme } from "../../../styles/theme"
import { Color } from "../../../types/components.types"

export type SpinnerType = "spinner" | "dots" | "pulse" | "bars" | "ring"
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl"

interface LoadingSpinnerProps {
  type?: SpinnerType
  size?: SpinnerSize 
  color?: Color
  thickness?: number
  speed?: number
  className?: string
  label?: string
}

// Keyframes animations for different spinner types
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
`

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`

const blink = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`

// Get size in pixels based on the size prop
const getSizeInPx = (size: SpinnerSize): number => {
  switch (size) {
    case "xs": return 16
    case "sm": return 24
    case "md": return 32
    case "lg": return 48
    case "xl": return 64
    default: return 32
  }
}

// Container styled component
const SpinnerContainer = styled.div<{
  $size: SpinnerSize
  $hasLabel: boolean
}>`
  display: inline-flex;
  flex-direction: ${props => props.$hasLabel ? "column" : "row"};
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  line-height: 0;
`

const Label = styled.span<{
  $color: Color
}>`
  color: ${props => theme.colors[props.$color]};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.xs};
`

// Base spinner SVG styles
const SpinnerSvg = styled.svg<{
  $size: SpinnerSize
}>`
  width: ${props => `${getSizeInPx(props.$size)}px`};
  height: ${props => `${getSizeInPx(props.$size)}px`};
`

// Basic spinner component that rotates
const BasicSpinner = styled(SpinnerSvg)<{
  $animationSpeed: number
}>`
  animation: ${spin} ${props => props.$animationSpeed}s linear infinite;
`

// Circle spinner
const CircleSpinner = styled(BasicSpinner)`
  circle {
    fill: none;
    stroke-linecap: round;
  }
`

// Dots spinner container
const DotsContainer = styled.div<{
  $size: SpinnerSize
}>`
  display: flex;
  gap: ${theme.spacing.xs};
  align-items: center;
  justify-content: center;
`

// Individual dot for dots spinner
const Dot = styled.div<{
  $size: SpinnerSize
  $color: Color
  $index: number
  $animationSpeed: number
}>`
  width: ${props => `${getSizeInPx(props.$size) / 4}px`};
  height: ${props => `${getSizeInPx(props.$size) / 4}px`};
  background-color: ${props => theme.colors[props.$color]};
  border-radius: 50%;
  animation: ${bounce} ${props => props.$animationSpeed}s infinite ease-in-out;
  animation-delay: ${props => props.$index * 0.16}s;
`

// Pulse spinner
const PulseSpinner = styled.div<{
  $size: SpinnerSize
  $color: Color
  $animationSpeed: number
}>`
  width: ${props => `${getSizeInPx(props.$size)}px`};
  height: ${props => `${getSizeInPx(props.$size)}px`};
  background-color: ${props => theme.colors[props.$color]};
  border-radius: 50%;
  animation: ${pulse} ${props => props.$animationSpeed}s infinite ease-in-out;
`

// Bars container
const BarsContainer = styled.div<{
  $size: SpinnerSize
}>`
  display: flex;
  gap: ${theme.spacing.xs};
  align-items: center;
  height: ${props => `${getSizeInPx(props.$size)}px`};
`

// Individual bar for bars spinner
const Bar = styled.div<{
  $size: SpinnerSize
  $color: Color
  $index: number
  $animationSpeed: number
}>`
  width: ${props => `${getSizeInPx(props.$size) / 6}px`};
  height: ${props => `${props.$index % 2 === 0 ? getSizeInPx(props.$size) * 0.6 : getSizeInPx(props.$size) * 0.8}px`};
  background-color: ${props => theme.colors[props.$color]};
  border-radius: ${theme.borderRadius.sm};
  animation: ${blink} ${props => props.$animationSpeed}s infinite ease-in-out;
  animation-delay: ${props => props.$index * 0.15}s;
`

// Ring spinner specific styles
const RingSpinnerContainer = styled.div<{
  $size: SpinnerSize
}>`
  position: relative;
  width: ${props => `${getSizeInPx(props.$size)}px`};
  height: ${props => `${getSizeInPx(props.$size)}px`};
`

const RingCircle = styled.div<{
  $size: SpinnerSize
  $color: Color
  $thickness: number
  $animationSpeed: number
}>`
  position: absolute;
  width: ${props => `${getSizeInPx(props.$size) - props.$thickness}px`};
  height: ${props => `${getSizeInPx(props.$size) - props.$thickness}px`};
  border: ${props => `${props.$thickness}px solid transparent`};
  border-top-color: ${props => theme.colors[props.$color]};
  border-radius: 50%;
  animation: ${spin} ${props => props.$animationSpeed}s linear infinite;
  
  &:nth-child(2) {
    border-top-color: transparent;
    border-right-color: ${props => theme.colors[props.$color]};
    animation-duration: ${props => props.$animationSpeed * 0.85}s;
  }
  
  &:nth-child(3) {
    width: ${props => `${getSizeInPx(props.$size) - props.$thickness * 3}px`};
    height: ${props => `${getSizeInPx(props.$size) - props.$thickness * 3}px`};
    border-top-color: transparent;
    border-left-color: ${props => theme.colors[props.$color]};
    animation-duration: ${props => props.$animationSpeed * 0.75}s;
    animation-direction: reverse;
  }
`

/**
 * LoadingSpinner component that renders different types of spinners
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  type = "spinner",
  size = "md",
  color = "primary",
  thickness = 2,
  speed = 1.2,
  className,
  label
}) => {
  // Calculate animation speed - lower number = faster animation
  const animationSpeed = 1 / (speed || 1)

  // Helper to choose spinner based on type
  const renderSpinner = () => {
    switch (type) {
      case "spinner":
        return (
          <CircleSpinner
            viewBox="0 0 50 50"
            $size={size}
            $animationSpeed={animationSpeed}
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              strokeWidth={thickness}
              stroke={theme.colors[color]}
              opacity="0.25"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              strokeWidth={thickness}
              stroke={theme.colors[color]}
              strokeDasharray="90, 150"
              strokeDashoffset="0"
            />
          </CircleSpinner>
        )
      
      case "dots":
        return (
          <DotsContainer $size={size}>
            {[0, 1, 2].map(i => (
              <Dot
                key={i}
                $size={size}
                $color={color}
                $index={i}
                $animationSpeed={animationSpeed}
              />
            ))}
          </DotsContainer>
        )
      
      case "pulse":
        return (
          <PulseSpinner
            $size={size}
            $color={color}
            $animationSpeed={animationSpeed}
          />
        )
      
      case "bars":
        return (
          <BarsContainer $size={size}>
            {[0, 1, 2, 3, 4].map(i => (
              <Bar
                key={i}
                $size={size}
                $color={color}
                $index={i}
                $animationSpeed={animationSpeed}
              />
            ))}
          </BarsContainer>
        )
      
      case "ring":
        return (
          <RingSpinnerContainer $size={size}>
            <RingCircle
              $size={size}
              $color={color}
              $thickness={thickness}
              $animationSpeed={animationSpeed}
            />
            <RingCircle
              $size={size}
              $color={color}
              $thickness={thickness}
              $animationSpeed={animationSpeed}
            />
            <RingCircle
              $size={size}
              $color={color}
              $thickness={thickness}
              $animationSpeed={animationSpeed}
            />
          </RingSpinnerContainer>
        )
      
      default:
        return null
    }
  }

  return (
    <SpinnerContainer
      className={className}
      $size={size}
      $hasLabel={!!label}
      aria-label={label || "Loading"}
      role="status"
    >
      {renderSpinner()}
      {label && <Label $color={color}>{label}</Label>}
    </SpinnerContainer>
  )
}

LoadingSpinner.displayName = "LoadingSpinner"