interface GreetingProps {
  message: string;
}

export function Greeting({ message }: GreetingProps) {
  return (
    <h1
      className="flex flex-row justify-center mt-20 text-3xl"
    >
      {message}
    </h1>
  );
}
