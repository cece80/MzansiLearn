"use client";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mb-6 text-6xl">&#128225;</div>
        <h1 className="text-3xl font-bold mb-2 text-emerald-500">
          You are Offline
        </h1>
        <p className="text-gray-400 mb-6">
          No worries! MzansiLearn works offline. Your downloaded content is
          still available.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
