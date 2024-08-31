import { ThemeToggler } from "./ThemeToggler";
export const Header = () => {
  return (
    <header className="py-4">
      <div className="container flex items-center justify-between">
        <h1 className="text-2xl font-medium">GroqBot</h1>
        <div className="flex items-center gap-2">
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};
