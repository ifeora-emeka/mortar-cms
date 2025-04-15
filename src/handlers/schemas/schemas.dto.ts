
export type Schema = {
    name: string;
    slug: string;
    description?: string;
    fields: Field[];
}

export type Field = {
    label: string;
    key: string;
    info?: string;
    type: string;
    isStatic: boolean;
    placeholder?: string;
    disabled?: boolean;
    autoGenerated: boolean;
    deriveValueFrom?: string;
    validation: Validation;
}

export type Validation = {
    max?: number;
    min?: number;
    required: boolean;
    fileTypes?: string[];
    maxFileSize?: number;
    reference?: Reference;
}

export type Reference = {
    collection_id: string;
    type: 'single' | 'multiple';
}
