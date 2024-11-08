export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Session = {
  id: string;
  fingerprint: number;
  userId: string;
};

export type SignInCommand = {
  email: string;
  password: string;
};

export type SignInResponse = {
  isSignIn: boolean;
  data: string;
};

export type SignUpCommand = {
  name: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  isSignUp: boolean;
  data: string;
};
