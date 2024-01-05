import styled from "@emotion/styled";
import BottomButton from "../component/BottomButon";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useForm } from "react-hook-form";
import { Error } from "../style/form";
import { useState } from "react";

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
export const VoteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
export const VoteItem = styled.div`
  display: flex;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 32px;
  background-color: #ededed;
  border-radius: 100px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

export const VoteContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

interface FormInputs {
  vote_item: string;
}

export default function Vote() {
  const [voteItems, setVoteItems] = useState<string[]>([]);

  // const onRegister = async () => {
  //   // e.preventDefault();
  //   const user = auth.currentUser;
  //   try {
  //     await addDoc(collection(db, "vote"), {
  //       user_id: user?.uid,
  //       user_name: user?.displayName || "Anonymous",
  //       vote_state: "In Progress",
  //       create_at: Date.now(),
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //   }
  // };

  const onAddItem = async (data: FormInputs) => {
    const { vote_item } = data;
    const newVoteItems = [...voteItems, vote_item];
    setVoteItems(newVoteItems);
  };

  const clickAddItem = () => handleSubmit(onAddItem)();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({});

  return (
    <>
      <Wrapper>
        <Title>
          투표를 진행할 <br /> 팀원을 등록해주세요
        </Title>
        <div>
          <Form
            onSubmit={handleSubmit((data) => {
              onAddItem(data);
              reset();
            })}
          >
            <FormWrapper>
              <Input
                {...register("vote_item", {
                  required: true,
                  minLength: {
                    value: 2,
                    message: "이름은 2자 이상이어야 합니다.",
                  },
                  maxLength: {
                    value: 10,
                    message: "이름은 10자를 초과할 수 없습니다.",
                  },
                })}
                placeholder="투표 팀원 이름을 입력해주세요"
              />
              <img src="/images/icon/common/icon-x-circle.svg" width={20} />
            </FormWrapper>
          </Form>
          {errors.vote_item && <Error>{errors.vote_item.message}</Error>}
        </div>
        <VoteWrapper>
          {voteItems.map((item) => (
            <VoteItem>
              <VoteContent>
                {item}
                <img
                  src="/images/icon/common/icon-x-circle.svg"
                  width={20}
                  style={{ cursor: "pointer" }}
                />
              </VoteContent>
            </VoteItem>
          ))}
        </VoteWrapper>
      </Wrapper>
      <BottomButton onClick01={clickAddItem} />
    </>
  );
}
