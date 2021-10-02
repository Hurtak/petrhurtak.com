import React from "react";

export class ArticleErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error: any, info: any) {
  // TODO: log
  // logErrorToMyService(error, info);
  // }

  render() {
    if (this.state.hasError) {
      // TODO
      return <p>Something went wrong, please try again later</p>;
    }

    return this.props.children;
  }
}
