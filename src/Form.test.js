import { render, screen } from '@testing-library/react';
import Form from './components/Form';

test('renders form', () => {
  render(<Form />);
  const formElement = screen.getByRole("form");
  expect(formElement).toBeInTheDocument();
});
