// @ts-nocheck
"use client"
import React from "react"
import styled, { css, useTheme } from "styled-components"
import { Color } from "../../../types/components.types";
import { theme as defaultTheme } from "../../../styles/theme";

// Define the available text types
export type TextType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span" | "label"

// Define weight options
export type TextWeight = "normal" | "medium" | "semibold" | "bold"

// Define alignment options
export type TextAlign = "left" | "center" | "right" | "justify"

// Define transform options
export type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase"

interface TextProps {
    type?: TextType
    color?: Color | "foreground" | "muted-foreground" | "text"
    weight?: TextWeight
    align?: TextAlign
    transform?: TextTransform
    className?: string
    children: React.ReactNode
    truncate?: boolean
    muted?: boolean
    as?: React.ElementType
}

// Create a styled component with dynamic tag
const StyledText = styled.span<{
    $type: TextType
    $color: string
    $weight: TextWeight
    $align: TextAlign
    $transform: TextTransform
    $truncate: boolean
    $muted: boolean
}>`
  margin: 0;
    //@ts-ignore
  color: ${(props) => (props.$muted ? defaultTheme.colors["muted-foreground"] : defaultTheme.colors[props.$color])};
  text-align: ${(props) => props.$align};
  text-transform: ${(props) => props.$transform};
  
  ${(props) => {
    // Font weight mapping
    const weightMap = {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
    }

    // Type-specific styles
    switch (props.$type) {
        case "h1":
            return css`
          font-size: ${defaultTheme.fontSizes["4xl"]};
          font-weight: ${weightMap[props.$weight] || weightMap.bold};
          line-height: 1.2;
          letter-spacing: -0.025em;
          
          @media (max-width: ${defaultTheme.breakpoints.md}) {
            font-size: ${defaultTheme.fontSizes["3xl"]};
          }
        `
        case "h2":
            return css`
          font-size: ${defaultTheme.fontSizes["3xl"]};
          font-weight: ${weightMap[props.$weight] || weightMap.semibold};
          line-height: 1.3;
          letter-spacing: -0.02em;
          
          @media (max-width: ${defaultTheme.breakpoints.md}) {
            font-size: ${defaultTheme.fontSizes["2xl"]};
          }
        `
        case "h3":
            return css`
          font-size: ${defaultTheme.fontSizes["2xl"]};
          font-weight: ${weightMap[props.$weight] || weightMap.semibold};
          line-height: 1.4;
          
          @media (max-width: ${defaultTheme.breakpoints.md}) {
            font-size: ${defaultTheme.fontSizes.xl};
          }
        `
        case "h4":
            return css`
          font-size: ${defaultTheme.fontSizes.xl};
          font-weight: ${weightMap[props.$weight] || weightMap.semibold};
          line-height: 1.5;
          
          @media (max-width: ${defaultTheme.breakpoints.md}) {
            font-size: ${defaultTheme.fontSizes.lg};
          }
        `
        case "h5":
            return css`
          font-size: ${defaultTheme.fontSizes.lg};
          font-weight: ${weightMap[props.$weight] || weightMap.medium};
          line-height: 1.5;
        `
        case "h6":
            return css`
          font-size: ${defaultTheme.fontSizes.md};
          font-weight: ${weightMap[props.$weight] || weightMap.medium};
          line-height: 1.5;
        `
        case "p":
            return css`
          font-size: ${defaultTheme.fontSizes.md};
          font-weight: ${weightMap[props.$weight] || weightMap.normal};
          line-height: 1.6;
        `
        case "small":
            return css`
          font-size: ${defaultTheme.fontSizes.sm};
          font-weight: ${weightMap[props.$weight] || weightMap.normal};
          line-height: 1.5;
        `
        case "label":
            return css`
          font-size: ${defaultTheme.fontSizes.sm};
          font-weight: ${weightMap[props.$weight] || weightMap.medium};
          line-height: 1.5;
        `
        case "span":
        default:
            return css`
          font-size: inherit;
          font-weight: ${weightMap[props.$weight] || weightMap.normal};
          line-height: inherit;
        `
    }
}}
  
  /* Truncate text with ellipsis if needed */
  ${(props) =>
    props.$truncate &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      display: block;
    `}
`

export const Text: React.FC<TextProps> = ({
                                              type = "p",
                                              color = "foreground",
                                              weight = "normal",
                                              align = "left",
                                              transform = "none",
                                              className,
                                              children,
                                              truncate = false,
                                              muted = false,
                                              as,
                                          }) => {
    // Get the current theme (for dark mode support)
    const currentTheme = useTheme();
    
    // Determine the HTML element to use based on type or as prop
    const element = as || type;
    
    // Use the color from the current theme (for dark mode support)
    const actualColor = muted ? "muted-foreground" : color;

    return (
        <StyledText
            as={element}
            $type={type}
            $color={actualColor}
            $weight={weight}
            $align={align}
            $transform={transform}
            $truncate={truncate}
            $muted={muted}
            className={className}
            theme={currentTheme} // Pass the current theme for styled-components
        >
            {children}
        </StyledText>
    )
}
