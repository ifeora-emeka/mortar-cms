// src/components/Button.tsx
'use client'
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { BorderRadius, Color, ComponentDefaultProps, Shadow, Size, Variant } from "../../../types/components.types";
import { LoadingSpinner, SpinnerType } from './LoadingSpinner';
import * as Slot from '@radix-ui/react-slot';

interface ButtonProps extends ComponentDefaultProps {
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: Variant;
    color?: Color;
    size?: Size;
    fullWidth?: boolean;
    disabled?: boolean;
    borderRadius?: BorderRadius;
    shadow?: Shadow;
    loading?: boolean;
    loadingText?: string;
    spinnerType?: SpinnerType;
    type?: "button" | "submit" | "reset";
    asChild?: boolean;
}

// Styled component with namespace to avoid conflicts
const StyledButton = styled.button<{
    $variant: Variant;
    $color: Color;
    $size: Size;
    $fullWidth: boolean;
    $borderRadius: BorderRadius;
    $shadow: Shadow;
    $isLoading: boolean;
}>`
    all: unset;
    box-sizing: border-box;
    font-family: inherit;
    cursor: ${props => props.$isLoading ? 'default' : 'pointer'};
    display: inline-flex;
    gap: ${theme.spacing.xs};
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 500;
    position: relative;
    transition: all 0.2s ease;

    /* Size variations */
    padding: ${props =>
            props.$size === 'small' ? `${theme.spacing.xs} ${theme.spacing.sm}` :
                    props.$size === 'medium' ? `${theme.spacing.sm} ${theme.spacing.md}` :
                            `${theme.spacing.md} ${theme.spacing.lg}`
    };

    font-size: ${props =>
            props.$size === 'small' ? '0.875rem' :
                    props.$size === 'medium' ? '1rem' :
                            '1.125rem'
    };

    /* Width */
    width: ${props => props.$fullWidth ? '100%' : 'auto'};

    /* Border radius */
    border-radius: ${props => {
        if (props.$borderRadius === 'none') return '0';
        return theme.borderRadius[props.$borderRadius];
    }};

    /* Shadow */
    box-shadow: ${props => props.$shadow !== 'none' ? theme.shadows[props.$shadow] : 'none'};

    /* Variants and colors */

    ${props => {
        const baseColor = theme.colors[props.$color];
        //@ts-ignore
        const foregroundColor = theme.colors[`${props.$color}-foreground`] || '#ffffff';

        switch (props.$variant) {
            case 'solid':
                return `
          background-color: ${baseColor};
          color: ${foregroundColor};
          &:hover { background-color: ${props.$isLoading ? baseColor : `${baseColor}cc`}; } /* 80% opacity */
          &:active { transform: ${props.$isLoading ? 'none' : 'translateY(1px)'}; }
        `;
            case 'outline':
                return `
          background-color: transparent;
          border: 1px solid ${baseColor};
          color: ${baseColor};
          &:hover { background-color: ${props.$isLoading ? 'transparent' : `${baseColor}1a`}; } /* 10% opacity */
          &:active { transform: ${props.$isLoading ? 'none' : 'translateY(1px)'}; }
        `;
            case 'ghost':
                return `
          background-color: transparent;
          &:hover { background-color: ${props.$isLoading ? 'transparent' : theme.colors.accent}; } /* 10% opacity */
          &:active { transform: ${props.$isLoading ? 'none' : 'translateY(1px)'}; }
        `;
            case 'link':
                return `
          background-color: transparent;
          color: ${baseColor};
          padding: 0;
          text-decoration: underline;
          &:hover { text-decoration: ${props.$isLoading ? 'underline' : 'none'}; }
          &:active { transform: ${props.$isLoading ? 'none' : 'translateY(1px)'}; }
        `;
            case 'text':
                return `
          background-color: transparent;
          color: ${baseColor};
          &:hover { background-color: ${props.$isLoading ? 'transparent' : `${baseColor}1a`}; } /* 10% opacity */
          &:active { transform: ${props.$isLoading ? 'none' : 'translateY(1px)'}; }
        `;
            default:
                return '';
        }
    }}
        /* Disabled state */
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
    }
`;

const LoadingContainer = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    className,
    variant = 'solid',
    color = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    borderRadius = 'sm',
    shadow = 'none',
    loading = false,
    loadingText,
    spinnerType = "spinner",
    type = "button",
    asChild = false,
}) => {
    // Map button size to spinner size
    const getSpinnerSize = (): "xs" | "sm" | "md" => {
        switch (size) {
            case "small": return "xs";
            case "large": return "md";
            default: return "sm";
        }
    };
    
    const Comp = asChild ? Slot.Root : StyledButton;
    
    return (
        <Comp
            $variant={variant}
            $color={color}
            $size={size}
            $fullWidth={fullWidth}
            $borderRadius={borderRadius}
            $shadow={shadow}
            $isLoading={loading}
            onClick={loading ? undefined : onClick}
            className={className}
            disabled={disabled || loading}
            type={type}
            aria-busy={loading}
        >
            {loading ? (
                <LoadingContainer>
                    <LoadingSpinner 
                        type={spinnerType} 
                        size={getSpinnerSize()} 
                        color={color}
                    />
                    {loadingText}
                </LoadingContainer>
            ) : (
                children
            )}
        </Comp>
    );
};

