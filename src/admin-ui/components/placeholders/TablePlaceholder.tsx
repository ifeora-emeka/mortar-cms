"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableContainer } from "../ui/Table"
import { Skeleton } from "../ui/Skeleton"

interface TablePlaceholderProps {
  rowCount?: number
  columnCount?: number
  hasHeader?: boolean
  animation?: "pulse" | "wave" | "none"
  className?: string
  rowHeight?: number | string
  headerHeight?: number | string
}

const HeaderSkeleton = styled(Skeleton)`
  width: 100%;
`

const CellSkeleton = styled(Skeleton)`
  width: 100%;
`

export const TablePlaceholder: React.FC<TablePlaceholderProps> = ({
  rowCount = 5,
  columnCount = 4,
  hasHeader = true,
  animation = "pulse",
  className,
  rowHeight = 40,
  headerHeight = 48,
}) => {
  // Generate columns with varying widths for more natural look
  const generateColumns = () => {
    return Array(columnCount).fill(0).map((_, i) => {
      // Last column is usually for actions and is smaller
      if (i === columnCount - 1) return "120px"
      
      // Create columns with varying widths
      const baseWidth = Math.floor(Math.random() * 20) + 10
      return `${baseWidth}%`
    })
  }
  
  const columns = generateColumns()
  
  return (
    <TableContainer className={className}>
      <Table variant="striped" size="medium" shadow="sm">
        {hasHeader && (
          <TableHeader>
            <TableRow>
              {columns.map((width, i) => (
                <TableHead key={i} align={i === columns.length - 1 ? "right" : "left"}>
                  <HeaderSkeleton
                    variant="text"
                    animation={animation}
                    width={width}
                    height={headerHeight}
                  />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        
        <TableBody>
          {Array(rowCount)
            .fill(0)
            .map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((width, colIndex) => (
                  <TableCell
                    key={`${rowIndex}-${colIndex}`}
                    align={colIndex === columns.length - 1 ? "right" : "left"}
                  >
                    <CellSkeleton
                      variant="text"
                      animation={animation}
                      width={colIndex === columns.length - 1 ? "80px" : width}
                      height={rowHeight}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

TablePlaceholder.displayName = "TablePlaceholder"