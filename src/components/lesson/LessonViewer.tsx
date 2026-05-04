"use client";

// src/components/lesson/LessonViewer.tsx
// Markdown lesson viewer with LaTeX and worked examples
// Closes #5

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { WorkedExample } from "./WorkedExample";

export interface LessonContent {
  id: string;
  title: string;
  subjectId: string;
  grade: number;
  term: number;
  markdown: string;
  workedExamples: WorkedExampleData[];
}

export interface WorkedExampleData {
  id: string;
  title: string;
  steps: { label: string; content: string }[];
}

interface LessonViewerProps {
  lesson: LessonContent;
  onComplete?: () => void;
}

export function LessonViewer({ lesson, onComplete }: LessonViewerProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("lesson-scroll");
      if (!el) return;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollProgress(Math.min(Math.round(pct * 100), 100));
    };
    const el = document.getElementById("lesson-scroll");
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollProgress >= 90 && onComplete) onComplete();
  }, [scrollProgress, onComplete]);

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar */}
      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: scrollProgress + "%" }}
        />
      </div>

      {/* Lesson header */}
      <div className="px-4 py-3 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">{lesson.title}</h1>
        <p className="text-sm text-gray-400">
          Grade {lesson.grade} | Term {lesson.term}
        </p>
      </div>

      {/* Scrollable content */}
      <div
        id="lesson-scroll"
        className="flex-1 overflow-y-auto px-4 py-6 space-y-6"
      >
        {/* Markdown content with LaTeX */}
        <article className="prose prose-invert prose-emerald max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-emerald-400 prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {lesson.markdown}
          </ReactMarkdown>
        </article>

        {/* Worked examples */}
        {lesson.workedExamples.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Worked Examples
            </h2>
            {lesson.workedExamples.map((ex) => (
              <WorkedExample key={ex.id} example={ex} />
            ))}
          </section>
        )}

        {/* Completion marker */}
        <div className="text-center py-8 border-t border-gray-800">
          <button
            onClick={onComplete}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
          >
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
}
