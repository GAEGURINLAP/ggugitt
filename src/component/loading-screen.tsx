import styled from "@emotion/styled";

export default function LoadingScreen() {
  const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const Text = styled.span`
    color: black;
    font-size: 48px;
  `;

  return (
    <Wrapper>
      <Text>Loading...</Text>
    </Wrapper>
  );
}
