import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import {
    LoginPage,
    SignupPage,
    GuidePage,
    DashboardPage,
    UploadPage,
    AnalaysisLoadingPage,
    ReportStepPage,
    ReportPage,
    ReportListPage,
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

                {/* 로그인 필요 */}
                <Route element={<ProtectedRoute />}>
                    <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                    <Route path={ROUTES.GUIDE} element={<GuidePage />} />
                    <Route path={ROUTES.UPLOAD} element={<UploadPage />} />
                    <Route path={ROUTES.ANALYSIS_LOADING} element={<AnalaysisLoadingPage />} />
                    <Route path={ROUTES.REPORT_STEP(":id")} element={<ReportStepPage />} />
                    <Route path={ROUTES.REPORT(":id")} element={<ReportPage />} />
                    <Route path={ROUTES.REPORT_LIST} element={<ReportListPage />} />
                    <Route path={ROUTES.CHALLENGE_LIST} element={<ChallengeListPage />} />
                    <Route path={ROUTES.CHALLENGE_DETAIL(":id")} element={<ChallengeDetailPage />} />
                    <Route path={ROUTES.MYPAGE} element={<MyPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;