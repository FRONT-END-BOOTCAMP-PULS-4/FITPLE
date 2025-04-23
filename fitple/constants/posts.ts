type ProjectPost = {
    id: number;
    nickname: string;
    userPosition: string;
    title: string;
    imgUrl: string;
    userSkill: string[];
    likes: number;
    type: "project";
};

export const projectPosts: ProjectPost[] = [
    {
        id: 1,
        nickname: "하랑이입니다",
        userPosition: "프론트엔드",
        title: "프론트엔드 개발자 구합니다zzzzzzㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
        imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food0.png",
        userSkill: ["React", "JavaScript"],
        likes: 9,
        type: "project"
    },
    {
        id: 2,
        nickname: "디자인마스터",
        userPosition: "디자이너",
        title: "디자이너와 협업하실 분? UI/UX 경험자 찾습니다!",
        imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food1.png",
        userSkill: ["kotlin"],
        likes: 5,
        type: "project"
    },
    {
        id: 3,
        nickname: "서버는내가",
        userPosition: "백엔드",
        title: "백엔드 개발자 모집 - Node.js, Django 가능하신 분",
        imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food2.png",
        userSkill: ["mongodb", "django"],
        likes: 17,
        type: "project"
    },
    {
        id: 4,
        nickname: "리액트고수될래",
        userPosition: "프론트엔드",
        title: "리액트 스터디 함께 해요! 초보자도 환영!",
        imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food2.png",
        userSkill: ["React"],
        likes: 21,
        type: "project"
    },
    {
        id: 5,
        nickname: "포폴빌더",
        userPosition: "기획자",
        title: "포트폴리오 팀원 모집! 함께 실력 키워요",
        imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food1.png",
        userSkill: ["nest"],
        likes: 2,
        type: "project"
    },
];
type IntroductionPost = {
    id: number;
    nickname: string;
    userPosition: string;
    title: string;
    imgUrl: string;
    userSkill: string[];
    likes: number;
    type: "introduction";
};

export const introductionPosts: IntroductionPost[] = [
    {
        id: 1,
        nickname: "디자인하고싶어요",
        userPosition: "디자이너",
        title: "Figma 잘 다루는 디자이너입니다. 협업 원해요!",
        imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food1.png",
        userSkill: ["spring"],
        likes: 4,
        type: "introduction"
    },
    {
        id: 2,
        nickname: "백엔드지존",
        userPosition: "백엔드",
        title: "Node.js, Supabase 경험 있어요. 같이 해요!",
        imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food2.png",
        userSkill: ["express", "node"],
        likes: 11,
        type: "introduction"
    },
    {
        id: 3,
        nickname: "개발초보입니다",
        userPosition: "프론트엔드",
        title: "리액트 공부 중인 개발자! 협업하면서 배우고 싶어요!",
        imgUrl: "https://codingapplecdn.com/wp-content/uploads/2023/01/food0.png",
        userSkill: ["React", "mysql", "python"],
        likes: 3,
        type: "introduction"
    },
];