import { ChatRoom } from "./components/ChatRoom";
import { Header } from "./components/Header";
import { ModelProvider } from "./context/ModelProvider";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModelProvider defaultModel="llama3-70b-8192" storageKey="vite-ui-model">
        <Header />
        <ChatRoom />
      </ModelProvider>
    </ThemeProvider>
  );
}

export default App;
