import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import Button from "../common/Button";

interface UploadActionsProps {
    isVideoUploaded: boolean;
    selectedSituation: string | null;
    onAnalyzeClick: () => void;
}

const UploadActions = ({ isVideoUploaded, selectedSituation, onAnalyzeClick }: UploadActionsProps) => {
    const navigate = useNavigate();
    const canAnalyze = isVideoUploaded && selectedSituation;

    const handleAnalyzeClick = () => {
        onAnalyzeClick();
        navigate(ROUTES.ANALYSIS_LOADING);
    }

    return (
        <>
            {!canAnalyze ? (
                <DisabledButton variant="disabled">
                    영상 및 상황을 먼저 선택해 주세요
                </DisabledButton>
            ) : (
                <AnalyzeButton variant="primary" onClick={handleAnalyzeClick}>
                    영상 분석하기
                </AnalyzeButton>
            )}
        </>
    );
};

export default UploadActions;

const DisabledButton = styled(Button)``

const AnalyzeButton = styled(Button)``