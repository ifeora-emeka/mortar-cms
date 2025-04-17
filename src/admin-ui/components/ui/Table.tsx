"use client"

import React, { createContext, useContext } from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { ComponentDefaultProps } from "../../../types/components.types"

// Create a context to pass table configuration to child components
interface TableContextType {
  variant: "default" | "striped" | "bordered" | "card";
  compact: boolean;
  hover: boolean;
}

const TableContext = createContext<TableContextType>({
  variant: "default",
  compact: false,
  hover: false,
});

//@ts-ignore
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

const TableContainer = styled.div<{
  $fullWidth: boolean
}>`
  position: relative;
  overflow-x: auto;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  border-radius: ${theme.borderRadius.md};
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors["muted-foreground"]};
    border-radius: ${theme.borderRadius.md};
  }
`

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
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  
  ${props => props.$variant === "bordered" && `
    border: 1px solid ${theme.colors.border};
  `}
  
  ${props => props.$variant === "card" && `
    box-shadow: ${theme.shadows.sm};
  `}
  
  ${props => props.$stickyHeader && `
    thead th {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: ${theme.colors.card};
    }
  `}
`

const StyledTableHead = styled.thead`
  position: relative;
  background-color: ${theme.colors.card};
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: linear-gradient(
      90deg, 
      ${theme.colors.primary}40,
      ${theme.colors.primary}
    );
  }
`

const StyledTableBody = styled.tbody<{
  $variant: "default" | "striped" | "bordered" | "card"
}>`
  ${props => props.$variant === "striped" && `
    tr:nth-child(odd) {
      background-color: ${theme.colors.accent}50;
    }
    tr:nth-child(even) {
      background-color: ${theme.colors.card};
    }
  `}
`

const StyledTableRow = styled.tr<{
  $selected?: boolean
  $disabled?: boolean
  $variant: "default" | "striped" | "bordered" | "card"
  $hover: boolean
}>`
  transition: all 0.2s ease;
  
  ${props => props.$disabled && `
    opacity: 0.6;
    cursor: not-allowed;
  `}
  
  ${props => props.$selected && `
    background-color: ${theme.colors.primary}15 !important;
    border-left: 3px solid ${theme.colors.primary};
  `}
  
  ${props => props.$hover && props.$variant !== "striped" && `
    &:hover {
      background-color: ${theme.colors.accent}50;
    }
  `}
  
  ${props => props.$hover && props.$variant === "striped" && `
    &:hover {
      background-color: ${theme.colors.accent}80 !important;
    }
  `}
`

const StyledTableHeader = styled.th<{
  $align: "left" | "center" | "right"
  $compact: boolean
  $variant: "default" | "striped" | "bordered" | "card"
}>`
  padding: ${props => props.$compact ? `${theme.spacing.xs} ${theme.spacing.sm}` : `${theme.spacing.sm} ${theme.spacing.md}`};
  text-align: ${props => props.$align};
  color: ${theme.colors.foreground};
  font-weight: 600;
  font-size: ${theme.fontSizes.sm};
  white-space: nowrap;
  position: relative;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  transition: background-color 0.2s ease;
  
  ${props => props.$variant === "bordered" && `
    border: 1px solid ${theme.colors.border};
  `}
  
  &:first-child {
    border-top-left-radius: ${props => props.$variant === "card" ? theme.borderRadius.md : '0'};
    padding-left: ${theme.spacing.lg};
  }
  
  &:last-child {
    border-top-right-radius: ${props => props.$variant === "card" ? theme.borderRadius.md : '0'};
    padding-right: ${theme.spacing.lg};
  }
`

const StyledTableCell = styled.td<{
  $align: "left" | "center" | "right"
  $compact: boolean
  $variant: "default" | "striped" | "bordered" | "card"
}>`
  padding: ${props => props.$compact ? `${theme.spacing.xs} ${theme.spacing.sm}` : `${theme.spacing.md} ${theme.spacing.md}`};
  text-align: ${props => props.$align};
  color: ${theme.colors.foreground};
  font-size: ${theme.fontSizes.sm};
  border-bottom: 1px solid ${theme.colors.border}40;
  vertical-align: middle;
  transition: all 0.2s ease;
  
  ${props => props.$variant === "bordered" && `
    border: 1px solid ${theme.colors.border};
  `}
  
  &:first-child {
    padding-left: ${theme.spacing.lg};
  }
  
  &:last-child {
    padding-right: ${theme.spacing.lg};
  }
`

const StyledTableFooter = styled.tfoot`
  background-color: ${theme.colors.card};
  font-weight: 500;
  
  tr {
    border-top: 2px solid ${theme.colors.border};
  }
  
  td {
    padding: ${theme.spacing.md} ${theme.spacing.md};
    color: ${theme.colors.foreground};
  }
`

const StyledTableCaption = styled.caption`
  margin-top: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors["muted-foreground"]};
  text-align: left;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
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
      <TableContext.Provider value={{ variant, compact, hover }}>
        <TableContainer $fullWidth={fullWidth}>
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
        </TableContainer>
      </TableContext.Provider>
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
    const { variant } = useContext(TableContext);
    
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
    const { variant, hover } = useContext(TableContext);
    
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
    const { variant, compact } = useContext(TableContext);
    
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
    const { variant, compact } = useContext(TableContext);
    
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