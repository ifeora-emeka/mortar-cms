"use client"

import React from "react"
import styled from "styled-components"
import { ChevronLeft, ChevronRight, LayoutDashboard, FileText, Settings, FolderKanban, Database } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Text } from "../ui/Text"
import { Button } from "../ui/Button"
import { useRouter, usePathname } from 'next/navigation'

interface SideNavProps {
  isExpanded: boolean
  onToggle: () => void
}

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

const StyledSideNav = styled.aside<{ $isExpanded: boolean }>`
  position: fixed;
  top: 60px;
  left: 0;
  height: calc(100vh - 60px);
  width: ${props => props.$isExpanded ? '240px' : '64px'};
  background-color: ${theme.colors.card};
  border-right: 1px solid ${theme.colors.border};
  transition: width 0.3s ease;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 10;
  display: flex;
  flex-direction: column;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.muted};
    border-radius: ${theme.borderRadius.sm};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    transform: translateX(${props => props.$isExpanded ? '0' : '-100%'});
    width: ${props => props.$isExpanded ? '240px' : '0'};
    box-shadow: ${props => props.$isExpanded ? theme.shadows.lg : 'none'};
  }
`

const NavItems = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.sm};
  flex: 1;
`

const NavLink = styled.a<{ $isActive: boolean; $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  padding: ${props => props.$isExpanded ? `${theme.spacing.sm} ${theme.spacing.md}` : theme.spacing.sm};
  margin-bottom: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.md};
  color: ${props => props.$isActive ? theme.colors.primary : theme.colors.foreground};
  background-color: ${props => props.$isActive ? `${theme.colors.primary}15` : 'transparent'};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.$isActive ? `${theme.colors.primary}25` : theme.colors.accent};
  }
  
  svg {
    min-width: 20px;
  }
`

const NavItemText = styled.span<{ $isExpanded: boolean }>`
  margin-left: ${theme.spacing.md};
  opacity: ${props => props.$isExpanded ? 1 : 0};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`

const ToggleContainer = styled.div`
  display: flex;
  justify-content: ${props => props.$isExpanded ? 'flex-end' : 'center'};
  padding: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};
`

const Logo = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
  
  svg {
    width: 24px;
    height: 24px;
    color: ${theme.colors.primary};
  }
`

const LogoText = styled.span<{ $isExpanded: boolean }>`
  margin-left: ${theme.spacing.sm};
  font-weight: 600;
  font-size: ${theme.fontSizes.lg};
  opacity: ${props => props.$isExpanded ? 1 : 0};
  transition: opacity 0.3s ease;
  white-space: nowrap;
`

export const SideNav: React.FC<SideNavProps> = ({ isExpanded, onToggle }) => {
  const router = useRouter()
  const pathname = usePathname()
  
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      href: '/'
    },
    {
      id: 'collections',
      label: 'Collections',
      icon: <Database size={20} />,
      href: '/collections'
    },
    {
      id: 'schemas',
      label: 'Schemas',
      icon: <FolderKanban size={20} />,
      href: '/schemas'
    },
    {
      id: 'content',
      label: 'Content',
      icon: <FileText size={20} />,
      href: '/content'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      href: '/settings'
    }
  ]
  
  const handleNavigation = (href: string) => {
    router.push(href)
  }
  
  const isActive = (href: string) => {
    return pathname?.includes(href) || (href === '/' && pathname === '/')
  }
  
  return (
    <StyledSideNav $isExpanded={isExpanded}>
      <Logo $isExpanded={isExpanded}>
        <Database size={24} />
        <LogoText $isExpanded={isExpanded}>
          Kyper CMS
        </LogoText>
      </Logo>
      
      <NavItems>
        {navItems.map((item) => (
          <NavLink 
            key={item.id} 
            $isActive={isActive(item.href)}
            $isExpanded={isExpanded}
            onClick={() => handleNavigation(item.href)}
          >
            {item.icon}
            <NavItemText $isExpanded={isExpanded}>{item.label}</NavItemText>
          </NavLink>
        ))}
      </NavItems>
      
      <ToggleContainer $isExpanded={isExpanded}>
        <Button 
          variant="ghost"
          size="small"
          onClick={onToggle}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
      </ToggleContainer>
    </StyledSideNav>
  )
}