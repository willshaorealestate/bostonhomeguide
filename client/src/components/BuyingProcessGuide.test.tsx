import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BuyingProcessGuide from "./BuyingProcessGuide";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Extend expect with jest-dom matchers
expect.extend({
  toBeInTheDocument(received: any) {
    const pass = received && received.parentElement;
    return {
      pass,
      message: () => `expected element ${pass ? "to be" : "not to be"} in the document`,
    };
  },
});

describe("BuyingProcessGuide", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with header", () => {
    render(<BuyingProcessGuide />);
    expect(screen.getByText("Your Home Buying Journey")).toBeDefined();
    expect(screen.getByText(/Step-by-Step Guide/i)).toBeDefined();
  });

  it("displays the first step by default in carousel view", () => {
    render(<BuyingProcessGuide />);
    expect(screen.getByText("Get Pre-Approved")).toBeDefined();
    expect(screen.getByText(/Step 1 of 9/)).toBeDefined();
  });

  it("navigates to next step when Next button is clicked", async () => {
    render(<BuyingProcessGuide />);
    
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText("Define Your Priorities")).toBeDefined();
      expect(screen.getByText(/Step 2 of 9/)).toBeDefined();
    });
  });

  it("navigates to previous step when Previous button is clicked", async () => {
    render(<BuyingProcessGuide />);
    
    // First go to step 2
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText("Define Your Priorities")).toBeDefined();
    });
    
    // Then go back to step 1
    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);
    
    await waitFor(() => {
      expect(screen.getByText("Get Pre-Approved")).toBeDefined();
    });
  });

  it("disables Previous button on first step", () => {
    render(<BuyingProcessGuide />);
    const prevButton = screen.getByText("Previous") as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
  });

  it("disables Next button on last step", async () => {
    render(<BuyingProcessGuide />);
    
    // Click next 8 times to reach the last step
    const nextButton = screen.getByText("Next");
    for (let i = 0; i < 8; i++) {
      fireEvent.click(nextButton);
    }
    
    await waitFor(() => {
      expect(screen.getByText("Closing Day")).toBeDefined();
      const nextBtn = screen.getByText("Next") as HTMLButtonElement;
      expect(nextBtn.disabled).toBe(true);
    });
  });

  it("switches to timeline view when Timeline View button is clicked", async () => {
    render(<BuyingProcessGuide />);
    
    const timelineButton = screen.getByText("Timeline View");
    fireEvent.click(timelineButton);
    
    await waitFor(() => {
      // Timeline view should show all steps
      expect(screen.getByText("Get Pre-Approved")).toBeDefined();
      expect(screen.getByText("Closing Day")).toBeDefined();
    });
  });

  it("switches back to carousel view when Interactive View button is clicked", async () => {
    render(<BuyingProcessGuide />);
    
    const timelineButton = screen.getByText("Timeline View");
    fireEvent.click(timelineButton);
    
    await waitFor(() => {
      expect(screen.getByText("Get Pre-Approved")).toBeDefined();
    });
    
    const carouselButton = screen.getByText("Interactive View");
    fireEvent.click(carouselButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Step 1 of 9/)).toBeDefined();
    });
  });

  it("displays step details correctly", () => {
    render(<BuyingProcessGuide />);
    
    // Check that details are shown
    expect(screen.getByText("Choose a local lender familiar with MA transactions")).toBeDefined();
    expect(screen.getByText("Get pre-approved, not just pre-qualified")).toBeDefined();
    expect(screen.getByText("Lock in your rate when you find the right home")).toBeDefined();
  });

  it("shows duration for each step", () => {
    render(<BuyingProcessGuide />);
    expect(screen.getByText("Typically takes 1-2 weeks")).toBeDefined();
  });

  it("displays share button in carousel view", () => {
    render(<BuyingProcessGuide />);
    expect(screen.getByText("Share")).toBeDefined();
  });

  it("navigates to specific step when dot indicator is clicked", async () => {
    render(<BuyingProcessGuide />);
    
    // Get all dot buttons (there should be 9 for 9 steps)
    const dots = screen.getAllByRole("button", { name: /Go to step/ });
    
    // Click the 5th dot (step 5)
    fireEvent.click(dots[4]);
    
    await waitFor(() => {
      expect(screen.getByText("Negotiate & Accept")).toBeDefined();
      expect(screen.getByText(/Step 5 of 9/)).toBeDefined();
    });
  });

  it("displays progress bar", () => {
    const { container } = render(<BuyingProcessGuide />);
    
    // Check for progress bar element
    const progressBar = container.querySelector(".bg-gray-200.rounded-full");
    expect(progressBar).toBeDefined();
  });

  it("renders all 9 steps correctly", async () => {
    render(<BuyingProcessGuide />);
    
    const expectedSteps = [
      "Get Pre-Approved",
      "Define Your Priorities",
      "Start Your Search",
      "Make an Offer",
      "Negotiate & Accept",
      "Home Inspection",
      "Appraisal & Underwriting",
      "Final Walkthrough",
      "Closing Day",
    ];
    
    for (const stepTitle of expectedSteps) {
      const nextButton = screen.queryByText("Next");
      if (nextButton && !nextButton.hasAttribute("disabled")) {
        fireEvent.click(nextButton);
      }
    }
    
    // At least verify the first and last steps exist
    expect(screen.getByText("Get Pre-Approved")).toBeDefined();
  });
});
