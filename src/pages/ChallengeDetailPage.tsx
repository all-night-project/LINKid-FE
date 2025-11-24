import { useParams, useSearchParams } from "react-router-dom";
import ChallengeProgressView from "../components/challengeDetail/ChallengeProgressView";
import ChallengeCompletedView from "../components/challengeDetail/ChallengeCompletedView";

const ChallengeDetailPage = () => {
    const { id } = useParams();
    const [params] = useSearchParams();
    const status = params.get("status") ?? "active";

    const isCompleted = status === "completed";

    return (
        <>
            {isCompleted ? (
                <ChallengeCompletedView challengeId={id} />
            ) : (
                <ChallengeProgressView challengeId={id} />
            )}
        </>
    );
};

export default ChallengeDetailPage;