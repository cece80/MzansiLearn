export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-2 text-emerald-500">
          MzansiLearn
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Offline-first learning for South African high school students.
          Grade 8-12. CAPS Curriculum.
        </p>
        <div className="space-y-3">
          <button className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors">
            Start Learning
          </button>
          <p className="text-sm text-gray-500">
            Works offline. No data needed. Free forever.
          </p>
        </div>
      </div>
    </main>
  );
}
