export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: "student" | "admin";
  student_id?: string;
  major?: string;
}

export interface ChangePassword {
  current_password: string;
  new_password: string;
}

export interface RequestPasswordReset {
  username: string;
  email: string;
}

export interface VerifyPasswordResetCode {
  email: string;
  code: string;
}
