import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import ChallengeProgressView from "../components/challengeDetail/ChallengeProgressView";
import ChallengeCompletedView from "../components/challengeDetail/ChallengeCompletedView";

import { getChallengeDetail } from "../api/challenge";
import type { ChallengeDetail } from "../types/challenge";

const ChallengeDetailPage = () => {
    const { challengeId } = useParams<{ challengeId: string }>();
    const location = useLocation();
    const status = location.state?.status ?? "ACTIVE";

    const [detail, setDetail] = useState<ChallengeDetail | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDetail = async () => {
        if (!challengeId) return;

        try {
            const res = await getChallengeDetail(Number(challengeId));
            setDetail(res);
        } catch (err) {
            console.error("챌린지 상세 조회 실패", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchDetail();
    }, [challengeId]);

    console.log(detail);

    if (loading) return <Center>불러오는 중...</Center>;
    if (!detail) return <Center>챌린지 정보를 찾을 수 없습니다.</Center>;

    const isCompleted = status === "COMPLETED";

    return (
        <>
            {isCompleted ? (
                <ChallengeCompletedView detail={detail} />
            ) : (
                <ChallengeProgressView detail={detail} onRefresh={fetchDetail} />
            )}
        </>
    );
};

export default ChallengeDetailPage;

const Center = styled.div`
    padding: 40px;
    text-align: center;
`;