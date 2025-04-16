"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { Table } from "../ui/Table"
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

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

export const TablePlaceholder: React.FC<TablePlaceholderProps> = ({
  rowCount = 5,
  columnCount = 4,
  hasHeader = true,
  animation = "pulse",
  className,
  rowHeight = "40px",
  headerHeight = "48px",
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
  
  // Convert number heights to strings with 'px' units if needed
  const getHeightValue = (height: string | number): string => {
    if (typeof height === 'number') {
      return `${height}px`
    }
    return height
  }
  
  return (
    <TableWrapper className={className}>
      <Table.Root variant="striped" size="medium" hover={false} fullWidth={true}>
        {hasHeader && (
          <Table.Head>
            <Table.Row>
              {columns.map((width, i) => (
                <Table.Header key={i} align={i === columns.length - 1 ? "right" : "left"}>
                  <HeaderSkeleton
                    variant="text"
                    animation={animation}
                    width={width}
                    height={getHeightValue(headerHeight)}
                  />
                </Table.Header>
              ))}
            </Table.Row>
          </Table.Head>
        )}
        
        <Table.Body>
          {Array(rowCount)
            .fill(0)
            .map((_, rowIndex) => (
              <Table.Row key={rowIndex}>
                {columns.map((width, colIndex) => (
                  <Table.Cell
                    key={`${rowIndex}-${colIndex}`}
                    align={colIndex === columns.length - 1 ? "right" : "left"}
                  >
                    <CellSkeleton
                      variant="text"
                      animation={animation}
                      width={colIndex === columns.length - 1 ? "80px" : width}
                      height={getHeightValue(rowHeight)}
                    />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </TableWrapper>
  )
}

TablePlaceholder.displayName = "TablePlaceholder"