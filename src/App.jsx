import { useState } from "react";
import { ChatRoom } from "./components/ChatRoom";
import { Header } from "./components/Header";
import { MessagesProvider } from "./context/MessagesProvider";
import { ModelProvider } from "./context/ModelProvider";
import { SystemPromptsProvider } from "./context/SystemPromptsProvider";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModelProvider defaultModel="llama3-70b-8192" storageKey="vite-ui-model">
        <MessagesProvider>
          <SystemPromptsProvider>
            <Header setIsGenerating={setIsGenerating} />
            <ChatRoom
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          </SystemPromptsProvider>
        </MessagesProvider>
      </ModelProvider>
    </ThemeProvider>
  );
}

export default App;
