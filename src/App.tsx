import { Route, Routes } from 'react-router-dom';
import PrivetRouter from './routes/PrivetRoute';
import { AuthProvider } from './auth/providers';
import paths from './routes/paths';
import NotFoundPage from './pages/NotFoundPage';
import { LoginPage } from '@/auth/pages';
import { PostPage, PostListPage } from '@post/pages';

const { ROOT_PATH, LOGIN_PATH, POST_PATH } = paths;

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path={ROOT_PATH} element={<PrivetRouter />}>
            <Route path={ROOT_PATH} element={<PostListPage />} />
            <Route path={POST_PATH} element={<PostPage />} />
          </Route>
          <Route path={LOGIN_PATH} element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
