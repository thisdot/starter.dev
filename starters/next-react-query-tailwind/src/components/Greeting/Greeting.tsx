import { useQuery } from "react-query";

export function Greeting() {
  const {
    data: message,
    isLoading,
    error,
  } = useQuery<string>('hello', async () => {
    return await fetch('https://api.starter.dev/hello?greeting=from This Dot Labs!').then((res) =>
      res.text()
    );
  });

  return (
    <div className="flex w-full text-xl justify-center">
      <div className="mr-[1em]">Message:</div>
      <div className={`text-left ${isLoading ? 'grow animate-pulse bg-gray-200 rounded-md' : 'grow-0'}`} role="display-message">
        { message }
      </div>
    </div>
  );  
}
