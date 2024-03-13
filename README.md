# 꾸준히 한 곳에서의 연속적인 투표, 꾸깃

<img width="374" alt="스크린샷 2024-03-13 오후 10 16 56" src="https://github.com/GAEGURINLAP/ggugitt/assets/72309817/2ee3ed06-027f-4bdf-a40b-fbc231048be7">

# 👩‍💻 멤버

@Geagurinlap

| 🐶 병스커          | 🐸 개구린맨 |
| ------------------ | ----------- |
| Frontend & Backend | Design      |

<br>

## 왜 필요한가?

카카오톡의 투표 기능은 아무래도 목적이 약속을 정하기와 같이 단발성 투표에 있기 때문에, 데이터를 취합하는데는 적합하지 않다는 아쉬움이 있었습니다. 아마추어 스포츠 팀에서는, **투표한 데이터로 DB를 형성하고 싶은 니즈**가 있습니다. 이 데이터를 이용하여 월간, 연간, n년간의 통계를 만들어 팀원들의 동기 부여 및 역량 증진에 사용하고자 하는 목표가 있기 때문입니다.

<br>

## 어떤 기능이 들어가는가?

주요 기능은 다음과 같습니다.

- [투표 등록하기](#1-투표-등록하기)
- [투표하기](#2-투표하기)
  - 투표 링크 보내기(카카오톡 공유)
- [투표 히스토리 보기](#3-투표-히스토리)
  - 진행중인 투표 현황 보기
  - 종료된 투표 결과 보기
- [투표 결과보기](#4-투표-결과보기)

이 서비스의 방향성은 **_투표 등록자는 조금 불편하게, 투표자는 간편하게_** 입니다. 아마추어 스포츠 팀의 운영진 입장에서는 속상하게도, 카카오톡 투표하기로 받는 투표조차 응답을 제 때 받기 쉽지 않다는 페인 포인트가 있었습니다. 때문에 마치 구글폼 응답을 받는 것처럼, 투표자들은 공유받은 링크를 열어 **'단순히 투표만'** 하면 되도록 방향성을 잡고 기능을 만들 예정입니다.

<br>

### 1. 투표 등록하기

![투표등록_2](https://github.com/GAEGURINLAP/ggugitt/assets/72309817/6003f65d-4d67-478a-838e-6c7b714ab7c6)

<br>

### 2. 투표하기

- 투표 링크 보내기(카카오톡 공유)
- 투표하기

<img src="https://github.com/GAEGURINLAP/ggugitt/assets/72309817/be9d7f33-fe8c-4a34-9e0b-7ec6278d4503" height="640px" />

<br>

### 3. 투표 히스토리

- 진행중인 투표 현황 보기
- 종료된 투표 결과 보기

![투표_히스토리](https://github.com/GAEGURINLAP/ggugitt/assets/72309817/fdcf71d9-cb5f-4db8-bdf1-dcfbff2a3fee)

<br>

### 4. 투표 결과보기

<img src="https://github.com/GAEGURINLAP/ggugitt/assets/72309817/78c99c72-bec3-4350-8ca8-9aac317a11f4" height="640px" />

<br>

## 어떤 기술을 사용했는가?

<br>

<div>

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Vite-AA4EFE?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/emotion-C43BAD?style=for-the-badge&logo=emotion&logoColor=white">
<img src="https://img.shields.io/badge/firebase-049BE5?style=for-the-badge&logo=firebase&logoColor=FFCC31">
</div>

<br>
    
- **React**: 그동안 현업에서 Vue를 사용해왔기 때문에, React로 실 서비스를 만들어보고 싶은 동기로 채택하게 되었습니다.
- **TypeScript**: 미리 타입을 지정하여 명시적으로 사용할 수 있다는 점, 자동완성의 편리성, 그리고 무엇보다 컴파일에서 미리 에러를 감지할 수 있다는 점에서 JS보다 TS를 사용하게 되었습니다.
- **Vite**: 현업에서 사용하고 있는 Vite로부터 실제로 Dev Server의 구동 속도, 빌드에서 훌륭한 퍼포먼스를 체감하였기 때문에 React + Vite 조합으로 프로젝트를 생성하기로 결정했습니다.
- **react-hook-form**: 공부할 때도 느꼈지만 React에서 Form의 에러를 비롯하여 다양한 케이스를 직접 State로 관리한다는 것은 너무 비용이 많이 드는 일이었기 때문에 react-hook-form을 선택하였습니다.
- **Emotion**: 그동안 스타일은 css와 scss로만 만들었었는데, CSS-in-JS 프레임워크로 재사용이 가능한 컴포넌트로 만들어 사용한다는 점에 매료되어 Emotion을 선택하였습니다.
- **Firebase**: Firebase를 알게되었기 때문에 혼자서 프로젝트를 시작할 용기를 얻게 되었습니다. Firebase는 Authentication(인증), Firestore(데이터베이스), FCN(푸시 알람) 등의 기능을 제공하기 때문에 백엔드에 대한 지식이 없이도 데이터를 설계하고 CRUD를 손쉽게 해낼 수 있으며, 로그인과 푸시 알람까지 해결할 수 있습니다. 앞으로도 Firebase를 적극 사용할 것이지만, 다음 프로젝트에서는 Firebase와 비견되고 있는 Supabase를 사용해 볼 예정입니다.

<br>

## 어떤 과정을 겪었었는가?

개발하면서 겪은 고민들과 트러블 슈팅에 대해서 개인 블로그와 디스콰이엇에 일지를 작성하고 있습니다.

- [프로젝트 시작 과정](https://velog.io/@byungsker/MOM-%ED%88%AC%ED%91%9C-%EC%84%9C%EB%B9%84%EC%8A%A4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91)
- [개발 시작](https://velog.io/@byungsker/MOM-%ED%88%AC%ED%91%9C-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B0%9C%EB%B0%9C%EC%9D%98-%EC%8B%9C%EC%9E%91)
- [데이터 설계 우여곡절기](https://velog.io/@byungsker/MOM-%ED%88%AC%ED%91%9C-%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%84%A4%EA%B3%84)

<br/>

## Contact

**인스타그램 |** [@ggu_gitt](https://www.instagram.com/ggu_gitt)

**디스콰이엇 |** https://disquiet.io/@extreme0728
