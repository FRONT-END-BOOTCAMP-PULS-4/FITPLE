import { ApplyApplicantDto } from "@/back/apply/application/usecases/dto/ApplyApplicantDto";
import { OfferListDto } from "@/back/offer/application/usecases/dto/OfferListDto";
import { useEffect, useState } from "react";

export const useSentReq = () => {
    const [applys, setApplys] = useState<ApplyApplicantDto[]>([]);
    const [offers, setOffers] = useState<OfferListDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    useEffect(() => {
        const fetchApplyData = async () => {
            const authStorage = localStorage.getItem("auth-storage");
            if (!authStorage) {
                setError("로그인이 필요합니다.");
                return;
            }

            // 문자열이니까 JSON으로 파싱
            const parsed = JSON.parse(authStorage);
            const token = parsed.state.token;
            if (!token) {
                setError("토큰이 존재하지 않습니다.");
                return;
            }

            try {
                setLoading(true);
                const results = await Promise.all([
                    fetch("/api/member/apply/sent", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    fetch("/api/member/offer/sent", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);
                const [applyData, offerData] = results;
                const applys = await applyData.json();
                const offers = await offerData.json();

                setApplys(applys);
                setOffers(offers);
                if (!applyData.ok || !offerData.ok) {
                    throw new Error(`서버 오류`);
                }
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchApplyData();
    }, []);

    return { applys, offers, loading, error };
};
