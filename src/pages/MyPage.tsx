import styled from "styled-components";
import { useState, useEffect } from "react";
import StarIcon from "../assets/icons/family-star.svg?react";
import EditIcon from "../assets/icons/edit.svg?react";
import EditChildModal from "../components/mypage/EditChildModal";

import type { MyPageInfoResponse } from "../types/user";
import { getMyInfo } from "../api/auth";

const MyPage = () => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [info, setInfo] = useState<MyPageInfoResponse["data"]>();

    useEffect(() => {
        const fetch = async () => {
            const data = await getMyInfo();
            setInfo(data);
        };
        fetch();
    }, []);

    if (!info) return null;

    const formatGender = (gender: string) => {
        if (!gender) return "";

        switch (gender) {
            case "MALE":
                return "남아";
            case "FEMALE":
                return "여아";
            default:
                return gender; // 예외 대비
        }
    };

    const { userName, childInfo, activitySummary } = info;

    return (
        <Wrapper>
            {/* 상단 유저 정보 */}
            <ProfileSection>
                <ProfileIcon><StarIcon /></ProfileIcon>
                <UserName>{userName}</UserName>
            </ProfileSection>

            {/* 아이 정보 */}
            <Card>
                <CardHeader>
                    <CardTitle>우리 아이 정보</CardTitle>
                    <EditIcon style={{ cursor: "pointer" }} onClick={() => setOpenEditModal(true)} />
                </CardHeader>

                <InfoRow>
                    <Label>이름</Label>
                    <Value>{childInfo.name}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>생년월일</Label>
                    <Value>{childInfo.birthdate}</Value>
                </InfoRow>

                <InfoRow>
                    <Label>성별</Label>
                    <Value>{formatGender(childInfo.gender)}</Value>
                </InfoRow>
            </Card>

            {/* 활동 요약 */}
            <SummarySection>
                <SummaryTitle>나의 활동 요약</SummaryTitle>
                <SummaryBox>
                    <SummaryCard>
                        <SummaryNumber>{activitySummary.totalReports}</SummaryNumber>
                        <SummaryLabel>생성된 리포트</SummaryLabel>
                    </SummaryCard>
                    <SummaryCard>
                        <SummaryNumber>{activitySummary.totalChallenges}</SummaryNumber>
                        <SummaryLabel>생성된 챌린지</SummaryLabel>
                    </SummaryCard>
                </SummaryBox>
            </SummarySection>
            <EditChildModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                child={childInfo}
                onSave={(updated) => {
                    console.log("저장된 값:", updated);
                    setOpenEditModal(false);
                }}
            />
        </Wrapper>
    );
};

export default MyPage;

const Wrapper = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-bottom: 40px;
`;

const ProfileIcon = styled.div`
    width: 55px;
    height: 55px;
    background: ${({ theme }) => theme.colors.primary[400]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const UserName = styled.p`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const Card = styled.div`
    width: 100%;
    background: white;
    border-radius: 15px;
    padding: 24px 23px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 40px;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;

const CardTitle = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Label = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Value = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

// SummarySection
const SummarySection = styled.div`
    width: 100%;
`;

const SummaryTitle = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    margin-left: 23px;
    margin-bottom: 20px;
`;

const SummaryBox = styled.div`
    display: flex;
    gap: 20px;
`;

const SummaryCard = styled.div`
    flex: 1;
    background: white;
    border-radius: 15px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border: 1px solid ${({ theme }) => theme.colors.primary[500]};
`;

const SummaryNumber = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const SummaryLabel = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;