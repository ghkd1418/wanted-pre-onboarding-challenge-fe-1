import React from "react";
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

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.dir(error, errorInfo);

    if (error.message === "유즈이펙트에러") {
      // Move user to auth page
      alert("didcatch");
    } else {
      // Log error to a reporting service
      console.log(error, errorInfo);
    }
    if (error.message === "토큰 x") {
      alert("랜더에러");
    }
  }

  render(): React.ReactNode {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    // if (!localStorage.getItem("token")) {
    // alert(ERROR.LOGIN_REQUIRED_MESSAGE);
    // return fallback;
    // }

    if (hasError) {
      return fallback;
    }
    // debugger;
    return children;
  }
}

export default ErrorBoundary;
