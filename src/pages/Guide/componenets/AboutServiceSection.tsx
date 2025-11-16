import styled from "styled-components";
import { useState } from "react";
import BookIcon from "../../../assets/icons/book.svg?react";
import GuideSection from "./GuideSection";
import AccordionItem from "../../../components/common/AccordionItem";

const AboutServiceSection = () => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggle = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

    const qaList = [
        {
            question: "Q: DPICS가 무엇인가요?",
            answer: `
                A. 전 세계 아동 심리 전문가들이 부모와 자녀가 어떻게 상호작용하는지 그 ‘패턴'을 객관적으로 분석하기 위해 사용하는 <b>‘국제 표준 평가 체계'</b>입니다.
                <br/>저희는 이 DPICS를 기반으로 “아이의 말을 얼마나 잘 공감하며 잘 들어주는지(<b>반영적 듣기</b>)”,
                “아이의 행동을 얼마나 구체적으로 칭찬하는지(<b>과정 중심 칭찬</b>)”, “행동을 얼마나 주도적으로 이끄는지(<b>직접적 지시</b>)” 등
                9가지 이상의 핵심 패턴을 자동으로 분류합니다.
                `,
        },
        {
            question: "Q: PI/NDI가 무엇인가요?",
            answer: `
                A. 복잡한 DPICS 라벨들을 한눈에 파악하실 수 있도록 요약한 ‘<b>상호작용 균형 지표</b>'입니다.</br>
                <ul>
                    <li><b>PI (Positive Index)</b>: 아이의 자율성과 긍정성을 지원하는 ‘관계 형성' 대화입니다. (예: 칭찬, 공감적 듣기, 행동 묘사)</li>
                    <li><b>NDI (Negative/Directive Index)</b>: 아이의 행동을 이끌거나 방향을 제시하는 ‘목표 지향적' 대화입니다. (예: 직접적 지시, 부정적 발화)</li>
                </ul>
                이 지수의 목표는 <b>NDI를 0으로 만드는 것이 아닙니다</b>. 훈육(NDI) 또한 양육의 필수 과정입니다. 저희는 두 지표가 건강한 ‘균형'을 이루도록 돕는 것을 목표로 합니다.
            `
        },
    ];

    return (
        <GuideSection
            icon={<BookIcon />}
            title="About Our Service"
            subtitle="DPICS 기반 상호작용 분석"
            bgColor="#312E81"
            fontColor="#fff"
        >

            <Text>
                저희는 ‘좋은 부모’, ‘나쁜 부모'를 평가하거나 점수를 매기지 않습니다. 대신,아동 심리 전문가들이 사용하는 객관적인 기준을 바탕으로 부모님의 상호작용 패턴을 분석하여 성장을 돕는 거울이 되어 드립니다.
            </Text>

            {qaList.map((qa, i) => (
                <AccordionItem
                    key={i}
                    variant="guide"
                    question={qa.question}
                    isOpen={openIndexes.includes(i)}
                    onToggle={() => toggle(i)}
                >
                    <div
                        style={{
                            color: "white",
                            fontSize: "15px",
                            lineHeight: "23px",
                        }}
                        dangerouslySetInnerHTML={{ __html: qa.answer }}
                    />
                </AccordionItem>
            ))}
        </GuideSection>
    );
};

export default AboutServiceSection;

const Text = styled.div`
    background: rgba(234, 234, 246, 0.3);
    padding: 15px;
    color: white;
    font-size: 1.4rem;
    border-radius: 10px;
    margin-top: 10px;
`;