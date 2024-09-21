import { useState } from 'react';

export interface IUseErrorHandler {
  showError: boolean;
  errorMessage: string;
  setError: (errorMessageValue: string) => void;
}

const useErrorHandler = (): IUseErrorHandler => {
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const setError = (errorMessageValue: string) => {
    setShowError(true);
    setErrorMessage(errorMessageValue);
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  return { showError, setError, errorMessage };
};

export default useErrorHandler;
