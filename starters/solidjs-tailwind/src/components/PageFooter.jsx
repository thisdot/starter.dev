import { NavLink } from '@solidjs/router';

const PageFooter = () => {
  return (
    <footer class="mt-8">
      <NavLink
        href="/"
        class="transition-colors delay-100 underline text-blue-600 text-lg mt-8"
      >
        Return Home
      </NavLink>
    </footer>
  );
};

export default PageFooter;
