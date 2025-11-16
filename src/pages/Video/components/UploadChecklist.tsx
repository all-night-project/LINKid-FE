import styled from "styled-components";
import SectionCard from "../../../components/common/SectionCard";
import ErrorIcon from "../../../assets/icons/error.svg?react";
import ClockIcon from "../../../assets/icons/clock.svg?react";
import VolumeIcon from "../../../assets/icons/volume_up.svg?react";
import CheckIcon from "../../../assets/icons/check_circle.svg?react";

const WhiteIcon = styled(ClockIcon)`
  path {
    fill: white;
  }
`;

const UploadChecklist = () => {
    const list = [
        {
            icon: <WhiteIcon />,
            title: "영상 길이",
            desc: "5-10분 길이가 가장 적절해요",
        },
        {
            icon: <VolumeIcon />,
            title: "음성 품질",
            desc: "대화가 명확하게 들리는지 확인해주세요",
        },
        {
            icon: <CheckIcon />,
            title: "자연스러운 상황",
            desc: "평소와 같은 자연스러운 놀이 환경이 좋아요",
        }
    ]
    return (
        <Wrapper>
            <SectionCard
                icon={<ErrorIcon />}
                title="업로드 전 확인사항"
            >
                <List>
                    {list.map((item, idx) => (
                        <ListItem key={idx}>
                            <IconWrapper $index={idx}>{item.icon}</IconWrapper>
                            <TextGroup>
                                <ItemTitle>{item.title}</ItemTitle>
                                <ItemDesc>{item.desc}</ItemDesc>
                            </TextGroup>
                        </ListItem>
                    ))}
                </List>
            </SectionCard>
        </Wrapper>
    );
};

export default UploadChecklist;

const Wrapper = styled.div`
    width: 100%;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 15px;
`

const ListItem = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`;

const IconWrapper = styled.div<{ $index: number }>`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${({ $index }) =>
        $index === 0
            ? "#C8E6C9"
            : $index === 1
                ? "#F4C2C2"
                : "#312E81"
    };
`

const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

const ItemTitle = styled.p`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const ItemDesc = styled.p`
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
`;