"use client"
import type React from "react"
import {useState} from "react"
import styled from "styled-components"
import {Search, PlusCircle, Edit2, Trash2, Calendar, Tag, Clock, Info} from "lucide-react"
import {theme} from "../../../styles/theme"
import {Input} from "../../components/ui/Input";
import {Text} from "../../components/ui/Text";
import {Button} from "../../components/ui/Button";
import slugify from 'slugify'

const PageContainer = styled.div`
    padding: ${theme.spacing.lg};
    background-color: ${theme.colors.background};

    min-height: 100vh;

    @media (max-width: ${theme.breakpoints.md}) {
        padding: ${theme.spacing.md};
    }
`

const PageHeader = styled.div`
    margin-bottom: ${theme.spacing.xl};
    position: relative;

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
`

const FormContainer = styled.div`
    background-color: ${theme.colors.card};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.xl};
    box-shadow: ${theme.shadows.sm};
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: ${theme.shadows.md};
    }

    @media (max-width: ${theme.breakpoints.md}) {
        padding: ${theme.spacing.md};
    }
`

const Form = styled.form`
    display: flex;
    gap: ${theme.spacing.md};
    flex-wrap: wrap;

    @media (max-width: ${theme.breakpoints.md}) {
        flex-direction: column;
    }
`

const InputWrapper = styled.div`
    flex: 1;
    min-width: 250px;
`

const ListContainer = styled.div`
    background-color: ${theme.colors.card};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.sm};

    @media (max-width: ${theme.breakpoints.md}) {
        padding: ${theme.spacing.md};
    }
`

const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.lg};
    flex-wrap: wrap;
    gap: ${theme.spacing.md};

    @media (max-width: ${theme.breakpoints.sm}) {
        flex-direction: column;
        align-items: flex-start;
    }
`

const SearchWrapper = styled.div`
    width: 300px;
    max-width: 100%;

    @media (max-width: ${theme.breakpoints.sm}) {
        width: 100%;
    }
`

const CollectionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: ${theme.spacing.lg};

    @media (max-width: ${theme.breakpoints.sm}) {
        grid-template-columns: 1fr;
    }
`

const CollectionCard = styled.div`
    background-color: ${theme.colors.background};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.lg};
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: ${theme.colors.primary};
        opacity: 0.7;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: ${theme.shadows.md};
    }
`

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.xs};
`

const ActionButtons = styled.div`
    display: flex;
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.md};
`

const EmptyState = styled.div`
    text-align: center;
    padding: ${theme.spacing.xl} 0;
    background-color: ${theme.colors.muted};
    border-radius: ${theme.borderRadius.md};
    border: 1px dashed ${theme.colors.border};
`

const Divider = styled.hr`
    border: 0;
    height: 1px;
    background-color: ${theme.colors.border};
    margin: ${theme.spacing.md} 0;
`

const CollectionDescription = styled.div`
    margin: ${theme.spacing.md} 0;
    padding: ${theme.spacing.sm};
    background-color: ${theme.colors.muted};
    border-radius: ${theme.borderRadius.sm};
    border-left: 3px solid ${theme.colors.accent};
`

export const CollectionListPage: React.FC = () => {
    const [collectionName, setCollectionName] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    // Mock collection data
    const mockCollections = [
        {
            _id: "1",
            name: "Blog Posts",
            slug: "blog-posts",
            description: "Main blog content with articles, news, and updates for the website visitors.",
            createdAt: "2023-07-15T10:30:00Z",
            updatedAt: "2023-09-22T15:45:00Z",
        },
        {
            _id: "2",
            name: "Products",
            slug: "products",
            description: "E-commerce products catalog with detailed information and pricing.",
            createdAt: "2023-08-05T09:15:00Z",
            updatedAt: "2023-09-18T11:20:00Z",
        },
        {
            _id: "3",
            name: "Team Members",
            slug: "team-members",
            description: "Staff profiles and information about our company employees.",
            createdAt: "2023-09-01T14:20:00Z",
            updatedAt: "2023-09-10T16:30:00Z",
        },
    ]

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const createCollection = async () => {
        const res = await fetch('/api/kyper/collections/blog/create', {
            method: 'POST',
            body: JSON.stringify({
                name: collectionName,
                description: "New collection description",
                slug: slugify(collectionName, {lower: true, trim: true, strict: true}),
            }),
        });
        const data = await res.json();
        console.log('Collection created:', data);
    }

    return (
        <PageContainer>
            <PageHeader>
                <Text type="h1" weight="bold">
                    Collections
                </Text>
                <Text type="p" muted>
                    Create and manage your content collections
                </Text>
            </PageHeader>

            <FormContainer>
                <Text type="h2" weight="semibold">
                    Create Collection
                </Text>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <InputWrapper>
                        <Input
                            placeholder="Enter collection name"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                            variant="outline"
                            color={'accent'}
                            fullWidth
                            aria-label="Collection name"
                            leftIcon={PlusCircle}
                        />
                    </InputWrapper>
                    <Button variant="solid" color="primary" shadow="sm" onClick={createCollection}>
                        Add Collection
                    </Button>
                </Form>
            </FormContainer>

            <ListContainer>
                <ListHeader>
                    <Text type="h2" weight="semibold">
                        Your Collections
                    </Text>
                    <SearchWrapper>
                        <Input
                            placeholder="Search collections..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="outline"
                            fullWidth
                            leftIcon={Search}
                            aria-label="Search collections"
                        />
                    </SearchWrapper>
                </ListHeader>

                {mockCollections.length > 0 ? (
                    <CollectionGrid>
                        {mockCollections.map((collection) => (
                            <CollectionCard key={collection._id}>
                                <Text type="h3" weight="semibold" truncate>
                                    {collection.name}
                                </Text>

                                <Divider/>

                                <MetaItem>
                                    <Tag size={16}/>
                                    <Text type="small" weight="medium">
                                        {collection.slug}
                                    </Text>
                                </MetaItem>

                                <MetaItem>
                                    <Calendar size={16}/>
                                    <Text type="small">Created: {formatDate(collection.createdAt)}</Text>
                                </MetaItem>

                                <MetaItem>
                                    <Clock size={16}/>
                                    <Text type="small">Updated: {formatDate(collection.updatedAt)}</Text>
                                </MetaItem>

                                {collection.description && (
                                    <CollectionDescription>
                                        <MetaItem>
                                            <Info size={16}/>
                                            <Text type="small">{collection.description}</Text>
                                        </MetaItem>
                                    </CollectionDescription>
                                )}

                                <ActionButtons>
                                    <Button variant="outline" color="primary" size="small" shadow="sm">
                                        <Edit2 size={16}/> Edit
                                    </Button>
                                    <Button variant="outline" color="error" size="small" shadow="sm">
                                        <Trash2 size={16}/> Delete
                                    </Button>
                                </ActionButtons>
                            </CollectionCard>
                        ))}
                    </CollectionGrid>
                ) : (
                    <EmptyState>
                        <Text type="p" align="center">
                            No collections found. Create your first collection to get started.
                        </Text>
                    </EmptyState>
                )}
            </ListContainer>
        </PageContainer>
    )
}
