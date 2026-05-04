"use client";

// src/components/lesson/WorkedExample.tsx
// Expand/collapse step-by-step worked examples
// Closes #5

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface WorkedExampleProps {
  example: {
    id: string;
    title: string;
    steps: { label: string; content: string }[];
  };
}

export function WorkedExample({ example }: WorkedExampleProps) {
  const [expanded, setExpanded] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(0);

  const toggleExpand = () => {
    if (!expanded) {
      setExpanded(true);
      setVisibleSteps(1);
    } else {
      setExpanded(false);
      setVisibleSteps(0);
    }
  };

  const showNextStep = () => {
    if (visibleSteps < example.steps.length) {
      setVisibleSteps(visibleSteps + 1);
    }
  };

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden bg-gray-900/50">
      {/* Header */}
      <button
        onClick={toggleExpand}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800/50 transition-colors cursor-pointer"
      >
        <span className="font-medium text-white">{example.title}</span>
        <svg
          className={"w-5 h-5 text-gray-400 transition-transform " + (expanded ? "rotate-180" : "")}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Steps */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {example.steps.slice(0, visibleSteps).map((step, i) => (
            <div
              key={i}
              className="border-l-2 border-emerald-500 pl-4 py-2 animate-fade-in"
            >
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">
                {step.label}
              </p>
              <div className="prose prose-invert prose-sm max-w-none prose-p:text-gray-300">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {step.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {visibleSteps < example.steps.length && (
            <button
              onClick={showNextStep}
              className="text-sm text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
            >
              Show next step ({visibleSteps}/{example.steps.length})
            </button>
          )}

          {visibleSteps >= example.steps.length && (
            <p className="text-sm text-gray-500 italic">All steps shown</p>
          )}
        </div>
      )}
    </div>
  );
}
