"use client";

// src/app/lesson/[id]/page.tsx
// Lesson page route
// Closes #5

import { LessonViewer, LessonContent } from "../../../components/lesson/LessonViewer";

// Sample lesson for demonstration (will be replaced by dynamic loading)
const SAMPLE_LESSON: LessonContent = {
  id: "math-gr10-t1-algebra",
  title: "Algebraic Expressions",
  subjectId: "mathematics",
  grade: 10,
  term: 1,
  markdown: `# Algebraic Expressions

## What is an algebraic expression?

An **algebraic expression** is a mathematical phrase that contains numbers, variables, and operations.

For example: $3x^2 + 2x - 5$

## Key Concepts

### 1. Terms

A **term** is a product of numbers and variables. In $3x^2 + 2x - 5$:
- $3x^2$ is the first term (coefficient = 3, variable = $x^2$)
- $2x$ is the second term
- $-5$ is the constant term

### 2. Like Terms

**Like terms** have the same variables raised to the same powers:
- $3x^2$ and $5x^2$ are like terms
- $2x$ and $7x$ are like terms
- $3x^2$ and $2x$ are **NOT** like terms

### 3. Simplifying Expressions

To simplify, **combine like terms**:

$$3x^2 + 2x - 5 + x^2 - 3x + 1 = 4x^2 - x - 4$$

### 4. Factorisation

Common factor: $6x^2 + 3x = 3x(2x + 1)$

Difference of squares: $x^2 - 9 = (x + 3)(x - 3)$

Trinomial: $x^2 + 5x + 6 = (x + 2)(x + 3)$
`,
  workedExamples: [
    {
      id: "we-1",
      title: "Simplify: 2(x + 3) - 4(x - 1)",
      steps: [
        { label: "Step 1: Distribute", content: "$2(x + 3) - 4(x - 1) = 2x + 6 - 4x + 4$" },
        { label: "Step 2: Group like terms", content: "$(2x - 4x) + (6 + 4)$" },
        { label: "Step 3: Simplify", content: "$= -2x + 10$" },
      ],
    },
    {
      id: "we-2",
      title: "Factorise: x^2 - 7x + 12",
      steps: [
        { label: "Step 1: Identify a, b, c", content: "$a = 1$, $b = -7$, $c = 12$" },
        { label: "Step 2: Find factors of c that sum to b", content: "Factors of 12: $(1,12), (2,6), (3,4)$. We need sum = $-7$, so $(-3) + (-4) = -7$" },
        { label: "Step 3: Write factors", content: "$x^2 - 7x + 12 = (x - 3)(x - 4)$" },
      ],
    },
  ],
};

export default function LessonPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <LessonViewer
        lesson={SAMPLE_LESSON}
        onComplete={() => console.log("Lesson completed!")}
      />
    </main>
  );
}
