/* eslint-disable react/prop-types */
import { Button } from "./ui/button";

export const IntroSection = ({ setSelectedQuestion }) => {
  const questions = [
    {
      id: 1,
      question: "How to declare function in JavaScript?",
      value:
        "Can you explain the different methods to declare a function in JavaScript, including examples for function declarations, function expressions, arrow functions, and function constructors?",
    },
    {
      id: 2,
      question: "Can you recommend a restaurant nearby?",
      value:
        "Could you recommend a restaurant near my location? Please provide options based on different cuisines or types of food and include details like address, phone number, and average cost if possible.",
    },
    {
      id: 3,
      question: "Best ways to manage personal finances?",
      value:
        "Can you provide tips for managing personal finances effectively? Include advice on budgeting, saving, investing, and handling debt to improve financial stability.",
    },
    {
      id: 4,
      question: "popular travel destinations for a family vacation?",
      value:
        "Can you suggest popular travel destinations for a family vacation? Include options that cater to various interests and ages, and provide details on activities, accommodations, and travel tips.",
    },
  ];

  return (
    <div className="container flex flex-col grow max-w-3xl">
      <div className="flex flex-col grow  gap-10 justify-center">
        <h1 className="grid gap-2 text-4xl font-bold text-start">
          <span className="text-accent">Hello,</span>{" "}
          <span className="text-primary/30">
            How can I help <br className="sm:hidden" /> you today?
          </span>
        </h1>
        {/* Start Questions */}
        <div className="overflow-x-auto grid grid-cols-2 gap-4 pb-2">
          {questions.map((q) => (
            <Button
              variant="outline"
              size="lg"
              key={q.id}
              value={q.question}
              className="h-auto p-4 border border-border rounded-lg justify-start text-start leading-relaxed text-wrap transition-none"
              onClick={() => setSelectedQuestion(q.value)}
            >
              {q.question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
