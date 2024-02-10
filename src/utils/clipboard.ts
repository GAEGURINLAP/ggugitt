// import Toast from "../component/Toast";

// const [isToast, setIsToast] = useState(false);

// const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

// const handleCopyClipBoard = async (text: string) => {
//   try {
//     setIsToast(true);
//     await navigator.clipboard.writeText(text);
//   } catch (err) {
//     console.log(err);
//   } finally {
//   }
// };

// useEffect(() => {
//   let timeout: NodeJS.Timeout;
//   if (isToast) {
//     timeout = setTimeout(() => {
//       setIsToast(false);
//     }, 1200);
//   }

//   return () => {
//     clearTimeout(timeout); // 컴포넌트가 unmount되거나 상태가 업데이트되면 타이머를 클리어
//   };
// }, [isToast]);

// USAGE
// onClick={() => handleCopyClipBoard(`${baseURL}/vote/${NewID}`)}

//{isToast && <Toast message={"클립보드에 복사되었습니다."} /> //
