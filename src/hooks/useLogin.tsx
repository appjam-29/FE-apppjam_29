import { api } from '@/api/base';

const useLogin = (action?: () => void) => {
  const handleLogin = async () => {
    try {
      // 백엔드에서 인증 URL 받아오기
      const response = await api(false).get('/auth/authorization-url');

      const url = response.data.data.url;

      // 현재 URL을 state 파라미터로 추가 (필요한 경우)
      window.location.href = url;
    } catch (error) {
      console.error('Failed to get auth URL:', error);
    }
  };

  return handleLogin;
};

export { useLogin };
