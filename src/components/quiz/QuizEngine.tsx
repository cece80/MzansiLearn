"use client";

// src/components/quiz/QuizEngine.tsx
// Interactive quiz engine with MCQ and instant feedback
// Closes #6

import React, { useState, useCallback } from "react";
import { QuestionCard, QuizQuestion } from "./QuestionCard";

export interface QuizData {
  id: string;
  title: string;
  subjectId: string;
  grade: number;
  questions: QuizQuestion[];
}

interface QuizEngineProps {
  quiz: QuizData;
  onComplete?: (score: number, total: number) => void;
}

export function QuizEngine({ quiz, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, string>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions] = useState(() => shuffleArray([...quiz.questions]));

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;
  const answeredCount = answers.size;

  const handleAnswer = useCallback((questionIndex: number, choiceId: string) => {
    setAnswers(prev => {
      const next = new Map(prev);
      next.set(questionIndex, choiceId);
      return next;
    });
  }, []);

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    const score = calculateScore();
    onComplete?.(score, totalQuestions);
  };

  const handleRetry = () => {
    setAnswers(new Map());
    setCurrentIndex(0);
    setShowResults(false);
  };

  const calculateScore = (): number => {
    let correct = 0;
    for (const [idx, choiceId] of answers) {
      const q = shuffledQuestions[idx];
      const choice = q.choices.find(c => c.id === choiceId);
      if (choice?.correct) correct++;
    }
    return correct;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    const level = percentage >= 80 ? "7" : percentage >= 70 ? "6" : percentage >= 60 ? "5" :
                  percentage >= 50 ? "4" : percentage >= 40 ? "3" : percentage >= 30 ? "2" : "1";

    return (
      <div className="max-w-lg mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className={"text-6xl font-bold " + (percentage >= 40 ? "text-emerald-400" : "text-red-400")}>
            {percentage}%
          </div>
          <h2 className="text-xl font-semibold text-white">{quiz.title} - Results</h2>
          <p className="text-gray-400">
            {score} of {totalQuestions} correct - CAPS Level {level}
          </p>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className={"h-full rounded-full transition-all duration-1000 " + (percentage >= 40 ? "bg-emerald-500" : "bg-red-500")}
              style={{ width: percentage + "%" }}
            />
          </div>
        </div>

        {/* Review answers */}
        <div className="space-y-3">
          {shuffledQuestions.map((q, i) => {
            const userChoice = answers.get(i);
            const selected = q.choices.find(c => c.id === userChoice);
            const isCorrect = selected?.correct ?? false;
            return (
              <div key={i} className={"p-3 rounded-lg border " + (isCorrect ? "border-emerald-700 bg-emerald-900/20" : "border-red-700 bg-red-900/20")}>
                <p className="text-sm text-gray-300 font-medium">{i + 1}. {q.question}</p>
                <p className={"text-xs mt-1 " + (isCorrect ? "text-emerald-400" : "text-red-400")}>
                  {isCorrect ? "Correct" : "Incorrect - Answer: " + (q.choices.find(c => c.correct)?.text ?? "")}
                </p>
              </div>
            );
          })}
        </div>

        <button onClick={handleRetry} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors cursor-pointer">
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{quiz.title}</h2>
        <span className="text-sm text-gray-400">{answeredCount}/{totalQuestions}</span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 flex-wrap">
        {shuffledQuestions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={"w-3 h-3 rounded-full transition-colors cursor-pointer " +
              (i === currentIndex ? "bg-emerald-500 ring-2 ring-emerald-500/30" :
               answers.has(i) ? "bg-emerald-700" : "bg-gray-700")}
          />
        ))}
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentIndex}
        selectedChoiceId={answers.get(currentIndex) ?? null}
        onSelectChoice={(choiceId) => handleAnswer(currentIndex, choiceId)}
        showFeedback={answers.has(currentIndex)}
      />

      {/* Navigation */}
      <div className="flex gap-3">
        <button onClick={handlePrev} disabled={currentIndex === 0}
          className="flex-1 py-2.5 border border-gray-700 text-gray-300 rounded-lg font-medium disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed">
          Previous
        </button>
        {currentIndex < totalQuestions - 1 ? (
          <button onClick={handleNext}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors cursor-pointer">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={answeredCount < totalQuestions}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed">
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
