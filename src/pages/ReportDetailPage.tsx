import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useReport } from "../api/useReport";
import ReportStep1 from "../components/report/ReportStep1";
import ReportStep2 from "../components/report/ReportStep2";
import ReportStep3 from "../components/report/ReportStep3";
import ReportStep4 from "../components/report/ReportStep4";
import ReportStep5 from "../components/report/ReportStep5";

const ReportDetailPage = () => {
    const { reportId } = useParams<{ reportId: string }>();

    if (!reportId) return <Message>잘못된 접근입니다.</Message>;

    const { report, loading } = useReport(reportId);

    // 현재 활성 탭
    const [activeTab, setActiveTab] = useState<"highlight" | "detail" | "coaching">(
        "highlight"
    );

    const isProgrammaticScrollRef = useRef(false);

    // 섹션 refs
    const section2Ref = useRef<HTMLDivElement>(null);
    const section3Ref = useRef<HTMLDivElement>(null);
    const section4Ref = useRef<HTMLDivElement>(null);

    // 스크롤 이동
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const tabs = [
        { key: "highlight", label: "하이라이트", ref: section2Ref },
        { key: "detail", label: "상세 분석", ref: section3Ref },
        { key: "coaching", label: "코칭", ref: section4Ref },
    ] as const;

    useEffect(() => {
        if (loading || !report) return;

        const initTimer = setTimeout(() => {
            if (!section2Ref.current || !section3Ref.current || !section4Ref.current) {
                return;
            }

            const findScrollableParent = (element: HTMLElement): HTMLElement | null => {
                let parent = element.parentElement;
                while (parent) {
                    const overflow = window.getComputedStyle(parent).overflow;
                    const overflowY = window.getComputedStyle(parent).overflowY;

                    if (overflow === 'auto' || overflow === 'scroll' ||
                        overflowY === 'auto' || overflowY === 'scroll') {
                        console.log('📦 스크롤 가능한 부모 찾음:', parent);
                        return parent;
                    }
                    parent = parent.parentElement;
                }
                return null;
            };

            const scrollContainer = findScrollableParent(section2Ref.current);
            console.log('🎯 스크롤 컨테이너:', scrollContainer);

            const checkActiveSection = () => {
                if (isProgrammaticScrollRef.current) {
                    console.log('⏭️ 프로그래밍 스크롤 중');
                    return;
                }

                // ⭐ 탭 높이를 정확히 가져오기
                const tabHeight = document.querySelector('[data-tab-container]')?.clientHeight || 70;

                const scrollPosition = scrollContainer
                    ? scrollContainer.scrollTop + tabHeight + 180  // 탭 높이 + 여유 10px
                    : window.scrollY + tabHeight + 180;

                const section2Top = section2Ref.current!.offsetTop;
                const section3Top = section3Ref.current!.offsetTop;
                const section4Top = section4Ref.current!.offsetTop;

                console.log('📜', { scrollPosition, section2Top, section3Top, section4Top });

                // ⭐ 각 조건 체크 로그 추가
                if (scrollPosition >= section4Top) {
                    console.log('✅ coaching 활성화 (scrollPosition >= section4Top)');
                    setActiveTab("coaching");
                } else if (scrollPosition >= section3Top) {
                    console.log('✅ detail 활성화 (scrollPosition >= section3Top)');
                    setActiveTab("detail");
                } else if (scrollPosition >= section2Top) {
                    console.log('✅ highlight 활성화 (scrollPosition >= section2Top)');
                    setActiveTab("highlight");
                } else {
                    console.log('⚠️ 어떤 조건도 만족하지 않음');
                }
            };

            let scrollTimer: NodeJS.Timeout;
            const handleScroll = () => {
                console.log('🔥 스크롤 발생!');
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(() => {
                    checkActiveSection();
                }, 50);
            };

            // 초기 실행
            checkActiveSection();

            const target = scrollContainer || window;
            target.addEventListener('scroll', handleScroll as any);
            console.log('👂 리스너 등록 완료:', target === window ? 'window' : 'scrollContainer');

            return () => {
                clearTimeout(scrollTimer);
                target.removeEventListener('scroll', handleScroll as any);
            };
        }, 300);

        return () => clearTimeout(initTimer);
    }, [loading, report]);


    if (loading) return <Message>로딩 중…</Message>;
    if (!report) return <Message>리포트가 없습니다.</Message>;

    return (
        <Wrapper>
            <Section>
                <ReportStep1 dashboard={report.dashboard} />
            </Section>

            <TabContainer data-tab-container>
                {tabs.map((t) => (
                    <TabButton
                        key={t.key}
                        $active={activeTab === t.key}
                        onClick={() => {
                            // ✅ 1. 클릭 시 activeTab 즉시 변경
                            setActiveTab(t.key);

                            // ✅ 2. 프로그래밍 스크롤 시작 플래그 설정
                            isProgrammaticScrollRef.current = true;

                            // 3. 스크롤 실행
                            scrollToSection(t.ref);

                            // ✅ 4. 부드러운 스크롤이 끝날 것으로 예상되는 시간(700ms) 후에 플래그 해제
                            // 이렇게 해야 Intersection Observer가 다시 사용자 스크롤을 감지할 수 있습니다.
                            setTimeout(() => {
                                isProgrammaticScrollRef.current = false;
                            }, 1000);
                        }}
                    >
                        {t.label}
                    </TabButton>
                ))}
            </TabContainer>


            <ContentContainer>
                <Section ref={section2Ref} data-section="highlight">
                    <ReportStep2 keyMoments={report.content.keyMoments} />
                </Section>
                <Section ref={section3Ref} data-section="detail">
                    <ReportStep3 styleAnalysis={report.content.styleAnalysis} />
                </Section>
                <Section ref={section4Ref} data-section="coaching">
                    <ReportStep4 coaching={report.content.coaching} />
                </Section>
                <Section>
                    <ReportStep5 growthReport={report.content.growthReport} />
                </Section>
            </ContentContainer>
        </Wrapper>
    );
};

export default ReportDetailPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TabContainer = styled.div`
    position: sticky;
    top: -10px;
    background: white;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    padding: 4px 5px;
    border-radius: 15px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
`;

const TabButton = styled.button<{ $active: boolean }>`
    width: 33%;
    padding: 10px 0;
    border: none;
    border-radius: 15px;
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;

    background-color: ${({ $active, theme }) =>
        $active ? theme.colors.primary[500] : "white"};

    color: ${({ $active, theme }) =>
        $active ? "#fff" : theme.colors.textSecondary};

    &:active {
        background: #e5e5e5;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Section = styled.div`
    min-height: 200px;
    margin-bottom: 20px;
    scroll-margin-top: 70px;
`;

const Message = styled.p`
    margin-top: 60px;
    text-align: center;
`;