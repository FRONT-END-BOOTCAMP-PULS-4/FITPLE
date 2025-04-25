'use client';
import { Tab } from '@/components/Tab/Tab';
import FloatButton from '@/components/FloatButton/FloatButton';
import { useRootPage } from '@/hooks/useFetchPosts';
import PopularPosts from './RootComponent/PopularPosts';

export default function Home() {
    const { projects, introductions, isLoading } = useRootPage();
    return (
        <div>
            <PopularPosts projects={projects} introductions={introductions} isLoading={isLoading} />
            <Tab />
            <FloatButton />
        </div>
    );
}
