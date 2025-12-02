import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // 1) window 스크롤 제거
        window.scrollTo(0, 0);

        // 2) Main 스크롤 제거
        const main = document.querySelector("main");
        if (main) {
            main.scrollTo({ top: 0, behavior: "auto" });
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;