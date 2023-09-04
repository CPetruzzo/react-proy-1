import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes agregar lógica de registro de errores aquí si lo deseas
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Puedes personalizar la representación de un mensaje de error aquí
      return <div>¡Oops! Lo siento. Algo salió mal.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
