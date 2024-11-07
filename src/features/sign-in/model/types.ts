export type User = {
  id: string;
  email: string;
  password: string;
};

export type Session = {
  id: string;
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
