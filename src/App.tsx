import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
//
import { auth } from "./firebase";
//
import { Global } from "@emotion/react";
import global from "./style/global";
import { Container, Wrapper } from "./style/layout";
//
import LoadingScreen from "./component/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <Global styles={global} />
          {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
        </Wrapper>
      </Container>
    </>
  );
}
export default App;
