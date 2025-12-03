import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router";
import { LoginForm } from "@/components/auth/login-form";
import { AuthContext } from "@/lib/contexts/auth-context";
import { cleanup } from "@testing-library/react";

// MOCK AUTH CONTEXT
const mockLogin = vi.fn();
const mockAuthContextValue = {
  user: null,
  isUserLoading: false,
  login: mockLogin,
  logout: vi.fn(),
  useExactVersion: false,
  toggleVersion: vi.fn(),
};

// RENDER LOGIN FORM
const renderLoginForm = () => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={mockAuthContextValue}>
        <LoginForm />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

describe("LoginForm Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // GETS RID OF PREVIOUS RENDERS OF THE FORM
    cleanup();
  });

  it("should display email validation error for invalid email format", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const emailInput = screen.getByLabelText(/email address/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    // INVALID EMAIL
    await user.type(emailInput, "invalid-email");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
    });
  });

  it("should display email validation error for invalid email", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const emailInput = screen.getByLabelText(/Email Address/);
    const submitButton = screen.getByRole("button", { name: /login/i });

    // Enter email that's too short
    await user.type(emailInput, "a");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it("should display password validation error for password shorter than 2 characters", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    // VALID EMAIL - SHORT PASSWORD
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "a");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/your password must be at least 2 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it("should display password validation error for password shorter than 2 characters", async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    // VALID EMAIL - SHORT PASSWORD
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "a");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/your password must be at least 2 characters long/i)
      ).toBeInTheDocument();
    });
  });

    it("should display both email and password validation errors when both are invalid", async () => {
      const user = userEvent.setup();
      renderLoginForm();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /login/i });

      // Enter invalid email and short password
      await user.type(emailInput, "invalid");
      await user.type(passwordInput, "a");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
        expect(
          screen.getByText(/your password must be at least 2 characters long/i)
        ).toBeInTheDocument();
      });
    });

    it("should not display validation errors when inputs are valid", async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue(true);
      renderLoginForm();

      const emailInput = screen.getByLabelText(/email address/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /login/i });

      await user.type(emailInput, "test@example.com");
      await user.type(passwordInput, "validpassword");
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
        expect(
          screen.queryByText(/your password must be at least 2 characters long/i)
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText(/email must be at least 2 characters long/i)
        ).not.toBeInTheDocument();
      });

      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "validpassword");
    });

    it("should clear validation errors when user corrects invalid input", async () => {
      const user = userEvent.setup();
      renderLoginForm();

      const emailInput = screen.getByLabelText(/email address/i);
      const submitButton = screen.getByRole("button", { name: /login/i });

      // First enter invalid email and submit
      await user.type(emailInput, "invalid");
      await user.click(submitButton);

      // Wait for validation error to appear
      await waitFor(() => {
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      });

      // Clear and enter valid email
      await user.clear(emailInput);
      await user.type(emailInput, "valid@example.com");

      // Error should disappear once user starts typing valid input
      await waitFor(() => {
        expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
      });
    });
});
