export default function Toast({ message, visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 px-5 py-3 bg-[#111] text-[#F5F4EF] text-sm rounded-sm shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <span className="text-green-400">&#10003;</span>
      {message}
    </div>
  );
}
