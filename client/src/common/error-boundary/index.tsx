import React from "react";
import { toast } from "react-hot-toast";
import { Auth } from "../../pages/auth/Auth";
import { ERROR } from "../../utils/constant";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  //   console.dir(error, errorInfo);
  //   if (error.message === "no_token_error") {
  //     // Move user to auth page
  //     alert("didcatch");
  //   } else {
  //     // Log error to a reporting service
  //     console.log(error, errorInfo);
  //   }
  // }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { fallback, children } = this.props;
    if (!localStorage.getItem("token")) {
      // alert(ERROR.LOGIN_REQUIRED_MESSAGE);
      // return (window.location.href = "/auth/login");
    }
    if (hasError) {
      return fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
