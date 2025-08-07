// ✅ CORRECT
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function getAllUsers(filter: string, offset?: number) {
  const users = await clerkClient.users.getUserList({
    limit: 50,
    query: filter,
    offset: offset,
  });

  return users;
}
