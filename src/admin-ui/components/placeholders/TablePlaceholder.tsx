"use client"

import React, { useMemo } from "react"
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

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
`

const HeaderSkeleton = styled(Skeleton)<{$width: string, $align: string}>`
  width: ${props => props.$width};
  border-radius: ${theme.borderRadius.sm};
  margin: ${props => props.$align === 'right' ? '0 0 0 auto' : props.$align === 'center' ? '0 auto' : '0'};
`

const CellSkeleton = styled(Skeleton)<{$align: string}>`
  width: 70%;
  border-radius: ${theme.borderRadius.sm};
  margin: ${props => props.$align === 'right' ? '0 0 0 auto' : props.$align === 'center' ? '0 auto' : '0'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`

const getRandomWidth = (min: number, max: number, isLast = false): string => {
  const randomWidth = Math.floor(Math.random() * (max - min + 1)) + min;
  return `${randomWidth}%`;
};

const getRandomCellWidth = (baseWidth: string, index: number, columnCount: number): string => {
  let width = parseInt(baseWidth);
  
  if (index === columnCount - 1) return '80px';
  
  const variance = Math.random() * 30 - 15;
  const adjustedWidth = width + variance;
  
  const finalWidth = Math.max(width * 0.3, Math.min(width * 1.3, adjustedWidth));
  
  return `${finalWidth.toFixed(1)}%`;
};

export const TablePlaceholder: React.FC<TablePlaceholderProps> = ({
  rowCount = 5,
  columnCount = 4,
  hasHeader = true,
  animation = "pulse",
  className,
  rowHeight = "40px",
  headerHeight = "48px",
}) => {
  const baseColumns = useMemo(() => {
    return Array(columnCount).fill(0).map((_, i) => {
      if (i === columnCount - 1) return "80px";
      
      const totalRemainingWidth = 100 - (i === columnCount - 1 ? 10 : 0);
      const avgColWidth = totalRemainingWidth / (columnCount - 1);
      
      const minWidth = Math.max(10, avgColWidth * 0.7);
      const maxWidth = Math.min(40, avgColWidth * 1.3);
      
      return getRandomWidth(minWidth, maxWidth);
    });
  }, [columnCount]);
  
  const rowCellWidths = useMemo(() => {
    return Array(rowCount).fill(0).map(() => 
      baseColumns.map((baseWidth, i) => 
        getRandomCellWidth(baseWidth, i, columnCount)
      )
    );
  }, [rowCount, baseColumns, columnCount]);
  
  const getHeightValue = (height: string | number): string => {
    if (typeof height === 'number') {
      return `${height}px`;
    }
    return height;
  };
  
  return (
    <TableWrapper className={className}>
      <Table.Root variant="card" hover={false} fullWidth={true}>
        {hasHeader && (
          <Table.Head>
            <Table.Row>
              {baseColumns.map((width, i) => (
                <Table.Header key={i} align={i === columnCount - 1 ? "right" : "left"}>
                  <HeaderSkeleton
                    variant="text"
                    animation={animation}
                    $width={width}
                    $align={i === columnCount - 1 ? "right" : "left"}
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
                {rowCellWidths[rowIndex].map((width, colIndex) => {
                  const align = colIndex === columnCount - 1 ? "right" : "left";
                  // Random height variation for more natural appearance
                  const heightVariance = Math.random() * 10 - 5; // +/- 5px
                  const baseHeight = typeof rowHeight === 'number' ? rowHeight : parseInt(rowHeight);
                  const cellHeight = `${Math.max(10, baseHeight + heightVariance)}px`;
                  
                  return (
                    <Table.Cell
                      key={`${rowIndex}-${colIndex}`}
                      align={align}
                    >
                      <CellSkeleton
                        variant="text"
                        animation={animation}
                        $align={align}
                      />
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </TableWrapper>
  );
};

TablePlaceholder.displayName = "TablePlaceholder"