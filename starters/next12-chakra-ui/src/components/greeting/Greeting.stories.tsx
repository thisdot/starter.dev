import FetchExample from "../../pages/fetch-example";

export default {
  title: "Pages/FetchComponent",
  component: FetchExample,
};

export const FetchExamplePage = () => (
  <FetchExample userStr="Hello from This Dot Labs" />
);
