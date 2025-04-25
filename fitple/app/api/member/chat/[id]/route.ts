import { NextRequest, NextResponse } from 'next/server';
import { ChatMessageUsecase } from '@/back/team/application/usecases/ChatMessageUsecase';
import { SbChatMessageRepository } from '@/back/team/infra/repositories/supabase/SbChatMessageRepository';
import { SendMessageDto } from '@/back/team/application/usecases/dto/SendMessageDto';

const usecase = new ChatMessageUsecase(new SbChatMessageRepository());

export async function GET(request: NextRequest) {
  try {
    // 경로에서 ID 추출
    const id = Number(request.nextUrl.pathname.split('/').pop());

    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 팀 ID입니다.' },
        { status: 400 }
      );
    }

    const messages = await usecase.getMessages(id);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: '채팅 메시지 조회 실패', detail: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const id = Number(request.nextUrl.pathname.split('/').pop());

    if (isNaN(id)) {
      return NextResponse.json(
        { error: '유효하지 않은 팀 ID입니다.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { user_id, message } = body;

    if (!user_id || !message) {
      return NextResponse.json(
        { error: 'user_id와 message는 필수입니다.' },
        { status: 400 }
      );
    }

    const dto = new SendMessageDto(id, user_id, message);
    await usecase.sendMessage(dto);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: '채팅 메시지 전송 실패', detail: (error as Error).message },
      { status: 500 }
    );
  }
}
