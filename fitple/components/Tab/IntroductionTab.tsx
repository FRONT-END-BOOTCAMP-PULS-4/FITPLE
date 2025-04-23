import { useRouter } from 'next/navigation';
import Badge from '../Badge/Badge';
import SkillBadge from '../Badge/SkillBadge';
import Card from '../Card/Card';
import styles from './IntroductionTab.module.scss';
import { introductionPosts } from '@/constants/posts';

type Props = {
    selectedSkills: string[];
    selectedPositions: string[];
};

export function IntroductionTab({ selectedSkills, selectedPositions }: Props) {
    const router = useRouter();
    // const filteredPosts = projects.filter((post) => {
    //     const skillMatch =
    //         selectedSkills.length === 0 ||
    //         selectedSkills.some((skill) => post.skills.map((s: { name: string }) => s.name).includes(skill));

    //     const positionMatch =
    //         selectedPositions.length === 0 ||
    //         selectedPositions.some((position) =>
    //             post.positions.map((p: { name: string }) => p.name).includes(position)
    //         );

    //     return skillMatch && positionMatch;
    // });
    //some : 하나라도 조건을 만족하면 true를 반환해
    return (
        // <div className={styles.introduction}>
        //     {filteredPosts.map((post) => (
        //         <div
        //             key={post.id}
        //             onClick={() => router.push(`board/introduction/${post.id}`)}
        //             style={{ cursor: 'pointer' }}
        //         >
        //             <Card
        //                 header={
        //                     <div>
        //                         <span>
        //                             <Badge size="md" variant="filled" backgroundColor="var(--lion-color)">
        //                                 🦁 프로필
        //                             </Badge>
        //                         </span>
        //                     </div>
        //                 }
        //                 body={
        //                     <div className={styles.cardBody}>
        //                         <div className={styles.leftBody}>
        //                             <div className={styles.userInfo}>
        //                                 <h3>{post.nickname}</h3>
        //                                 <p>{post.userPosition}</p>
        //                             </div>
        //                             <div className={styles.title}>{post.title}</div>
        //                             <div className={styles.skillList}>
        //                                 {post.userSkill.map((skill) => (
        //                                     <SkillBadge key={skill} type="icon" name={skill} />
        //                                 ))}
        //                             </div>
        //                         </div>
        //                         <div className={styles.rightBody}>
        //                             <img src={post.imgUrl} alt="이미지없음" />
        //                         </div>
        //                     </div>
        //                 }
        //                 footer={`❤️ ${post.likes}`}
        //             />
        //         </div>
        //     ))}
        // </div>
        <div></div>
    );
}
