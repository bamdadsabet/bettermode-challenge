import { useAuth, useFetchGuestToken, useLogin } from '@auth/hooks';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { LoginTypeEnum } from '@/auth/types';
import './LoginPage.scss';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths';
import { Toast } from '@/components';
import { useErrorHandler } from '@/hooks';

const LoginPage: React.FC = () => {
  const { ROOT_PATH } = paths;

  const navigate = useNavigate();

  const { setError, errorMessage, showError } = useErrorHandler();

  const { logout } = useAuth();

  const loginFormRef = useRef<HTMLFormElement>(null);

  const [loginType, setLoginType] = useState<LoginTypeEnum>(LoginTypeEnum.MEMBER);

  const [fetchToken, { loading: fetchTokenLoading }] = useFetchGuestToken();
  const [userLogin, { loading: loginLoading }] = useLogin();

  const pageLoading = fetchTokenLoading || loginLoading;

  const generateTabClassName = (tabType: string): string =>
    tabType === loginType ? 'text-blue-600' : 'hover:text-gray-300';

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const domain = (loginFormRef.current?.elements.namedItem('domain') as HTMLInputElement)?.value;
    if (!domain) {
      return;
    }

    if (loginType === LoginTypeEnum.MEMBER) {
      const username = (loginFormRef.current?.elements.namedItem('username') as HTMLInputElement)?.value;
      const password = (loginFormRef.current?.elements.namedItem('password') as HTMLInputElement)?.value;

      if (!username && !password) {
        return;
      }
      const { loading, error, data } = await userLogin(domain, username, password);
      if (error) {
        setError(error.message);
      } else if (!loading && data) {
        navigate(ROOT_PATH);
      }
    } else {
      const { loading, error, data } = await fetchToken(domain);
      if (error) {
        setError(error.message);
      }
      if (!loading && data) {
        navigate(ROOT_PATH);
      }
    }
  };

  useEffect(() => {
    logout()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="post-page">
      <div className="post-page__header">Bettermode</div>
      <div className="post-page__card">
        <ul className="post-page__tabs">
          <li
            onClick={() => setLoginType(LoginTypeEnum.MEMBER)}
            className={`me-2 cursor-pointer p-4 ${generateTabClassName(LoginTypeEnum.MEMBER)}`}
          >
            Member
          </li>
          <li
            onClick={() => setLoginType(LoginTypeEnum.GUEST)}
            className={`me-2 cursor-pointer p-4 ${generateTabClassName(LoginTypeEnum.GUEST)}`}
          >
            Guest
          </li>
        </ul>
        <form ref={loginFormRef} onSubmit={handleLogin} className="post-page__form">
          <h1 className="post-page__form__title">
            {loginType === LoginTypeEnum.MEMBER ? 'Sign in to your account' : 'Visit as a guest'}
          </h1>
          <div>
            <label className="post-page__form__label">Domain</label>
            <input
              type="text"
              name="domain"
              className="post-page__form__input"
              placeholder="path.bettermode.io"
              required
            />
          </div>
          {loginType === LoginTypeEnum.MEMBER && (
            <>
              <div>
                <label className="post-page__form__label">Username or Email</label>
                <input
                  type="text"
                  name="username"
                  className="post-page__form__input"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label className="post-page__form__label">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="post-page__form__input"
                  required
                />
              </div>
            </>
          )}
          <button type="submit" className="post-page__submit-button" disabled={pageLoading}>
            {pageLoading ? 'Logging in ...' : 'Login'}
          </button>
        </form>
      </div>
      {showError && <Toast error={errorMessage} />}
    </div>
  );
};

export default LoginPage;
