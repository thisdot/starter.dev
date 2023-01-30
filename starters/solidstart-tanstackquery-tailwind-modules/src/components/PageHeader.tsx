const PageHeader = (props: { children: string }) => (
  <h1 class="w-full lg:w-[50%] border-b-4 border-b-blue-500 text-center text-[1.5rem]  my-8 mx-auto pb-3">
    {props.children}
  </h1>
);

export default PageHeader;