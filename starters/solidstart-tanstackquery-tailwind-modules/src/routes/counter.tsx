import CounterExample from '~/components/CounterExample/Counter';
import PageFooter from '~/components/PageFooter';
import PageHeader from '~/components/PageHeader';

export default function Counter() {
  return (
    <>
      <PageHeader>Increment, Decrement and Reset Button Example</PageHeader>
      <CounterExample />
      <PageFooter />
    </>
  );
}
