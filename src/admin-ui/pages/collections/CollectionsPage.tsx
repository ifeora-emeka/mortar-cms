import React from 'react'
import { CollectionListPage } from './CollectionListPage';
import CollectionDetailsPage from './CollectionDetailsPage';

type Props = {
    segments: string[];
}

export default function CollectionsPage({ segments }: Props) {
    if (segments[1]) {
        return <CollectionDetailsPage />
    } else {
        return <CollectionListPage />
    }
}
