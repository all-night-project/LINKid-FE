import styled from "styled-components";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/video/UploadBox";
import VideoSituationSelector from "../components/video/VideoSituationSelector";
import UploadChecklist from "../components/video/UploadChecklist";
import UploadActions from "../components/video/UploadAction";

import { ROUTES } from "../router/routes";
import { requestPresignedUrl, startVideoAnalysis } from "../api/video";
import { useAnalysisStore } from "../store/useAnalysisStore";

const VideoUploadPage = () => {
    const navigate = useNavigate();
    const { resetAnalysis, startAnalysis } = useAnalysisStore();

    const [selectedSituation, setSelectedSituation] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [duration, setDuration] = useState<number | null>(null);

    // 업로드 관련 상태
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "uploading" | "done">("idle");

    const handleVideoSelect = (file: File, dur: number) => {
        setSelectedVideo(file);
        setDuration(dur);
        setProgress(0);
        setStatus("idle");
    };

    const handleAnalyzeClick = async () => {
        if (!selectedVideo) return alert("영상 파일을 선택해주세요.");
        if (!selectedSituation) return alert("영상 상황을 선택해주세요.");
        if (!duration) return alert("영상 길이를 불러올 수 없습니다.");

        const mainScrollContainer = document.querySelector('main');
        if (mainScrollContainer) {
            mainScrollContainer.scrollTo({ top: 0, behavior: "smooth" });
        }

        setStatus("uploading");

        resetAnalysis();

        // 1. Presign 요청
        const fileName = `user-video-${Date.now()}.mp4`;
        const res = await requestPresignedUrl(
            fileName,
            selectedVideo.type,
            selectedSituation,
            duration
        );

        const { uploadUrl, videoId, bucketKey } = res;

        // 2. 실제 업로드
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                setProgress(percent);
            }
        };

        xhr.onload = async () => {

            if (xhr.status === 200) {
                try {
                    setProgress(100);
                    setStatus("done");

                    // 분석 시작 요청
                    await startVideoAnalysis(videoId);

                    // Store에 현재 분석 중인 Video ID 등록 (폴링 시작)
                    startAnalysis(videoId);

                    // 완료 후 분석 페이지 이동
                    navigate(ROUTES.ANALYSIS_LOADING(videoId));
                } catch (err) {
                    console.error("분석 시작 실패", err);
                    alert("영상 업로드는 성공했지만 분석을 시작할 수 없습니다.");
                }

            } else {
                alert("업로드 실패했습니다.");
            }
        };

        xhr.onerror = () => {
            console.error("XHR error:", xhr.status, xhr.responseText);
            alert("업로드 중 오류가 발생했습니다.");
        }

        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", selectedVideo.type);
        xhr.send(selectedVideo);
    };

    return (
        <Container>
            <UploadBox
                onVideoSelect={handleVideoSelect}
                progress={progress}
                status={status}
            />
            <VideoSituationSelector
                selectedSituation={selectedSituation}
                setSelectedSituation={setSelectedSituation}
            />
            <UploadChecklist />
            <UploadActions
                isVideoUploaded={!!selectedVideo}
                selectedSituation={selectedSituation}
                onAnalyzeClick={handleAnalyzeClick}
                disabled={!selectedVideo || !selectedSituation || status === "uploading"}
                uploadStatus={status}
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