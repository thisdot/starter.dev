import { A } from "solid-start";
import { createEffect, createSignal,  For, Match, Switch } from 'solid-js'
import { createQuery } from '@tanstack/solid-query';


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
      <div>
      <Switch>
        <Match when={query.isLoading}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {'Error'}</p>
        </Match>
        <Match when={query.isSuccess}>
          <For each={data()}>
            {(todo) => <p class="p-3 bg-slate-800 text-white mt-6 w-[50%] mx-auto">{todo.body}</p>}
          </For>
          <div class="flex items-center justify-center p-3 gap-3">
            <button onClick={() => setPostId(postId() - 1)} class="mr-2">Prev</button>
            <button onClick={() => setPostId(postId() + 1)} class="">Next</button>
          </div>
        </Match>
      </Switch>
    </div>
    </>
  )
}
