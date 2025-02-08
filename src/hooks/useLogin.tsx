import { api } from '@/api/base';
import { useGoogleLogin } from '@react-oauth/google';

const useLogin = useGoogleLogin({
  scope: 'email profile',
  onSuccess: async ({ code }) => {
    api(false)
      .post('/auth/login', { code })
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem('token', data.token);
      });
  },
  onError: (errorResponse) => {
    console.error(errorResponse);
  },
  flow: 'auth-code',
});
