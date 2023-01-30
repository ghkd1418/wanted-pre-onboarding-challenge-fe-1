import React from "react";
import { ERROR } from "../../utils/constant";
import { toast } from "react-hot-toast";

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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.dir(error, errorInfo);

    if (error.message === "require token") {
      toast.error(ERROR.LOGIN_REQUIRED_MESSAGE);
    } else {
      // Log error to a reporting service
      console.log(error, errorInfo);
    }
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback;
    }

    return children;
  }
}

export default ErrorBoundary;
