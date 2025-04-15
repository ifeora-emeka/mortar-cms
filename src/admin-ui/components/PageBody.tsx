"use client"

import React from "react"
import styled from "styled-components"
import { theme } from "../../styles/theme"
import { Text } from "./ui/Text"

interface PageBodyProps {
    heading: string
    subheading?: string
    rightContent?: React.ReactNode
    children: React.ReactNode
}

const StyledPageBody = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.xl};
  position: relative;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -${theme.spacing.md};
    left: 0;
    width: 60px;
    height: 4px;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`

const HeaderContent = styled.div`
  flex: 1;
`

const HeaderActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    justify-content: flex-start;
  }
`

const PageContent = styled.div`
  background-color: ${theme.colors.card};
  box-shadow: ${theme.shadows.sm};
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
  }
`

export const PageBody: React.FC<PageBodyProps> = ({ heading, subheading, rightContent, children }) => {
    return (
        <StyledPageBody>
            <PageHeader>
                <HeaderContent>
                    <Text type="h1" weight="bold">
                        {heading}
                    </Text>
                    {subheading && (
                        <Text type="p" muted>
                            {subheading}
                        </Text>
                    )}
                </HeaderContent>
                {rightContent && <HeaderActions>{rightContent}</HeaderActions>}
            </PageHeader>
            <PageContent>{children}</PageContent>
        </StyledPageBody>
    )
}

PageBody.displayName = "PageBody"