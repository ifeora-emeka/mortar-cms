"use client"

import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import slugify from "slugify"
import styled from "styled-components"
import { theme } from "../../../styles/theme"
import { Modal } from "../../components/ui/Modal"
import { Input } from "../../components/ui/Input"
import { TextArea } from "../../components/ui/TextArea"
import { Button } from "../../components/ui/Button"
import { FormField } from "../../components/ui/FormField"
import { toast } from "../../components/ToastProvider"
import api from "../../../lib/api"
import { Text } from "../../components/ui/Text"

const createCollectionSchema = z.object({
    name: z.string()
        .min(1, "Collection name is required")
        .max(100, "Collection name cannot exceed 100 characters"),
    slug: z.string()
        .min(1, "Slug is required")
        .max(50, "Slug cannot exceed 50 characters")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z.string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .nullable()
        .transform(val => val === "" ? null : val)
})

type CreateCollectionFormValues = z.infer<typeof createCollectionSchema>

interface CreateCollectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: CreateCollectionFormValues) => Promise<void>
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const FormActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  justify-content: flex-end;
  margin-top: ${theme.spacing.md};
`

const ErrorMessage = styled.div`
  background-color: ${theme.colors.error}15;
  border: 1px solid ${theme.colors.error}30;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`

export const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        reset
    } = useForm<CreateCollectionFormValues>({
        resolver: zodResolver(createCollectionSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: ""
        }
    })

    const handleFormSubmit = async (data: CreateCollectionFormValues) => {
        try {
            await api.post('/kyper/collections/create', data);
            await onSubmit(data);

            toast.success({
                title: "Collection created",
                description: `Successfully created collection "${data.name}"`,
                duration: 5000
            });

            handleClose();
        } catch (error: any) {
            console.error("Failed to create collection:", error);

            // Show error toast
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'An unexpected error occurred';

            toast.error({
                title: "Failed to create collection",
                description: errorMessage,
                duration: 8000
            });

            // Check for duplicate slug error
            if (error.response?.status === 409) {
                toast.warning({
                    title: "Duplicate slug detected",
                    description: "Please modify the slug to create this collection",
                    duration: 6000
                });
            }
        }
    }

    const name = watch("name")
    useEffect(() => {
        if (name) {
            setValue(
                "slug",
                slugify(name, {
                    lower: true,
                    strict: true,
                    trim: true
                })
            )
        }
    }, [name, setValue])

    const handleClose = () => {
        reset();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="md"
            position="center"
        >
            <Modal.Header
                heading="Create New Collection"
                subheading="Add a new content collection to your CMS"
                onClose={handleClose}
            />

            <Modal.Body>
                <Form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                    <FormField
                        label="Name"
                        error={errors.name?.message}
                        required
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="e.g., Blog Posts"
                                    disabled={isSubmitting}
                                />
                            )}
                        />
                    </FormField>

                    <FormField
                        label="Slug"
                        error={errors.slug?.message}
                        description="URL-friendly identifier (automatically generated)"
                        required
                    >
                        <Controller
                            name="slug"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    placeholder="blog-posts"
                                    disabled={isSubmitting}
                                />
                            )}
                        />
                    </FormField>

                    <FormField
                        label="Description"
                        error={errors.description?.message}
                        optional
                    >
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextArea
                                    {...field}
                                    placeholder="Describe what this collection will contain..."
                                    disabled={isSubmitting}
                                    rows={4}
                                />
                            )}
                        />
                    </FormField>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="ghost"
                    onClick={handleClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    variant="solid"
                    color="primary"
                    onClick={handleSubmit(handleFormSubmit)}
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    loadingText="Creating..."
                    spinnerType="spinner"
                    type="submit"
                >
                    Create Collection
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

CreateCollectionModal.displayName = "CreateCollectionModal"