import styled from "@emotion/styled";
import BottomButton from "../component/BottomButon";

// import { ReactComponents as IconX } from "/images/icon/common/icon-x-circle.svg";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 96px 24px 0;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  line-height: 140%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 12px;
  border: none;
  height: fit-content;
  border-bottom: 1px solid #d0d1d2;
  /* &:hover {
    border-bottom: 1px solid var(--main);
  } */
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 8px;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
`;

export default function Survey() {
  return (
    <>
      <Wrapper>
        <Title>
          투표를 진행할 <br /> 팀원을 등록해주세요
        </Title>
        <Form>
          <FormWrapper>
            <Input placeholder="투표 팀원 이름을 입력해주세요" />
            <img src="/images/icon/common/icon-x-circle.svg" width={20} />
          </FormWrapper>
        </Form>
        {/* <IconX /> */}
      </Wrapper>
      <BottomButton />
    </>
  );
}
