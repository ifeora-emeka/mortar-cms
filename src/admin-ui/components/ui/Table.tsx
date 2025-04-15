"use client"

import React from "react"
import styled, { css } from "styled-components"
import { theme } from "../../../styles/theme"
import { Color, Size } from "../../../types/components.types"

type Align = "left" | "center" | "right"
type Variant = "default" | "striped" | "outline"

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    variant?: Variant
    size?: Size
    fullWidth?: boolean
    color?: Color
    borderRadius?: keyof typeof theme.borderRadius
    shadow?: keyof typeof theme.shadows
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    selected?: boolean
    interactive?: boolean
}

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    align?: Align
    sortable?: boolean
    sorted?: "asc" | "desc" | false
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    align?: Align
    truncate?: boolean
}

interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
    side?: "top" | "bottom"
}

interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const StyledTable = styled.table<{
    $variant: Variant
    $size: Size
    $fullWidth: boolean
    $color: Color
    $borderRadius: keyof typeof theme.borderRadius
    $shadow: keyof typeof theme.shadows
}>`
    border-collapse: separate;
    border-spacing: 0;
    width: ${props => props.$fullWidth ? "100%" : "auto"};
    border-radius: ${props => theme.borderRadius[props.$borderRadius]};
    overflow: hidden;
    position: relative;
    box-shadow: ${props => theme.shadows[props.$shadow]};

    ${props => {
        switch (props.$variant) {
            case "striped":
                return css`
                    border: 1px solid ${theme.colors.border};
                `
            case "outline":
                return css`
                    border: 1px solid ${theme.colors.border};
                `
            default:
                return css`
                    border: none;
                `
        }
    }}

    ${props => {
        switch (props.$size) {
            case "small":
                return css`
                    font-size: ${theme.fontSizes.sm};
                `
            case "large":
                return css`
                    font-size: ${theme.fontSizes.lg};
                `
            default:
                return css`
                    font-size: ${theme.fontSizes.md};
                `
        }
    }}

    @media (max-width: ${theme.breakpoints.md}) {
        display: block;
    }
`

const StyledTableHeader = styled.thead`
    background-color: ${theme.colors.muted};
    border-bottom: 1px solid ${theme.colors.border};

    @media (max-width: ${theme.breakpoints.md}) {
        display: none;
    }
`

const StyledTableBody = styled.tbody`
    @media (max-width: ${theme.breakpoints.md}) {
        display: block;
    }
`

const StyledTableFooter = styled.tfoot`
    border-top: 1px solid ${theme.colors.border};
    background-color: ${theme.colors.muted};

    @media (max-width: ${theme.breakpoints.md}) {
        display: block;
    }
`

const StyledTableRow = styled.tr<{
    $selected?: boolean
    $interactive?: boolean
    $variant: Variant
}>`
    border-bottom: 1px solid ${theme.colors.border};
    transition: background-color 0.2s ease;

    ${props => props.$selected && css`
        background-color: ${theme.colors.accent};
    `}
    
    ${props => props.$interactive && css`
        cursor: pointer;
        &:hover {
            background-color: ${theme.colors.accent};
        }
    `}
    
    ${props => props.$variant === "striped" && css`
        &:nth-child(even) {
            background-color: ${theme.colors.card};
        }
        &:nth-child(odd) {
            background-color: ${theme.colors.background};
        }
    `}

    @media (max-width: ${theme.breakpoints.md}) {
        display: block;
        margin-bottom: ${theme.spacing.md};
        border: 1px solid ${theme.colors.border};
        border-radius: ${theme.borderRadius.sm};
    }
`

const StyledTableHead = styled.th<{
    $align: Align
    $sortable?: boolean
    $sorted?: "asc" | "desc" | false
}>`
    text-align: ${props => props.$align};
    padding: ${theme.spacing.md};
    font-weight: 600;
    color: ${theme.colors.foreground};
    white-space: nowrap;
    position: relative;
    
    ${props => props.$sortable && css`
        cursor: pointer;
        user-select: none;
        
        &:hover {
            background-color: ${theme.colors.accent};
        }
        
        &::after {
            content: "${props.$sorted === "asc" ? "▲" : props.$sorted === "desc" ? "▼" : ""}";
            position: absolute;
            right: ${theme.spacing.md};
            opacity: ${props.$sorted ? "1" : "0.3"};
        }
    `}
`

const StyledTableCell = styled.td<{
    $align: Align
    $truncate: boolean
}>`
    text-align: ${props => props.$align};
    padding: ${theme.spacing.md};
    color: ${theme.colors.foreground};
    
    ${props => props.$truncate && css`
        max-width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `}

    @media (max-width: ${theme.breakpoints.md}) {
        display: block;
        text-align: right;
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        
        &::before {
            content: attr(data-label);
            float: left;
            font-weight: 600;
            color: ${theme.colors["muted-foreground"]};
        }
    }
`

const StyledTableCaption = styled.caption<{
    $side: "top" | "bottom"
}>`
    caption-side: ${props => props.$side};
    padding: ${theme.spacing.md};
    text-align: left;
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors["muted-foreground"]};
    border-bottom: ${props => props.$side === "top" ? `1px solid ${theme.colors.border}` : "none"};
    border-top: ${props => props.$side === "bottom" ? `1px solid ${theme.colors.border}` : "none"};
`

const StyledTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${theme.colors.background};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.muted};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors["muted-foreground"]};
  }
`

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({
        children,
        variant = "default",
        size = "medium",
        fullWidth = true,
        color = "accent",
        borderRadius = "md",
        shadow = "sm",
        className,
        ...props
    }, ref) => (
        <StyledTable
            ref={ref}
            $variant={variant}
            $size={size}
            $fullWidth={fullWidth}
            $color={color}
            $borderRadius={borderRadius}
            $shadow={shadow}
            className={className}
            {...props}
        >
            {children}
        </StyledTable>
    )
)

export const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>(
    ({ children, className, ...props }, ref) => (
        <StyledTableContainer ref={ref} className={className} {...props}>
            {children}
        </StyledTableContainer>
    )
)

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    ({ children, className, ...props }, ref) => (
        <StyledTableHeader ref={ref} className={className} {...props}>
            {children}
        </StyledTableHeader>
    )
)

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ children, className, ...props }, ref) => (
        <StyledTableBody ref={ref} className={className} {...props}>
            {children}
        </StyledTableBody>
    )
)

export const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
    ({ children, className, ...props }, ref) => (
        <StyledTableFooter ref={ref} className={className} {...props}>
            {children}
        </StyledTableFooter>
    )
)

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
    ({ children, selected, interactive, className, ...props }, ref) => (
        <StyledTableRow
            ref={ref}
            $selected={selected}
            $interactive={interactive}
            $variant="default"
            className={className}
            {...props}
        >
            {children}
        </StyledTableRow>
    )
)

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
    ({ children, align = "left", sortable, sorted, className, ...props }, ref) => (
        <StyledTableHead
            ref={ref}
            $align={align}
            $sortable={sortable}
            $sorted={sorted}
            className={className}
            {...props}
        >
            {children}
        </StyledTableHead>
    )
)

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
    ({ children, align = "left", truncate = false, className, ...props }, ref) => (
        <StyledTableCell
            ref={ref}
            $align={align}
            $truncate={truncate}
            className={className}
            {...props}
        >
            {children}
        </StyledTableCell>
    )
)

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
    ({ children, side = "bottom", className, ...props }, ref) => (
        <StyledTableCaption
            ref={ref}
            $side={side}
            className={className}
            {...props}
        >
            {children}
        </StyledTableCaption>
    )
)

Table.displayName = "Table"
TableContainer.displayName = "TableContainer"
TableHeader.displayName = "TableHeader"
TableBody.displayName = "TableBody"
TableFooter.displayName = "TableFooter" 
TableRow.displayName = "TableRow"
TableHead.displayName = "TableHead"
TableCell.displayName = "TableCell"
TableCaption.displayName = "TableCaption"