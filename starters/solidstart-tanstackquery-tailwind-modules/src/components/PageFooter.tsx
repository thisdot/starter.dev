import { A } from "solid-start"

const PageFooter = () => {
  return (
    <footer class="mt-8 flex justify-center">
      <A
        href="/"
        class="transition-colors delay-100 underline text-blue-600 text-lg mt-8"
      >
        Return Home
      </A>
    </footer>
  );
};

export default PageFooter;