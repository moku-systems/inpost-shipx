import { jest, describe, expect, beforeEach, it } from '@jest/globals';
import { AuthManager } from '../../../src/auth/AuthManager';
import { InPostConfigError } from '../../../src/utils/errors';

describe('AuthManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should throw InPostConfigError if config is missing accessToken', () => {
      expect(
        () =>
          new AuthManager({
            accessToken: '',
            organizationId: 'org-id',
            environment: 'sandbox',
          }),
      ).toThrow(InPostConfigError);
    });

    it('should throw InPostConfigError if config is missing organizationId', () => {
      expect(
        () =>
          new AuthManager({
            accessToken: 'abc123',
            organizationId: '',
            environment: 'sandbox',
          }),
      ).toThrow(InPostConfigError);
    });
  });
});
