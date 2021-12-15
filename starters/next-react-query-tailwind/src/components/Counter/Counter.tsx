import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      className="text-white text-4xl w-96 h-48 bg-blue-500 hover:bg-blue-700 rounded-full"
      onClick={() => setCount(count + 1)}
      role="button"
    >
      Count: {count}
    </button>
  );
}
