import React from "react";

export interface ComponentDefaultProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
    variant?: Variant;
    color?: Color;
    size?: Size;
    borderRadius?: BorderRadius;
    shadow?: Shadow;
}

export type BorderRadius = 'sm' | 'md' | 'lg' | 'pill' | 'none';
export type Shadow = 'sm' | 'md' | 'lg' | 'none';
export type Variant = 'solid' | 'outline' | 'ghost' | 'link' | 'text';
export type Size = 'small' | 'medium' | 'large';
export type Color = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
