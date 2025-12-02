import styled from "styled-components";
import Button from "../common/Button";

interface UploadActionsProps {
    isVideoUploaded: boolean;
    selectedSituation: string | null;
    onAnalyzeClick: () => void;
    disabled?: boolean;
    uploadStatus: "idle" | "uploading" | "done";
}

const UploadActions = ({
    isVideoUploaded,
    selectedSituation,
    onAnalyzeClick,
    disabled = false,
    uploadStatus
}: UploadActionsProps) => {
    const canAnalyze = isVideoUploaded && selectedSituation && !disabled;

    if (uploadStatus === "uploading") {
        return (
            <Button variant="disabled">
                업로드 중입니다...
            </Button>
        );
    }

    return (
        <>
            {!canAnalyze ? (
                <DisabledButton variant="disabled">
                    영상 및 상황을 먼저 선택해 주세요
                </DisabledButton>
            ) : (
                <AnalyzeButton variant="primary" onClick={onAnalyzeClick}>
                    영상 분석하기
                </AnalyzeButton>
            )}
        </>
    );
};

export default UploadActions;

const DisabledButton = styled(Button)``

const AnalyzeButton = styled(Button)``