import Environments from './environments';

const isProduction = true;

export default {
  url: {
    base: isProduction ? Environments.production : Environments.staging,
    userServicePath: 'api/users',
    postServicePath: 'api/posts',
    commentServicePath: 'api/comments',
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
  },
};
