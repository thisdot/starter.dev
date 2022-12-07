import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <div className="flex justify-center">
        <a href="https://www.netlify.com">
          <img
            src="https://www.netlify.com/v3/img/components/netlify-light.svg"
            alt="Deploys by Netlify"
          />
        </a>
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
