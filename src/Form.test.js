import { render, screen } from '@testing-library/react';
import Form from './components/Form';

beforeEach(()=> render(<Form />));
test('renders form', () => {
  const formElement = screen.getByTestId('passes-form');
  expect(formElement).toBeInTheDocument();
});

test('renders form', () => {
  const arrayOfInputs = [
    'name', 
    'guest', 
    'employee_initials',
    'id_type',
    'issued_on',
    'expires_on',
    'notes',
  ]
  const formElements = screen.getAllByTestId('form-input');
  const formInputs = formElements.map((e) => e.getAttribute('id'))
  expect(formInputs).toStrictEqual(arrayOfInputs);
});