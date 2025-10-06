/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/Home"; // default export

describe("Home Page", () => {
  test('affiche "Welcome to the Home Page"', () => {
    render(<Home />);

    const heading = screen.getByText(/Welcome to the Home Page/i);
    expect(heading).toBeInTheDocument();
  });
});
