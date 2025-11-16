import styled from "styled-components";
import { useState } from "react";
import UploadBox from "../../components/video/UploadBox";
import VideoSituationSelector from "../../components/video/VideoSituationSelector";
import UploadChecklist from "../../components/video/UploadChecklist";
import UploadActions from "../../components/video/UploadAction";


const VideoUploadPage = () => {
    const [isVideoUploaded, setIsVideoUploded] = useState(false);
    const [selectedSituation, setSelectedSituation] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

    const handleUploadSuccess = () => {
        setIsVideoUploded(true);
    };

    const handleAnalyzeClick = () => {
        console.log("영상 분석 시작");
        console.log("상황: ", selectedSituation);
        console.log("업로드된 파일: ", selectedVideo);
    }

    return (
        <Container>
            <UploadBox
                onVideoSelect={setSelectedVideo}
                onUploadComplete={handleUploadSuccess}
            />
            <VideoSituationSelector
                selectedSituation={selectedSituation}
                setSelectedSituation={setSelectedSituation}
            />
            <UploadChecklist />
            <UploadActions
                isVideoUploaded={isVideoUploaded}
                selectedSituation={selectedSituation}
                onAnalyzeClick={handleAnalyzeClick}
            />
        </Container>
    );
};

export default VideoUploadPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
`;