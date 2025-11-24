import styled from "styled-components";
import { useState, useEffect } from "react";
import UploadIcon from "../../assets/icons/file.svg?react";

interface UploadBoxProps {
    onVideoSelect: (file: File | null) => void;
    onUploadComplete?: () => void;
}

const UploadBox = ({ onVideoSelect, onUploadComplete }: UploadBoxProps) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "uploading" | "done">("idle");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        onVideoSelect(file);
        setStatus("uploading");
        setProgress(0);

        // 🔹 progress 시뮬레이션 (실제 업로드 대신)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStatus("done");
                    return 100;
                }
                return prev + 5;
            });
        }, 200);
    };

    useEffect(() => {
        if (status === "done" && onUploadComplete) {
            onUploadComplete();
        }
    }, [status, onUploadComplete]);


    return (
        <UploadContainer>
            {status === "idle" ? (
                <UploadWrapper>
                    <UploadIcon />
                    <Title>분석할 영상을 선택해주세요</Title>
                    <Description>
                        파일을 드래그하거나 선택해주세요 <br />
                        MP4, MOV, AVI 형식, 최대 500MB
                    </Description>
                    <Label htmlFor="file-upload">파일 선택하기</Label>
                    <HiddenInput id="file-upload" type="file" accept="video/*" onChange={handleFileChange} />
                </UploadWrapper>
            ) : (
                <ProgressWrapper>
                    <ProgressHeader>
                        <ProgressText>업로드 중...</ProgressText>
                        <ProgressPercent>{progress}%</ProgressPercent>
                    </ProgressHeader>

                    <ProgressBarWrapper>
                        <ProgressBar $progress={progress} />
                    </ProgressBarWrapper>

                    <ProgressFooter>
                        {status === "uploading"
                            ? "예상 소요 시간: 3분"
                            : "영상이 성공적으로 업로드되었습니다."}
                    </ProgressFooter>
                </ProgressWrapper>
            )}
        </UploadContainer>
    );
};

export default UploadBox;

const UploadContainer = styled.div`
    width: 100%;
`
const UploadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 0;
    background-color: ${({ theme }) => theme.colors.primary[200]};
    border: 2px dashed ${({ theme }) => theme.colors.primary[500]};
    border-radius: ${({ theme }) => theme.radius.xl};
    width: 100%;
`;

const Title = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    margin-top: 20px;
`;

const Description = styled.p`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 14px;
    line-height: 1.3;
`;

const Label = styled.label`
    margin-top: 25px;
    color: ${({ theme }) => theme.colors.primary[500]};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-size: 1.6rem;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const ProgressWrapper = styled.div`
    width: 100%;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ProgressHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
`;

const ProgressText = styled.span`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const ProgressPercent = styled.span`
    font-size: 1.9rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.primary[500]};
`;

const ProgressBarWrapper = styled.div`
    width: 100%;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 8px;
    overflow: hidden;
`;

const ProgressBar = styled.div<{ $progress: number }>`
    width: ${({ $progress }) => `${$progress}%`};
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary[500]};
    border-radius: 13px;
    transition: width 0.3s ease;
`;

const ProgressFooter = styled.span`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.textPrimary};
    text-align: right;
    padding-right: 10px;
`;