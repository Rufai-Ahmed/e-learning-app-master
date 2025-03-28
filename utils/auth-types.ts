// Common types for auth screens
export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    VerifyEmail: { email: string };
    ResetPassword: { token: string };
    Welcome: undefined;
    RoleSelection: undefined;
    SocialAuth: undefined;
  };
  
  export type FormData = {
    fullName?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    country?: string;
    acceptTerms?: boolean;
  };