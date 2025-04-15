// src/components/Button.tsx
'use client'
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import {BorderRadius, Color, ComponentDefaultProps, Shadow, Size, Variant} from "../../../types/components.types";

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
}

// Styled component with namespace to avoid conflicts
const StyledButton = styled.button<{
    $variant: Variant;
    $color: Color;
    $size: Size;
    $fullWidth: boolean;
    $borderRadius: BorderRadius;
    $shadow: Shadow;
}>`
    all: unset;
    box-sizing: border-box;
    font-family: inherit;
    cursor: pointer;
    display: inline-flex;
    gap: ${theme.spacing.xs};
    align-items: center;
    justify-content: center;
    text-align: center;
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
          &:hover { background-color: ${baseColor}cc; } /* 80% opacity */
          &:active { transform: translateY(1px); }
        `;
            case 'outline':
                return `
          background-color: transparent;
          border: 1px solid ${baseColor};
          color: ${baseColor};
          &:hover { background-color: ${baseColor}1a; } /* 10% opacity */
          &:active { transform: translateY(1px); }
        `;
            case 'ghost':
                return `
          background-color: transparent;
          &:hover { background-color: ${theme.colors.accent}; } /* 10% opacity */
          &:active { transform: translateY(1px); }
        `;
            case 'link':
                return `
          background-color: transparent;
          color: ${baseColor};
          padding: 0;
          text-decoration: underline;
          &:hover { text-decoration: none; }
          &:active { transform: translateY(1px); }
        `;
            case 'text':
                return `
          background-color: transparent;
          color: ${baseColor};
          &:hover { background-color: ${baseColor}1a; } /* 10% opacity */
          &:active { transform: translateY(1px); }
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
}) => {
    return (
        <StyledButton
            $variant={variant}
            $color={color}
            $size={size}
            $fullWidth={fullWidth}
            $borderRadius={borderRadius}
            $shadow={shadow}
            onClick={onClick}
            className={className}
            disabled={disabled}
        >
            {children}
        </StyledButton>
    );
};

