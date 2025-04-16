import React from 'react'
import { CollectionListPage } from './CollectionListPage';

type Props = {
    segments: string[];
}

export default function CollectionsPage({ segments }: Props) {
    if (segments[1]) {
        return <div>Collection: {segments[1]}</div>
    } else {
        return <CollectionListPage/>
    }
}
