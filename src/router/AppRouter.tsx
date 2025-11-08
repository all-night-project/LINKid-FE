import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import {
    LoginPage,
    SignupPage,
    GuidePage,
    DashboardPage,
    UploadPage,
    AnalysisListPage,
    AnalysisPage,
    ReportPage,
    ChallengeListPage,
    ChallengeDetailPage,
    MyPage,
} from "../pages";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 비로그인 접근 가능 */}
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
                <Route path={ROUTES.GUIDE} element={<GuidePage />} />

                {/* 로그인 필요 */}
                <Route element={<ProtectedRoute />}>
                    <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                    <Route path={ROUTES.UPLOAD} element={<UploadPage />} />
                    <Route path={ROUTES.ANALYSIS_LIST} element={<AnalysisListPage />} />
                    <Route path={ROUTES.ANALYSIS_DETAIL(":id")} element={<AnalysisPage />} />
                    <Route path={ROUTES.REPORT(":id")} element={<ReportPage />} />
                    <Route path={ROUTES.CHALLENGE_LIST} element={<ChallengeListPage />} />
                    <Route path={ROUTES.CHALLENGE_DETAIL(":id")} element={<ChallengeDetailPage />} />
                    <Route path={ROUTES.MYPAGE} element={<MyPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;