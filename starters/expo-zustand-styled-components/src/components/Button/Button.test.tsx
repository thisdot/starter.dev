import { render, screen } from '@testing-library/react-native';
import Button from '.';

test('The Button component is rendered', () => {
  render(<Button title="+" onPress={() => null} />);
  expect(screen.getByText('+')).toBeTruthy();
});
