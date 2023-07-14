import { z } from 'zod';

const signUpZodSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password required!' }),
    email: z.string().email({ message: 'Invalid email!' }),
  }),
});
const loginZodSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password required!' }),
    email: z.string().email({ message: 'Invalid email!' }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

export const AuthValidation = {
  refreshTokenZodSchema,
  signUpZodSchema,
  loginZodSchema,
};
