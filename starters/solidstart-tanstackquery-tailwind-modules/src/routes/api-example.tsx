import { Greeting } from '~/components/FetchExample';
import PageHeader from '~/components/PageHeader';
import PageFooter from '~/components/PageFooter';

export default function ApiExample() {
  return (
    <>
      <PageHeader>Solid Start Tanstack Query Fetch Data from API</PageHeader>
      <Greeting />
      <PageFooter />
    </>
  );
}
