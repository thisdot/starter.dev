import { A } from "solid-start";
import { createEffect, createSignal,  For, Match, Switch } from 'solid-js'
import { createQuery } from '@tanstack/solid-query';
import { Greeting } from "~/components/FetchExample";


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
      <h1>API Example Page</h1>
        <A
          href="/"
          class="text-blue-800 hover:text-blue-500 transition-colors delay-100 underline"
        >
          Return Home
        </A>
      <div class="my-4">
        <Greeting />
      </div>
    </>
  )
}
