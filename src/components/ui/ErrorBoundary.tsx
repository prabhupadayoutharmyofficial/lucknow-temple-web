import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error: Error | null; info: React.ErrorInfo | null };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, info: null } as State;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log error for debugging
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, info);
    this.setState({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-white rounded shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
              <p className="mb-4 text-gray-700">An unexpected error occurred while rendering this page.</p>
              <div className="text-sm text-red-600 whitespace-pre-wrap overflow-auto max-h-64">
                {this.state.error?.message}
                {this.state.info?.componentStack && '\n\nComponent stack:\n'}
                {this.state.info?.componentStack}
              </div>
            </div>
          </main>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
