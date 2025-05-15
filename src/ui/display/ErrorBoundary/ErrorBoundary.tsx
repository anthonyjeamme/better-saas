import { Component } from "react";


interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    errorMessage?: string;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };

    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? <div>
                Error :{this.state.errorMessage}
            </div>
        }

        return this.props.children;
    }
}