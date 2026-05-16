import { InPostClient } from '../../../src/client/inpost-client';
import { INPOST_HOSTS, INPOST_HOSTS_GATEWAY } from '../../../src/utils/api';
import {
  DEFAULT_CLIENT_CONFIG,
  mockedAxios,
  setupTestContext,
} from './helpers';

jest.mock('axios');
jest.mock('../../../src/auth/auth-manager');

describe('InPostClient – constructor', () => {
  const ctx = setupTestContext();

  it('should create axios instance with correct baseURL (sandbox)', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: `${INPOST_HOSTS['sandbox']}/v1`,
        timeout: 30000,
      }),
    );
  });

  it('should create Gateway axios instance with correct baseURL (sandbox)', () => {
    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: `${INPOST_HOSTS_GATEWAY['sandbox']}/v1`,
        timeout: 30000,
      }),
    );
  });

  it('should create axios instance with correct baseURL (production)', () => {
    jest.clearAllMocks();

    new InPostClient({ ...DEFAULT_CLIENT_CONFIG, environment: 'production' });

    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: `${INPOST_HOSTS['production']}/v1`,
      }),
    );
  });

  it('should create Gateway axios instance with correct baseURL (production)', () => {
    jest.clearAllMocks();

    new InPostClient({ ...DEFAULT_CLIENT_CONFIG, environment: 'production' });

    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: `${INPOST_HOSTS_GATEWAY['production']}/v1`,
      }),
    );
  });

  it('should use custom timeout if provided', () => {
    jest.clearAllMocks();

    new InPostClient({ ...DEFAULT_CLIENT_CONFIG, timeout: 60000 });

    expect(mockedAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({ timeout: 60000 }),
    );
  });

  it('should setup interceptors for both ShipX and Gateway instances', () => {
    expect(
      ctx.mockAxiosInstance.interceptors.request.use,
    ).toHaveBeenCalledTimes(2);
    expect(
      ctx.mockAxiosInstance.interceptors.response.use,
    ).toHaveBeenCalledTimes(2);
  });
});
