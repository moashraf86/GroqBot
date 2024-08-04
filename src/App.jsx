import { ChatRoom } from "./components/ChatRoom";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen">
        <ChatRoom />
      </div>
    </ThemeProvider>
  );
}

export default App;
