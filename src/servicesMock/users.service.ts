import { mockAuthors } from "../mockData/mockAuthors";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getAllUsers(userId: number) {
  //userId would have been used to retrieve all users
  await delay(1000);
  const data = mockAuthors;
  if (!data) throw new Error("No users found");
  return data;
}
