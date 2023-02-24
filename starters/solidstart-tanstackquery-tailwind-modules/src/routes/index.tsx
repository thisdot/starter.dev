import { A } from 'solid-start';

export default function Home() {
  return (
    <>
      <header class="flex justify-center items-center text-white my-5 mx-auto bg-blue-500  w-full lg:w-[75%] p-4 text-lg ">
        SolidStart - Tanstack Query - Tailwind CSS - CSS Modules Kit
      </header>
      <div class="flex flex-col gap-2 items-center text-blue-800 underline text-base">
        <A
          href="/counter"
          class="hover:text-blue-500 transition-colors delay-100"
        >
          See Counter example component
        </A>
        <A
          href="/api-example"
          class="hover:text-blue-500 transition-colors delay-100"
        >
          See API example component
        </A>
      </div>
    </>
  );
}
