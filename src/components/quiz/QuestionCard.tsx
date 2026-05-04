"use client";

// src/components/quiz/QuestionCard.tsx
// Individual quiz question card with choice selection
// Closes #6

import React from "react";

export interface QuizChoice {
  id: string;
  text: string;
  correct: boolean;
  feedback?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  choices: QuizChoice[];
  explanation?: string;
}

interface QuestionCardProps {
  question: QuizQuestion;
  questionIndex: number;
  selectedChoiceId: string | null;
  onSelectChoice: (choiceId: string) => void;
  showFeedback: boolean;
}

export function QuestionCard({ question, questionIndex, selectedChoiceId, onSelectChoice, showFeedback }: QuestionCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
      <p className="text-white font-medium leading-relaxed">
        <span className="text-emerald-400 font-semibold mr-2">Q{questionIndex + 1}.</span>
        {question.question}
      </p>

      <div className="space-y-2">
        {question.choices.map((choice) => {
          const isSelected = selectedChoiceId === choice.id;
          const showCorrect = showFeedback && isSelected;

          let borderClass = "border-gray-700 hover:border-gray-600";
          let bgClass = "bg-transparent";
          if (showCorrect && choice.correct) {
            borderClass = "border-emerald-500";
            bgClass = "bg-emerald-500/10";
          } else if (showCorrect && !choice.correct) {
            borderClass = "border-red-500";
            bgClass = "bg-red-500/10";
          } else if (isSelected) {
            borderClass = "border-emerald-500";
            bgClass = "bg-emerald-500/5";
          }

          return (
            <button
              key={choice.id}
              onClick={() => onSelectChoice(choice.id)}
              className={"w-full text-left px-4 py-3 border rounded-lg transition-all cursor-pointer " + borderClass + " " + bgClass}
            >
              <span className="text-gray-200 text-sm">{choice.text}</span>
              {showCorrect && choice.feedback && (
                <p className={"text-xs mt-1 " + (choice.correct ? "text-emerald-400" : "text-red-400")}>
                  {choice.feedback}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {showFeedback && question.explanation && (
        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3">
          <p className="text-xs text-blue-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
