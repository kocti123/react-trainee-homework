import { GET_ALL_USERS } from "../constants/productsURL";

export const authUser = async (username, password) => {
  const response = await fetch(GET_ALL_USERS)
  const allUsers = await response.json();
  const user = allUsers.filter((user) => user.username === username)[0];
  if (user?.username === username && user?.password === password) {
    return user;
  }
  return { err: "wrong username or password" };
}

