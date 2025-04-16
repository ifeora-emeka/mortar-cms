import React from 'react'
import { useRouter } from 'next/navigation'
import { CollectionListPage } from './collection-list/CollectionListPage'
import { NotFoundPlaceholder } from '../components/placeholders/NotFoundPlaceholder'
import { Layout } from '../components/layout'

type Props = {
    segments: string[];
}
export default function RootPage({ segments }: Props) {
    const module = segments[0];
    const router = useRouter();

    const handleGoBack = () => {
        window.history.back();
    };

    const handleGoHome = () => {
        router.push('/');
    };

    const renderModule = () => {
        switch (module) {
            case 'collections':
                return <CollectionListPage />;
            default:
                return (
                    <NotFoundPlaceholder 
                        title="Page Not Found"
                        message={`The page "${module}" doesn't exist or hasn't been implemented yet.`}
                        onGoBack={handleGoBack}
                        onGoHome={handleGoHome}
                        color="primary"
                    />
                );
        }
    }

    return (
        <>
            {renderModule()}
        </>
    )
}
