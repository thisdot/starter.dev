import { json, LoaderFunction, useLoaderData } from 'remix';
import { Counter } from '~/components/Counter';
import { Greeting } from '~/components/Greeting';
import gqlClient from '~/lib/graphql-client';
import { GREETING_QUERY } from '~/lib/queries/greeting';

type LoaderData = {
  data: {
    hello: string;
  };
};

export const loader: LoaderFunction = async () => {
  const data = await gqlClient.request(GREETING_QUERY, {
    greeting: 'from This Dot Labs!',
  });
  return json<LoaderData>({ data });
};

export default function HomePage() {
  const { data } = useLoaderData<LoaderData>();
  return (
    <>
      <Greeting message={data.hello} />
      <Counter />
    </>
  );
}
