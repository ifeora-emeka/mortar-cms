"use client"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { FolderOpen, PlusCircle, MoreVertical, Edit, Trash2, AlertCircle } from "lucide-react"
import { theme } from "../../../styles/theme"
import { Button } from "../../components/ui/Button"
import { Text } from "../../components/ui/Text"
import { Table } from "../../components/ui/Table"
import { PageBody } from "../../components/PageBody"
import { MessagePlaceholder } from "../../components/placeholders/MessagePlaceholder"
import { TablePlaceholder } from "../../components/placeholders/TablePlaceholder"
import { ErrorPlaceholder } from "../../components/placeholders/ErrorPlaceholder"
import { CreateCollectionModal } from "./CreateCollectionModal"
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "../../components/ui/Dropdown"
import { Modal } from "../../components/ui/Modal"
import { useToast } from "../../components/ToastProvider"
import api from "../../../lib/api"
import { Layout } from "../../components/layout"

const ActionButton = styled(Button)`
  min-width: 150px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex: 1;
  }
`

const StyledTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

const TruncatedText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-width: 250px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`

const ConfirmationModalContent = styled.div`
  padding: ${theme.spacing.md} 0;
`

const WarningText = styled(Text)`
  margin-top: ${theme.spacing.sm};
`

interface Collection {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface DeleteModalProps {
  isOpen: boolean;
  collection: Collection | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({
  isOpen,
  collection,
  onClose,
  onConfirm,
  isDeleting
}) => {
  if (!collection) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      position="center"
    >
      <Modal.Header
        heading="Delete Collection"
        subheading="This action cannot be undone"
        onClose={onClose}
      />

      <Modal.Body>
        <ConfirmationModalContent>
          <Text type="p">
            Are you sure you want to delete the collection <strong>{collection.name}</strong>?
          </Text>
          <WarningText type="small" muted>
            This will permanently remove all content and settings associated with this collection.
          </WarningText>
        </ConfirmationModalContent>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="ghost"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          color="error"
          onClick={onConfirm}
          disabled={isDeleting}
          loading={isDeleting}
          loadingText="Deleting..."
          spinnerType="spinner"
        >
          Delete Collection
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const CollectionListPage: React.FC = () => {
  const { toast } = useToast()
  const [collections, setCollections] = useState<Collection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

      toast({
        title: "Error loading collections",
        description: err.response?.data?.message || err.message || 'Failed to load collections',
        duration: 5000
      })
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

  const handleEditCollection = (collection: Collection) => {
    setSelectedCollection(collection)
    // For now we'll just log since we don't have the edit modal yet
    console.log(`Edit collection: ${collection._id}`)
    toast({
      title: "Edit functionality",
      description: "Edit functionality will be implemented in a future update",
      duration: 5000
    })
  }

  const handleDeleteClick = (collection: Collection) => {
    setSelectedCollection(collection)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedCollection) return

    setIsDeleting(true)
    try {
      console.log(`Deleting collection: ${selectedCollection._id}`)

      setCollections(collections.filter(c => c._id !== selectedCollection._id))

      toast({
        title: "Collection deleted",
        description: `Successfully deleted collection "${selectedCollection.name}"`,
        duration: 5000
      })

      setIsDeleteModalOpen(false)
      setSelectedCollection(null)
    } catch (err: any) {
      console.error('Error deleting collection:', err)

      toast({
        title: "Error deleting collection",
        description: err.response?.data?.message || err.message || 'Failed to delete collection',
        duration: 5000
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSubmitCollection = async (data: any) => {
    try {
      toast({
        title: "Collection created",
        description: `Successfully created collection "${data.name}"`,
        duration: 5000
      })
      await fetchCollections()
    } catch (error: any) {
      console.error('Error refreshing collections:', error)
      toast({
        title: "Error refreshing collections",
        description: error.message || 'Failed to refresh collections list',
        duration: 5000
      })
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
      <StyledTableWrapper>
        <Table.Root variant="striped" size="medium" hover={true} fullWidth={true}>
          <Table.Head>
            <Table.Row>
              <Table.Header>Name</Table.Header>
              <Table.Header>Slug</Table.Header>
              <Table.Header>Description</Table.Header>
              <Table.Header>Created</Table.Header>
              <Table.Header align="right">Actions</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {collections.map((collection) => (
              <Table.Row key={collection._id}>
                <Table.Cell data-label="Name">
                  <Text type="p" weight="medium">
                    {collection.name}
                  </Text>
                </Table.Cell>
                <Table.Cell data-label="Slug">
                  <Text type="p" muted>
                    {collection.slug}
                  </Text>
                </Table.Cell>
                <Table.Cell data-label="Description">
                  {collection.description ? (
                    <TruncatedText type="p" muted>
                      {collection.description}
                    </TruncatedText>
                  ) : (
                    <Text type="p" muted>--</Text>
                  )}
                </Table.Cell>
                <Table.Cell data-label="Created">
                  {formatDate(collection.createdAt)}
                </Table.Cell>
                <Table.Cell data-label="Actions" align="right">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="ghost" size="small">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownContent>
                      <DropdownItem onSelect={() => handleEditCollection(collection)}>
                        <Edit size={16} />
                        <span style={{ marginLeft: theme.spacing.sm }}>Edit</span>
                      </DropdownItem>
                      <DropdownItem onSelect={() => handleDeleteClick(collection)}>
                        <Trash2 size={16} color={theme.colors.error} />
                        <span style={{ marginLeft: theme.spacing.sm, color: theme.colors.error }}>Delete</span>
                      </DropdownItem>
                    </DropdownContent>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </StyledTableWrapper>
    )
  }

  return (
    <>
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

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          collection={selectedCollection}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      </PageBody>
    </>
  )
}
