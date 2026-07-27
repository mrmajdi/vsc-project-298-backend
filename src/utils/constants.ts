// @vsc repo:vsc-project-298-backend file:src/utils/constants.ts task:b18-src-utils-constants-ts module:backend session:298
// src/utils/constants.ts

export const ROLES = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const PER_PAGE = 20;

export const ACCESS_TOKEN_EXPIRES_IN = '15m';

export const REFRESH_TOKEN_EXPIRES_IN = '7d';
