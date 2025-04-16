"use client"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FolderOpen, PlusCircle } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Button } from "../../components/ui/Button"
import { Text } from "../../components/ui/Text"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableContainer } from "../../components/ui/Table"
import { PageBody } from "../../components/PageBody"
import { MessagePlaceholder } from "../../components/placeholders/MessagePlaceholder"
import { TablePlaceholder } from "../../components/placeholders/TablePlaceholder"
import { ErrorPlaceholder } from "../../components/placeholders/ErrorPlaceholder"
import { CreateCollectionModal } from "./CreateCollectionModal"
import api from "../../../lib/api"

const ActionButton = styled(Button)`
  min-width: 150px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex: 1;
  }
`

const StyledTable = styled(Table)`
  min-width: 600px;
`

const TruncatedText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 250px;
`

interface Collection {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const CollectionListPage: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchCollections()
  }, [])

  const fetchCollections = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await api.get('/kyper/collections/get-all')
      if (response.data && response.data.data) {
        setCollections(response.data.data)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err: any) {
      console.error('Error fetching collections:', err)
      setError(err.response?.data?.message || err.message || 'Failed to load collections')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleCreateCollection = () => {
    setIsModalOpen(true)
  }
  
  const handleSubmitCollection = async (data: any) => {
    try {
      await fetchCollections()
    } catch (error) {
      console.error('Error refreshing collections:', error)
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return <TablePlaceholder rowCount={5} columnCount={5} animation="pulse" />
    }

    if (error) {
      return (
        <ErrorPlaceholder
          heading="Error loading collections"
          subheading={error}
          type="error"
          variant="filled"
          color="error"
          retryText="Try Again"
          onRetry={fetchCollections}
        />
      )
    }

    if (collections.length === 0) {
      return (
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
      )
    }

    return (
      <TableContainer>
        <StyledTable variant="striped" size="medium" shadow="sm">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
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
                <TableCell data-label="Description">
                  {collection.description ? (
                    <TruncatedText type="p" muted>
                      {collection.description}
                    </TruncatedText>
                  ) : (
                    <Text type="p" muted>--</Text>
                  )}
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
    )
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
      {renderContent()}
      
      <CreateCollectionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitCollection}
      />
    </PageBody>
  )
}
