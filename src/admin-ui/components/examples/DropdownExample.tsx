"use client"

import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../ui/Button"
import { Dropdown } from "../ui/Dropdown"
import { 
  Settings, 
  User, 
  LogOut, 
  Edit, 
  Trash2, 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  Check 
} from "lucide-react"
import { theme } from "../../../styles/theme"

const ExampleContainer = styled.div`
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const ExampleSection = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.card};
`

const ExampleTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing.md};
`

const ExampleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`

const CustomTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.primary}10;
  border: 1px solid ${theme.colors.primary}30;
  cursor: pointer;
  
  &:hover {
    background-color: ${theme.colors.primary}20;
  }
`

export function DropdownExample() {
  const [selectedOption, setSelectedOption] = useState("option1")
  
  return (
    <ExampleContainer>
      <h2>Dropdown Component Examples</h2>
      
      <ExampleSection>
        <ExampleTitle>1. Basic Dropdown</ExampleTitle>
        <ExampleRow>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button>Click me</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item onSelect={() => console.log("Option 1")}>
                Option 1
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => console.log("Option 2")}>
                Option 2
              </Dropdown.Item>
              <Dropdown.Item onSelect={() => console.log("Option 3")}>
                Option 3
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </ExampleRow>
        
        <ExampleTitle>2. Dropdown with Icons</ExampleTitle>
        <ExampleRow>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="outline">
                Account <ChevronDown size={16} />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item icon={<User size={16} />} onSelect={() => console.log("Profile")}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item icon={<Settings size={16} />} onSelect={() => console.log("Settings")}>
                Settings
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item 
                icon={<LogOut size={16} />} 
                onSelect={() => console.log("Logout")}
                destructive
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </ExampleRow>
        
        <ExampleTitle>3. Dropdown with Selection</ExampleTitle>
        <ExampleRow>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="solid" color="secondary">
                {selectedOption === "option1" ? "Option 1" : 
                 selectedOption === "option2" ? "Option 2" : "Option 3"}
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item 
                onSelect={() => setSelectedOption("option1")}
                selected={selectedOption === "option1"}
                showSelectedCheckmark
              >
                Option 1
              </Dropdown.Item>
              <Dropdown.Item 
                onSelect={() => setSelectedOption("option2")}
                selected={selectedOption === "option2"}
                showSelectedCheckmark
              >
                Option 2
              </Dropdown.Item>
              <Dropdown.Item 
                onSelect={() => setSelectedOption("option3")}
                selected={selectedOption === "option3"}
                showSelectedCheckmark
              >
                Option 3
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </ExampleRow>
        
        <ExampleTitle>4. Dropdown with Groups and Labels</ExampleTitle>
        <ExampleRow>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button>Actions</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Label>Items</Dropdown.Label>
              <Dropdown.Group>
                <Dropdown.Item icon={<Plus size={16} />} onSelect={() => console.log("Create")}>
                  Create New
                </Dropdown.Item>
                <Dropdown.Item icon={<Edit size={16} />} onSelect={() => console.log("Edit")}>
                  Edit
                </Dropdown.Item>
              </Dropdown.Group>
              <Dropdown.Separator />
              <Dropdown.Label>Danger Zone</Dropdown.Label>
              <Dropdown.Group>
                <Dropdown.Item 
                  icon={<Trash2 size={16} />} 
                  onSelect={() => console.log("Delete")}
                  destructive
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Group>
            </Dropdown.Content>
          </Dropdown.Root>
        </ExampleRow>
        
        <ExampleTitle>5. Custom Trigger Example</ExampleTitle>
        <ExampleRow>
          <Dropdown.Root position="bottom" align="center">
            <Dropdown.Trigger asChild>
              <CustomTrigger>
                <User size={16} />
                <span>User Settings</span>
                <ChevronDown size={14} />
              </CustomTrigger>
            </Dropdown.Trigger>
            <Dropdown.Content width={220}>
              <Dropdown.Item 
                icon={<User size={16} />} 
                description="View and edit your profile" 
                rightIcon={<ChevronRight size={16} />}
              >
                Profile Settings
              </Dropdown.Item>
              <Dropdown.Item 
                icon={<Settings size={16} />} 
                description="Configure system preferences"
                rightIcon={<ChevronRight size={16} />}
              >
                Preferences
              </Dropdown.Item>
              <Dropdown.Separator />
              <Dropdown.Item 
                icon={<LogOut size={16} />} 
                destructive
              >
                Sign out
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </ExampleRow>
        
        <ExampleTitle>6. Different Sizes and Variants</ExampleTitle>
        <ExampleRow>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button size="small">Small Items</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item size="small">Small item 1</Dropdown.Item>
              <Dropdown.Item size="small">Small item 2</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
          
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button>Outlined Items</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item variant="outline">Outlined item 1</Dropdown.Item>
              <Dropdown.Item variant="outline" selected>Selected outlined item</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
          
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button size="large">Solid Items</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item variant="solid" size="large">Large solid item 1</Dropdown.Item>
              <Dropdown.Item variant="solid" size="large" selected>Selected large solid item</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </ExampleRow>
        
        <ExampleTitle>7. Disabled Items</ExampleTitle>
        <ExampleRow>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button>Items with disabled state</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Enabled item</Dropdown.Item>
              <Dropdown.Item disabled>Disabled item</Dropdown.Item>
              <Dropdown.Item>Another enabled item</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </ExampleRow>
        
        <ExampleTitle>8. Different Positions</ExampleTitle>
        <ExampleRow>
          <Dropdown.Root position="top" align="start">
            <Dropdown.Trigger>
              <Button>Opens Above (Top)</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item>Item 3</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
          
          <Dropdown.Root position="right" align="center">
            <Dropdown.Trigger>
              <Button>Opens Right</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item>Item 3</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
          
          <Dropdown.Root position="left" align="center">
            <Dropdown.Trigger>
              <Button>Opens Left</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Item 1</Dropdown.Item>
              <Dropdown.Item>Item 2</Dropdown.Item>
              <Dropdown.Item>Item 3</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Root>
        </ExampleRow>
      </ExampleSection>
    </ExampleContainer>
  )
}