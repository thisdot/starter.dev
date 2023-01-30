import { A } from "solid-start";
import { createEffect, createSignal,  For, Match, Switch } from 'solid-js'
import { createQuery } from '@tanstack/solid-query';
import { Greeting } from "~/components/FetchExample";
import PageHeader from "~/components/PageHeader";
import PageFooter from "~/components/PageFooter";


interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const [postId, setPostId] = createSignal(1);
const [data, setData] = createSignal<PostData[]>([]);

const fetchPost = async (value: any): Promise<PostData[]> => {
  const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + value
    ).then((res) => res.json());
  return [response];
}

export default function ApiExample () {
  const query = createQuery(() => [postId()],  () => fetchPost(postId()));

  createEffect(() => {
    if (query.isSuccess) {
      setData(query.data)
    }
  })
  return (
    <>
      <PageHeader>Solid Start Tanstack Query Fetch Data from API</PageHeader>
        <Greeting />
      <PageFooter />
    </>
  )
}
