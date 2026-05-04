"use client";

// src/app/quiz/[id]/page.tsx
// Quiz page route with sample data
// Closes #6

import { QuizEngine, QuizData } from "../../../components/quiz/QuizEngine";

const SAMPLE_QUIZ: QuizData = {
  id: "math-gr10-algebra-quiz",
  title: "Algebraic Expressions Quiz",
  subjectId: "mathematics",
  grade: 10,
  questions: [
    {
      id: "q1",
      question: "Simplify: 3x + 5x - 2x",
      choices: [
        { id: "a", text: "6x", correct: true, feedback: "Correct! 3 + 5 - 2 = 6" },
        { id: "b", text: "8x", correct: false, feedback: "Remember to subtract 2x" },
        { id: "c", text: "10x", correct: false, feedback: "Check your signs" },
        { id: "d", text: "x", correct: false, feedback: "Try adding the coefficients" },
      ],
      explanation: "Combine like terms: 3x + 5x - 2x = (3 + 5 - 2)x = 6x",
    },
    {
      id: "q2",
      question: "Factorise: x^2 - 9",
      choices: [
        { id: "a", text: "(x - 3)(x + 3)", correct: true, feedback: "Correct! Difference of squares." },
        { id: "b", text: "(x - 9)(x + 1)", correct: false, feedback: "This is a difference of squares pattern." },
        { id: "c", text: "(x - 3)^2", correct: false, feedback: "Expanding this gives x^2 - 6x + 9, not x^2 - 9." },
        { id: "d", text: "x(x - 9)", correct: false, feedback: "Expanding gives x^2 - 9x, not x^2 - 9." },
      ],
    },
    {
      id: "q3",
      question: "What is the coefficient of x in 7x^2 - 3x + 4?",
      choices: [
        { id: "a", text: "7", correct: false, feedback: "7 is the coefficient of x^2." },
        { id: "b", text: "-3", correct: true, feedback: "Correct! The coefficient of x is -3." },
        { id: "c", text: "4", correct: false, feedback: "4 is the constant term." },
        { id: "d", text: "3", correct: false, feedback: "Watch the sign - it is -3x." },
      ],
    },
    {
      id: "q4",
      question: "Expand: (x + 2)(x + 5)",
      choices: [
        { id: "a", text: "x^2 + 7x + 10", correct: true, feedback: "Correct! Using FOIL method." },
        { id: "b", text: "x^2 + 10x + 7", correct: false, feedback: "Check the middle term." },
        { id: "c", text: "x^2 + 7x + 7", correct: false, feedback: "The constant is 2 * 5 = 10." },
        { id: "d", text: "2x + 10", correct: false, feedback: "You need to multiply, not add." },
      ],
    },
    {
      id: "q5",
      question: "Which expression is equivalent to 2(x + 3) - (x - 1)?",
      choices: [
        { id: "a", text: "x + 7", correct: true, feedback: "Correct! 2x + 6 - x + 1 = x + 7" },
        { id: "b", text: "x + 5", correct: false, feedback: "Remember: -(x-1) = -x + 1" },
        { id: "c", text: "3x + 7", correct: false, feedback: "Check the distribution of the minus sign." },
        { id: "d", text: "x + 4", correct: false, feedback: "Distribute both brackets carefully." },
      ],
    },
  ],
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white py-6">
      <QuizEngine
        quiz={SAMPLE_QUIZ}
        onComplete={(score, total) => console.log("Quiz complete:", score, "/", total)}
      />
    </main>
  );
}
