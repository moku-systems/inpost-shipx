import { jest, describe, expect, it } from '@jest/globals';
import { setupTestContext } from './helpers';

jest.mock('axios');
jest.mock('../../../src/auth/auth-manager');

describe('InPostClient – Request Interceptor', () => {
  const ctx = setupTestContext();

  it('should add Authorization header with access token', async () => {
    const requestInterceptor =
      ctx.mockAxiosInstance.interceptors.request.use.mock.calls[0][0];

    const config = { headers: {}, method: 'GET', url: '/test' };
    const result = await requestInterceptor(config);

    expect(ctx.mockAuthManager.getAccessToken).toHaveBeenCalled();
    expect(result.headers.Authorization).toBe('Bearer mock-access-token');
  });
});
