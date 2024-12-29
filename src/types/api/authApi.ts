export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  name?: string;
  surname?: string;
};

export type AuthResponse = {
  token: string;
};
