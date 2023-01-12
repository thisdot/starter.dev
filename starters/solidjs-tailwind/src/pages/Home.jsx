import { NavLink } from '@solidjs/router';

const Home = () => {
  return (
    <>
      <header class="flex justify-center items-center text-white my-5 mx-auto bg-blue-500  w-full lg:w-[75%] p-4 text-lg ">
        SolidJS and Tailwind CSS Starter kit
      </header>
      <div class="flex flex-col gap-2 items-center text-blue-800 underline text-base">
        <NavLink
          href="/counter"
          class="hover:text-blue-500 transition-colors delay-100"
        >
          See Counter example component
        </NavLink>
        <NavLink
          href="/api-example"
          class="hover:text-blue-500 transition-colors delay-100"
        >
          See API example component
        </NavLink>
      </div>
    </>
  );
};

export default Home;
