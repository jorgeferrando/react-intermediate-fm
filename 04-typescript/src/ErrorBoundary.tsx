// mostly code from reactjs.org/docs/error-boundaries.html
import { Component, ErrorInfo, ReactElement } from 'react';
import { Link } from "react-router-dom";

// With ErrorBoundary you can't use function component you MUST use class component because of
// the methods getDerivedStateFromError and componentDidCatch
class ErrorBoundary extends Component<{children: ReactElement}> {
    state = { hasError: false };
    //when an error occurs the state will mutate to the result of this function
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error: Error, info: ErrorInfo) {
        // here you can send to Sentry or Raygun or any log error
        console.error("ErrorBoundary caught an error", error, info);
    }
    render() {
        if (this.state.hasError) {
            return (
                <h2>
                    There was an error with this listing.{" "}
                    <Link to="/">Click here</Link> to back to the home page.
                </h2>
            );
        }

        return this.props.children; // display the components that are wrapped by the ErrorBoundary
    }
}

export default ErrorBoundary;
