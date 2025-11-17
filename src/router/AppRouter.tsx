import { createBrowserRouter } from "react-router-dom";
import PlainLayout from "../components/layout/PlainLayout";
import Layout from "../components/layout/Layout";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashboardPage from "../pages/DashboardPage";
import GuidePage from "../pages/GuidePage";
import VideoUploadPage from "../pages/VideoUploadPage";
import AnalysisPage from "../pages/AnalysisPage";
import ReportStepPage from "../pages/ReportStepPage";
import ReportDetailPage from "../pages/ReportDetailPage";

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
    {
        element: <PlainLayout />,
        children: [
            { path: "/", element: <LoginPage /> },
            { path: "/signup", element: <SignupPage /> },
        ],
    },
    {
        element: <Layout />,
        children: [
            { path: "/dashboard", element: <DashboardPage /> },
            { path: "/guide", element: <GuidePage /> },
            { path: "/upload", element: <VideoUploadPage /> },
            { path: "/analysis", element: <AnalysisPage analysisId="analyzeId" /> },
            { path: "/report/:reportId/step/:step", element: <ReportStepPage /> },
            { path: "/report/:reportId", element: <ReportDetailPage /> },
        ],
    },
]);