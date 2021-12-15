interface GreetingView {
  message: string;
  onClick?: () => void;
}

export function GreetingView({ message, onClick }: GreetingView) {
  return (
    <h1
      className="text-4xl tracking-tight font-extrabold uppercase text-gray-100 sm:text-5xl md:text-6xl cursor-pointer"
      onClick={onClick}
    >
      {message}
    </h1>
  );
}
