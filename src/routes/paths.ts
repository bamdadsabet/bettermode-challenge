const ROOT_PATH = '/';
const LOGIN_PATH = '/login';
const POST_PATH = '/post/:id';
const NOT_FOUND_PATH = '/404';

const paths = {
  ROOT_PATH,
  LOGIN_PATH,
  POST_PATH,
  NOT_FOUND_PATH,
} as const;

export default paths;
