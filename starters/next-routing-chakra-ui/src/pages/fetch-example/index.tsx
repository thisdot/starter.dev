import type { NextPage } from 'next';
import Link from 'next/link';
import { Greeting } from '../../components/Greeting';

const FetchExample: NextPage = () => {
  return (
    <div className="">
      <h1 className="">NextJS Fetching Data From API</h1>
      <Greeting />
      <div className="">
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
};

export default FetchExample;
