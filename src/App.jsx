import { ChatRoom } from "./components/ChatRoom";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="min-h-screen">
        <ChatRoom />
      </main>
    </ThemeProvider>
  );
}

export default App;
