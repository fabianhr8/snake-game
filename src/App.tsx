import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./store/index.ts";

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Container maxW="container.lg" centerContent>
          <Heading as="h1" size="xl">SNAKE GAME</Heading>
        </Container>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
