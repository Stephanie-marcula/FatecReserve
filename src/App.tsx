import { useState } from 'react';
import { LoginScreen } from "./components/LoginScreen";
import { SignUpScreen } from "./components/SignUpScreen";
import { ForgotPasswordScreen } from "./components/ForgotPasswordScreen";
import { Dashboard } from "./components/Dashboard";
import { ReservationsScreen } from "./components/ReservationsScreen";
import { ApprovalScreen } from "./components/ApprovalScreen";
import { ReportsScreen } from "./components/ReportsScreen";
import { Toaster } from "./components/ui/sonner";

type Screen = "login" | "signup" | "forgot-password" | "dashboard" | "reservations" | "approval" | "reports";
type UserRole = "student" | "coordinator" | "admin";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [userRole, setUserRole] = useState<UserRole>("student");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    // Mock authentication logic
    if (username && password) {
      setIsLoggedIn(true);
      
      // Simulate different user roles based on username
      if (username.toLowerCase().includes("admin")) {
        setUserRole("admin");
      } else if (username.toLowerCase().includes("coord")) {
        setUserRole("coordinator");
      } else {
        setUserRole("student");
      }
      
      setCurrentScreen("dashboard");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen("login");
    setUserRole("student");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      switch (currentScreen) {
        case "signup":
          return (
            <SignUpScreen
              onBack={() => setCurrentScreen("login")}
              onSignUpSuccess={() => setCurrentScreen("login")}
            />
          );
        case "forgot-password":
          return (
            <ForgotPasswordScreen
              onBack={() => setCurrentScreen("login")}
            />
          );
        default:
          return (
            <LoginScreen
              onLogin={handleLogin}
              onForgotPassword={() => setCurrentScreen("forgot-password")}
              onSignUp={() => setCurrentScreen("signup")}
            />
          );
      }
    }

    switch (currentScreen) {
      case "dashboard":
        return (
          <Dashboard
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            userRole={userRole}
          />
        );
      case "reservations":
        return (
          <ReservationsScreen
            onBack={() => setCurrentScreen("dashboard")}
            userRole={userRole}
          />
        );
      case "approval":
        return <ApprovalScreen onBack={() => setCurrentScreen("dashboard")} />;
      case "reports":
        return <ReportsScreen onBack={() => setCurrentScreen("dashboard")} />;
      default:
        return (
          <Dashboard
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            userRole={userRole}
          />
        );
    }
  };

  return (
    <>
      {renderScreen()}
      <Toaster />
    </>
  );
}
