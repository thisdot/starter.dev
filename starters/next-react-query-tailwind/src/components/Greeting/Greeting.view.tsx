type GreetingView = {
  message?: string | null;
  loading?: boolean;
};

export function GreetingView({ message, loading }: GreetingView) {
  return (
    <div className="flex w-full text-xl justify-center">
      <div className="mr-[1em]">Message:</div>
      <div className={`text-left ${loading ? 'grow animate-pulse bg-gray-200 rounded-md' : 'grow-0'}`} role="display-message">
        { message }
      </div>
    </div>
  );  
}
