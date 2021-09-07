import { render, screen } from "@testing-library/react";
import Form from "./components/Form";

beforeEach(() => render(<Form />));
test("renders form", () => {
  const formElement = screen.getByTestId("passes-form");
  expect(formElement).toBeInTheDocument();
});

test("renders form inputs", () => {
  const arrayOfInputs = [
    "guest_name",
    "affiliate_name",
    "initials",
    "idtype",
    "cardissue",
    "cardexp",
    "notes",
  ];

  const formElements = screen.getAllByTestId("form-input");
  const formInputs = formElements.map((e) => e.getAttribute("name"));
  expect(formInputs).toEqual(arrayOfInputs);
});
