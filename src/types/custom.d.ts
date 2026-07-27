// @vsc repo:vsc-project-298-backend file:src/types/custom.d.ts task:b19-src-types-custom-d-ts module:backend session:298
enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User | undefined;
  }
}
