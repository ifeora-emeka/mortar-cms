"use client"
import React, { useState } from "react"
import styled from "styled-components"
import { FolderOpen, PlusCircle } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Button } from "../../components/ui/Button"
import { Text } from "../../components/ui/Text"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableContainer } from "../../components/ui/Table"
import { PageBody } from "../../components/PageBody"
import { MessagePlaceholder } from "../../components/placeholders/MessagePlaceholder"

const ActionButton = styled(Button)`
  min-width: 150px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex: 1;
  }
`

const StyledTable = styled(Table)`
  min-width: 600px;
`

export const CollectionListPage: React.FC = () => {
  const collections = [
    {
      _id: "1",
      name: "Blog Posts",
      slug: "blog-posts",
      createdAt: "2023-07-15T10:30:00Z",
    },
    {
      _id: "2",
      name: "Products",
      slug: "products",
      createdAt: "2023-08-05T09:15:00Z",
    },
    {
      _id: "3",
      name: "Team Members",
      slug: "team-members",
      createdAt: "2023-09-01T14:20:00Z",
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleCreateCollection = () => {
    console.log("Create collection clicked")
  }

  return (
    <PageBody
      heading="Collections"
      subheading="Manage your content structure and organization"
      rightContent={
        <ActionButton 
          variant="solid" 
          color="primary" 
          shadow="sm" 
          onClick={handleCreateCollection}
        >
          <PlusCircle size={18} />
          <span>New Collection</span>
        </ActionButton>
      }
    >
      {collections.length > 0 ? (
        <TableContainer>
          <StyledTable variant="striped" size="medium" shadow="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Created</TableHead>
                <TableHead align="right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map((collection) => (
                <TableRow key={collection._id} interactive>
                  <TableCell data-label="Name">
                    <Text type="p" weight="medium">
                      {collection.name}
                    </Text>
                  </TableCell>
                  <TableCell data-label="Slug">
                    <Text type="p" muted>
                      {collection.slug}
                    </Text>
                  </TableCell>
                  <TableCell data-label="Created">
                    {formatDate(collection.createdAt)}
                  </TableCell>
                  <TableCell data-label="Actions" align="right">
                    <Button variant="ghost" color="primary" size="small">
                      Edit
                    </Button>
                    <Button variant="ghost" color="error" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      ) : (
        <MessagePlaceholder
          heading="No collections found"
          subheading="Create your first collection to get started"
          icon={FolderOpen}
          variant="outlined"
          color="primary"
          actions={
            <Button 
              variant="solid" 
              color="primary" 
              onClick={handleCreateCollection}
            >
              <PlusCircle size={16} />
              <span>New Collection</span>
            </Button>
          }
        />
      )}
    </PageBody>
  )
}
