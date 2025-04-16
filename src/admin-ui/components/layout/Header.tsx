"use client"

import React from "react"
import styled from "styled-components"
import { Menu, Bell, User, ChevronDown, Search } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Button } from "../ui/Button"
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from "../ui/Dropdown"

interface HeaderProps {
  onMenuClick: () => void
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${theme.colors.card};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.spacing.md};
  z-index: 20;
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`

const SearchInput = styled.input`
  background-color: ${theme.colors.accent};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.sm} 36px;
  color: ${theme.colors.foreground};
  width: 100%;
  font-size: ${theme.fontSizes.sm};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.ring};
  }
  
  &::placeholder {
    color: ${theme.colors["muted-foreground"]};
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors["muted-foreground"]};
`

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors["primary-foreground"]};
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  cursor: pointer;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`

const UserName = styled.span`
  font-size: ${theme.fontSizes.sm};
  font-weight: 500;
`

const NotificationBadge = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${theme.colors.error};
    border: 2px solid ${theme.colors.card};
  }
`

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <StyledHeader>
      <LeftSection>
        <Button 
          variant="ghost" 
          size="small" 
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </Button>
        
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <SearchInput placeholder="Search..." />
        </SearchContainer>
      </LeftSection>
      
      <RightSection>
        <Button
          variant="ghost"
          size="small"
          aria-label="Notifications"
        >
          <NotificationBadge>
            <Bell size={20} />
          </NotificationBadge>
        </Button>
        
        <Dropdown>
          <DropdownTrigger>
            <UserContainer>
              <UserAvatar>
                <User size={18} />
              </UserAvatar>
              <UserInfo>
                <UserName>Admin</UserName>
                <ChevronDown size={16} />
              </UserInfo>
            </UserContainer>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Account settings</DropdownItem>
            <DropdownSeparator />
            <DropdownItem>Log out</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </RightSection>
    </StyledHeader>
  )
}