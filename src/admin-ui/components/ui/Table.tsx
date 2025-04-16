"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { ComponentDefaultProps } from "../../../types/components.types"

interface TableRootProps extends ComponentDefaultProps {
  children?: React.ReactNode
  variant?: "default" | "striped" | "bordered" | "card"
  compact?: boolean
  hover?: boolean
  stickyHeader?: boolean
  fullWidth?: boolean
}

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode
  selected?: boolean
  disabled?: boolean
}

interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children?: React.ReactNode
  align?: "left" | "center" | "right"
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode
  align?: "left" | "center" | "right"
}

interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode
}

interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children?: React.ReactNode
}

const StyledTable = styled.table<{
  $variant: "default" | "striped" | "bordered" | "card"
  $compact: boolean
  $hover: boolean
  $stickyHeader: boolean
  $fullWidth: boolean
}>`
  border-collapse: separate;
  border-spacing: 0;
  width: ${props => props.$fullWidth ? "100%" : "auto"};
  font-variant-numeric: tabular-nums;
  
  ${props => props.$variant === "bordered" && `
    border: 1px solid ${theme.colors.border};
  `}
  
  ${props => props.$variant === "card" && `
    background: ${theme.colors.card};
    border-radius: ${theme.borderRadius.md};
    box-shadow: ${theme.shadows.sm};
    overflow: hidden;
  `}
`

const StyledTableHead = styled.thead`
  background-color: ${theme.colors.card};
  font-weight: 600;
  
  tr:last-child th {
    border-bottom: 2px solid ${theme.colors.border};
  }
`

const StyledTableBody = styled.tbody<{
  $variant: "default" | "striped" | "bordered" | "card"
}>`
  ${props => props.$variant === "striped" && `
    tr:nth-child(even) {
      background-color: ${theme.colors.accent};
    }
  `}
`

const StyledTableRow = styled.tr<{
  $selected?: boolean
  $disabled?: boolean
  $variant: "default" | "striped" | "bordered" | "card"
  $hover: boolean
}>`
  ${props => props.$disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `}
  
  ${props => props.$selected && `
    background-color: ${theme.colors.accent};
  `}
  
  ${props => props.$hover && `
    &:hover {
      background-color: ${theme.colors.accent};
    }
  `}
`

const StyledTableHeader = styled.th<{
  $align: "left" | "center" | "right"
  $compact: boolean
  $variant: "default" | "striped" | "bordered" | "card"
}>`
  padding: ${props => props.$compact ? theme.spacing.xs : theme.spacing.sm};
  text-align: ${props => props.$align};
  color: ${theme.colors.foreground};
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
  white-space: nowrap;
  position: relative;
  
  ${props => props.$variant === "bordered" && `
    border: 1px solid ${theme.colors.border};
  `}
  
  &:first-child {
    border-top-left-radius: ${props => props.$variant === "card" ? theme.borderRadius.md : '0'};
  }
  
  &:last-child {
    border-top-right-radius: ${props => props.$variant === "card" ? theme.borderRadius.md : '0'};
  }
`

const StyledTableCell = styled.td<{
  $align: "left" | "center" | "right"
  $compact: boolean
  $variant: "default" | "striped" | "bordered" | "card"
}>`
  padding: ${props => props.$compact ? theme.spacing.xs : theme.spacing.sm};
  text-align: ${props => props.$align};
  color: ${theme.colors.foreground};
  font-size: ${theme.fontSizes.sm};
  border-bottom: 1px solid ${theme.colors.border};
  
  ${props => props.$variant === "bordered" && `
    border: 1px solid ${theme.colors.border};
  `}
`

const StyledTableFooter = styled.tfoot`
  border-top: 2px solid ${theme.colors.border};
  background-color: ${theme.colors.card};
  font-weight: 500;
`

const StyledTableCaption = styled.caption`
  margin-top: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors["muted-foreground"]};
  text-align: left;
`

export const Table = {
  Root: React.forwardRef<HTMLTableElement, TableRootProps>(({
    children,
    variant = "default",
    compact = false,
    hover = false,
    stickyHeader = false,
    fullWidth = true,
    className,
    ...props
  }, ref) => {
    return (
      <div style={{ overflowX: 'auto', width: fullWidth ? '100%' : 'auto' }}>
        <StyledTable
          ref={ref}
          $variant={variant}
          $compact={compact}
          $hover={hover}
          $stickyHeader={stickyHeader}
          $fullWidth={fullWidth}
          className={className}
          role="table"
          {...props}
        >
          {children}
        </StyledTable>
      </div>
    );
  }),
  
  Head: React.forwardRef<HTMLTableSectionElement, TableHeadProps>(({
    children,
    className,
    ...props
  }, ref) => {
    return (
      <StyledTableHead ref={ref} className={className} {...props}>
        {children}
      </StyledTableHead>
    );
  }),
  
  Body: React.forwardRef<HTMLTableSectionElement, TableBodyProps>(({
    children,
    className,
    ...props
  }, ref) => {
    // Get variant from context or parent component
    const variant = "default";
    
    return (
      <StyledTableBody 
        ref={ref} 
        className={className} 
        $variant={variant as "default" | "striped" | "bordered" | "card"} 
        {...props}
      >
        {children}
      </StyledTableBody>
    );
  }),
  
  Row: React.forwardRef<HTMLTableRowElement, TableRowProps>(({
    children,
    selected = false,
    disabled = false,
    className,
    ...props
  }, ref) => {
    // Get variant and hover from context or parent component
    const variant = "default";
    const hover = false;
    
    return (
      <StyledTableRow 
        ref={ref} 
        $selected={selected} 
        $disabled={disabled}
        $variant={variant as "default" | "striped" | "bordered" | "card"}
        $hover={hover}
        className={className}
        aria-selected={selected}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </StyledTableRow>
    );
  }),
  
  Header: React.forwardRef<HTMLTableCellElement, TableHeaderProps>(({
    children,
    align = "left",
    className,
    scope = "col",
    ...props
  }, ref) => {
    // Get variant and compact from context or parent component
    const variant = "default";
    const compact = false;
    
    return (
      <StyledTableHeader 
        ref={ref} 
        $align={align}
        $compact={compact}
        $variant={variant as "default" | "striped" | "bordered" | "card"}
        className={className}
        scope={scope}
        role="columnheader"
        {...props}
      >
        {children}
      </StyledTableHeader>
    );
  }),
  
  Cell: React.forwardRef<HTMLTableCellElement, TableCellProps>(({
    children,
    align = "left",
    className,
    ...props
  }, ref) => {
    // Get variant and compact from context or parent component
    const variant = "default";
    const compact = false;
    
    return (
      <StyledTableCell 
        ref={ref} 
        $align={align}
        $compact={compact}
        $variant={variant as "default" | "striped" | "bordered" | "card"}
        className={className}
        role="cell"
        {...props}
      >
        {children}
      </StyledTableCell>
    );
  }),
  
  Footer: React.forwardRef<HTMLTableSectionElement, TableFooterProps>(({
    children,
    className,
    ...props
  }, ref) => {
    return (
      <StyledTableFooter ref={ref} className={className} {...props}>
        {children}
      </StyledTableFooter>
    );
  }),
  
  Caption: React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(({
    children,
    className,
    ...props
  }, ref) => {
    return (
      <StyledTableCaption ref={ref} className={className} {...props}>
        {children}
      </StyledTableCaption>
    );
  }),
};

Object.assign(Table, {
  displayName: "Table",
});