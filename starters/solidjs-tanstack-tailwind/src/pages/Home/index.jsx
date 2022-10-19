import { A, NavLink } from '@solidjs/router';

const Home = () => {
  return (
    <div class="flex flex-col gap-2 items-center text-blue-800 underline text-base">
      <A
        href="/counter"
        class="hover:text-blue-500 transition-colors delay-100"
      >
        See Counter example component
      </A>
      <NavLink
        href="/api-example"
        class="hover:text-blue-500 transition-colors delay-100"
      >
        See API example component
      </NavLink>
    </div>
  );
};

export default Home;
