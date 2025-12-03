import { LoggedInButton } from "@/components/auth/logged-in-button";
import type { User } from "@/lib/services/user-service";
import { AuthContext } from "@/lib/contexts/auth-context";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import { describe, it, vi, beforeEach, expect } from "vitest";

const logout = vi.fn();

const testUser: User = {
  id: 1,
  firstName: "Mat",
  lastName: "L",
  email: "mat@gmail.com",
};

const mockAuthContextValue = {
  user: testUser,
  isUserLoading: false,
  login: vi.fn(),
  logout: logout,
  useExactVersion: false,
  toggleVersion: vi.fn(),
};

const renderLogoutButton = () => {
  return render(
    <BrowserRouter>
      <AuthContext value={mockAuthContextValue}>
        <LoggedInButton />
      </AuthContext>
    </BrowserRouter>
  );
};

describe("LoggedIn Button Validation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    cleanup();
  });
  // ENSURE USER IS SHOWN
  it("should show user name of logged in user", () => {
    renderLogoutButton();

    expect(
      screen.getByText(new RegExp(`Hi, ${testUser.firstName}`, "i"))
    ).toBeInTheDocument();
  });
  // ENSURE USER IS SHOWN
  it("should log user out", () => {
    const user = userEvent.setup();
    renderLogoutButton();

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    //
    user.click(logoutButton);

    waitFor(() => {
      expect(logout).toBeCalled();
      expect(screen.getByText(new RegExp(`Login`, "i"))).toBeInTheDocument();
    });
  });
});
