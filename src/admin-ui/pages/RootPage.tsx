import React from 'react'
import { useRouter } from 'next/navigation'
import { CollectionListPage } from './collections/CollectionListPage'
import { NotFoundPlaceholder } from '../components/placeholders/NotFoundPlaceholder'
import { Layout } from '../components/layout'
import EntiresPage from './entries/EntiresPage'
import CollectionsPage from './collections/CollectionsPage'

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
                return <CollectionsPage segments={segments} />;
            case 'entries':
                return <EntiresPage />;
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
        <Layout>
            {renderModule()}
        </Layout>
    )
}
