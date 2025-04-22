'use client';

// import EmblaCarousel from 'embla-carousel';
// import styles from './page.module.scss';
import PopularCarousel from '@/components/Carousel/PopularCarousel/PopularCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import Card from '@/components/Card/Card';
import { Tab } from '@/components/Tab/Tab';
import FloatButton from '@/components/FloatButton/FloatButton';
export default function Home() {
    const OPTIONS: EmblaOptionsType = {
        // 필요한 Embla 옵션들을 정의
    };
    const fakePosts = [
        {
            id: 1,
            header: '프론트엔드 개발자 구합니다',
            body: '안녕하세요! 저희 팀에 프론트엔드 개발자를 찾고 있어요.',
            footer: '❤️ 9',
            likes: 9,
        },
        {
            id: 2,
            header: '디자이너와 협업하실 분?',
            body: '웹디자인 가능하신 분과 콜라보 원해요!',
            footer: '❤️ 5',
            likes: 5,
        },
        {
            id: 3,
            header: '백엔드 개발자 모집',
            body: 'Node.js 또는 Django 가능하신 분 구합니다.',
            footer: '❤️ 17',
            likes: 17,
        },
        {
            id: 4,
            header: '같이 스터디하실 분!',
            body: '리액트 스터디 함께 해요~',
            footer: '❤️ 21',
            likes: 21,
        },
        {
            id: 5,
            header: '포트폴리오 팀원 모집',
            body: '포폴용 프로젝트 같이 해요!',
            footer: '❤️ 2',
            likes: 2,
        },
    ];
    const popularPosts = [...fakePosts].sort((a, b) => b.likes - a.likes).slice(0, 5); //나중에는 SbProject에서
    // const { data, error } =
    // await supabase.from('project').select('*').order('likes', { ascending: false }).limit(5); 근데 project랑 introduction 다 가져와서 해야됨;
    const cardsArray = popularPosts.map((post) => (
        <Card key={post.id} header={post.header} body={post.body} footer={post.footer} />
    ));
    return (
        <div>
            <PopularCarousel slides={cardsArray} options={OPTIONS} />
            <Tab />
            <FloatButton />
        </div>
    );
}
