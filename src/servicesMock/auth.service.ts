import { IForgotPassword, ILogin, IRegister, IUser } from "../interfaces";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(
  payload: ILogin
): Promise<{ token: string; user: IUser }> {
  await delay(2000);

  if (payload.userName === "test" && payload.password === "1234") {
    const mockUser: IUser = {
      id: 101,
      userName: "Alice Johnson",
      firstName: "Alice",
      lastName: "Johnson",
      email: 'alice@gmail.com',
      avatar: "https://i.pravatar.cc/150?img=1",
    };

    return {
      token: "awdawdjqwhej12h3123jbjkabsdjasjd123123mbajsbdjasjk1h23123",
      user: mockUser,
    };
  } else {
    throw new Error("Invalid username or password");
  }
}

export async function register(payload: IRegister) {
  await delay(1000);
  console.log("Mock register payload:", payload);

  return {
    success: true,
    message: "User registered successfully",
    user: {
      id: "124",
      ...payload,
    },
  };
}

export async function forgotPassword(payload: IForgotPassword) {
  await delay(1000);
  console.log("Mock forgot password payload:", payload);

  return {
    success: true,
    message: `Reset link sent to ${payload.username}`,
  };
}

export async function updateAccount(payload: IUser) {
  await delay(1000);
  console.log("Mock update account payload:", payload);

  return {
    success: true,
    message: "Account updated successfully",
    user: {
      ...payload,
    },
  };
}

export async function deleteAccount(userId: string) {
  await delay(1000);
  console.log("Mock delete account:", userId);

  return {
    success: true,
    message: `User ${userId} deleted successfully`,
  };
}
