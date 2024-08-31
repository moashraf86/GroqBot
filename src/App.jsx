import { ChatRoom } from "./components/ChatRoom";
import { Header } from "./components/Header";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <ChatRoom />
    </ThemeProvider>
  );
}

export default App;
