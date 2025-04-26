import { NextRequest, NextResponse } from 'next/server';
import { SbUserRepository } from '@/back/user/infra/repositories/supabase/SbUserRepository';
import { SbUserSkillRepository } from '@/back/user/infra/repositories/supabase/SbUserSkillRepository';
import { SbUserPositionRepository } from '@/back/user/infra/repositories/supabase/SbUserPositionRepository';
import { SignJWT } from 'jose';
const skillMap: { [key: string]: number } = {
    react: 1,
    javascript: 2,
    next: 3,
    django: 4,
    express: 5,
    firebase: 6,
    flutter: 7,
    go: 8,
    graphql: 9,
    kotlin: 10,
    mongodb: 11,
    mysql: 12,
    nest: 13,
    node: 14,
    php: 15,
    python: 16,
    spring: 17,
    swift: 18,
    typescript: 19,
    unity: 20,
    vue: 21,
};
const positionMap: { [key: string]: number } = {
    FE: 1,
    BE: 2,
    PM: 3,
    FS: 4,
    DI: 5,
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { name, nickname, email, career, skills, position, avatarUrl, socialClientId } = body;
        // console.log('회원가입 요청:', body);
        // if (!nickname || !email || !career || !skills || !position || !socialClientId) {
        //     return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
        // }

        const userRepository = new SbUserRepository();
        const userSkillRepository = new SbUserSkillRepository();
        const userPositionRepository = new SbUserPositionRepository();
        // 소셜 클라이언트 ID로 사용자 조회
        const existingUser = await userRepository.findById(socialClientId);
        // console.log('기존 사용자 조회:', existingUser);
        if (existingUser) {
            return NextResponse.json({ message: '이미 존재하는 사용자입니다.', user: existingUser }, { status: 200 });
        }

        // 새로운 사용자 생성
        const newUser = await userRepository.create({
            name,
            nickname,
            email,
            career,
            avatarUrl,
            socialClientId,
        });
        // console.log('새로운 사용자 생성:', newUser);
        const skillIds = skills.map((skill) => skillMap[skill] || `unknown(${skill})`);
        // 기술 스택 저장
        await userSkillRepository.create({
            userId: newUser.id,
            skillId: skillIds, // skill은 숫자 ID로 전달된다고 가정
        });
        console.log('포지션', positionMap[position]);
        const positionId: number = positionMap[position];
        // 포지션 저장
        await userPositionRepository.create({
            userId: newUser.id,
            positionId: positionId, // position은 숫자 ID로 전달된다고 가정
        });
        const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
        const tokenPayload = {
            id: newUser.id,
            email: newUser.email,
            nickname: newUser.nickname,
            avatarUrl: newUser.avatarUrl,
            position: positionId,
            career: newUser.career,
            skills: skillIds,
        }; // Adjust fields as needed
        const token = await new SignJWT(tokenPayload).setProtectedHeader({ alg: 'HS256' }).sign(secretKey);

        return NextResponse.json({ message: '회원가입 성공', user: tokenPayload, token: token }, { status: 201 });
    } catch (error) {
        console.error('회원가입 처리 중 오류 발생:', error);
        return NextResponse.json({ error: '회원가입 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
