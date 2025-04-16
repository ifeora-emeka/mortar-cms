"use client"

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { Header } from "./Header"
import { SideNav } from "./SideNav"

interface LayoutProps {
  children: React.ReactNode
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  select: none;
`

const MainContent = styled.main<{ $sidebarExpanded: boolean }>`
  margin-left: ${props => props.$sidebarExpanded ? '240px' : '64px'};
  margin-top: 60px;
  transition: margin-left 0.3s ease;
  flex: 1;
  select: none;
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 0;
  }
`

const Overlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < parseInt(theme.breakpoints.md.replace('px', '')))
      if (window.innerWidth < parseInt(theme.breakpoints.md.replace('px', ''))) {
        setSidebarExpanded(false)
      }
    }
    
    // Initial check
    checkIsMobile()
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])
  
  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev)
  }
  
  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarExpanded(false)
    }
  }
  
  return (
    <LayoutContainer>
      <Header onMenuClick={toggleSidebar} />
      <SideNav isExpanded={sidebarExpanded} onToggle={toggleSidebar} />
      <Overlay $visible={isMobile && sidebarExpanded} onClick={handleOverlayClick} />
      <MainContent $sidebarExpanded={sidebarExpanded}>
        {children}
      </MainContent>
    </LayoutContainer>
  )
}