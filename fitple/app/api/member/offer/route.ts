import { OfferCreateDto } from "@/back/offer/application/usecases/dto/OfferCreateDto";
import { OfferCreateUsecase } from "@/back/offer/application/usecases/OfferCreateUsecase";
import { SbOfferRepository } from "@/back/offer/infra/repositories/supabase/SbOfferRepository";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const { userId, projectId, introductionId, message, status, createdAt } = body;
      if (!userId || !projectId || !message) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
        });
      }
  
      const dto = new OfferCreateDto( userId, projectId, introductionId, message, status, createdAt);
      const repository = new SbOfferRepository();
      const usecase = new OfferCreateUsecase(repository);
      const result = await usecase.execute(dto);
  
      return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
      if (error instanceof Error) {
          console.error('POST /api/member/offer Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
      return new Response(JSON.stringify({ error: 'Unknown server error' }), { status: 500 });
    }
  }

  export async function PUT(request: NextRequest) {
    try {
      const { offerId, status } = await request.json();
  
      // 상태가 유효한지 확인
      if (!['waiting', 'accept', 'reject'].includes(status)) {
        return new Response(JSON.stringify({ error: "Invalid status" }), { status: 400 });
      }
  
      const repository = new SbOfferRepository();
      await repository.updateStatus(offerId, status);
  
      return new Response(JSON.stringify({ message: "Status updated successfully" }), { status: 200 });
    } catch (error) {
      if (error instanceof Error) {
          console.error('PUT /api/member/offer Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
      return new Response(JSON.stringify({ error: 'Unknown server error' }), { status: 500 });
    }
  }