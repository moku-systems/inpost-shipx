import { setupTestContext } from './helpers';

jest.mock('axios');
jest.mock('../../../src/auth/auth-manager');

describe('InPostClient – HTTP methods', () => {
  const ctx = setupTestContext();

  describe('get', () => {
    it('should make GET request and return data', async () => {
      const mockData = { id: '123', name: 'Test' };
      ctx.mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      const result = await ctx.client.get('/test-endpoint');

      expect(ctx.mockAxiosInstance.get).toHaveBeenCalledWith(
        '/test-endpoint',
        undefined,
      );
      expect(result).toEqual(mockData);
    });

    it('should pass config to axios', async () => {
      ctx.mockAxiosInstance.get.mockResolvedValue({ data: {} });

      const config = { params: { page: 1 } };
      await ctx.client.get('/test-endpoint', config);

      expect(ctx.mockAxiosInstance.get).toHaveBeenCalledWith(
        '/test-endpoint',
        config,
      );
    });
  });

  describe('post', () => {
    it('should make POST request and return data', async () => {
      const mockData = { id: '123' };
      const requestBody = { name: 'Test' };
      ctx.mockAxiosInstance.post.mockResolvedValue({ data: mockData });

      const result = await ctx.client.post('/test-endpoint', requestBody);

      expect(ctx.mockAxiosInstance.post).toHaveBeenCalledWith(
        '/test-endpoint',
        requestBody,
        undefined,
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('put', () => {
    it('should make PUT request and return data', async () => {
      const mockData = { id: '123' };
      const requestBody = { name: 'Updated' };
      ctx.mockAxiosInstance.put.mockResolvedValue({ data: mockData });

      const result = await ctx.client.put('/test-endpoint', requestBody);

      expect(ctx.mockAxiosInstance.put).toHaveBeenCalledWith(
        '/test-endpoint',
        requestBody,
        undefined,
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('delete', () => {
    it('should make DELETE request and return data', async () => {
      const mockData = { success: true };
      ctx.mockAxiosInstance.delete.mockResolvedValue({ data: mockData });

      const result = await ctx.client.delete('/test-endpoint');

      expect(ctx.mockAxiosInstance.delete).toHaveBeenCalledWith(
        '/test-endpoint',
        undefined,
      );
      expect(result).toEqual(mockData);
    });
  });

  describe('getFromGateway', () => {
    it('should make GET Gateway request and return data', async () => {
      const mockData = { id: '123', name: 'Test' };
      ctx.mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      const result = await ctx.client.getFromGateway('/test-endpoint');

      expect(ctx.mockAxiosInstance.get).toHaveBeenCalledWith(
        '/test-endpoint',
        undefined,
      );
      expect(result).toEqual(mockData);
    });

    it('should pass config to axios', async () => {
      ctx.mockAxiosInstance.get.mockResolvedValue({ data: {} });

      const config = { params: { page: 1 } };
      await ctx.client.getFromGateway('/test-endpoint', config);

      expect(ctx.mockAxiosInstance.get).toHaveBeenCalledWith(
        '/test-endpoint',
        config,
      );
    });
  });
});
