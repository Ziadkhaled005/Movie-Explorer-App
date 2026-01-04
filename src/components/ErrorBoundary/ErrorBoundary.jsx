import React, { Component } from "react";
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h1>Something went wrong.</h1>
                    <p>
                        Please try refreshing the page or contact support if the
                        problem persists.
                    </p>
                    <button onClick={() => window.location.reload()}>
                        Refresh Page
                    </button>
                    {process.env.NODE_ENV === "development" && (
                        <details className="error-details">
                            <summary>Error Details (Development Only)</summary>
                            <p>
                                {this.state.error &&
                                    this.state.error.toString()}
                            </p>
                            <pre>{this.state.errorInfo?.componentStack}</pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
