import React from "react"; // Ensure React is imported
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Provides extra matchers like `toBeInTheDocument`
import LeadForm from "../components/LeadForm"; // Ensure correct path
import { describe, test, expect, vi } from "vitest"; // Ensure correct Vitest imports

describe("LeadForm Component", () => {
  test("renders lead form and submits data", async () => {
    const mockSubmit = vi.fn(); // Use `vi.fn()` instead of `jest.fn()`
    
    render(<LeadForm refreshLeads={mockSubmit} clearSelection={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByText("Add Lead"));

    expect(mockSubmit).toHaveBeenCalled();
  });
});
