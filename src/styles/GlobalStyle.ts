import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* CSS Reset (기본 여백, 폰트, 박스 모델 초기화) */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 기본 링크 스타일 제거 */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* 리스트 초기화 */
  ul, ol {
    list-style: none;
  }

  /* 버튼, 인풋 기본 스타일 초기화 */
  button, input, textarea {
    font-family: inherit;
    font-size: inherit;
    background: none;
    border: none;
    outline: none;
  }

  button {
    cursor: pointer;
  }

  /* 이미지 기본값 */
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* root container 기본 여백 */
  #root {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default GlobalStyle;