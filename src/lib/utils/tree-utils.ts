import type { User } from "../services/user-service";

// DATA MODEL FOR TREE
// {
//      <managerId>: reports: User[]
// }

export type UserNode = User & {
  reports: User[];
};

export type UserMap = Map<number, UserNode>;

/**
 * Generates a flat map of users and direct reports
 * @param users the full user list
 * @returns Map of user ID to UserNode with direct reports
 */
export function generateFlatUserMap(users: User[]): Map<number, UserNode> {
  const userMap: UserMap = new Map();

  // SET UP FLAT FILE
  users.forEach((u) => {
    const userNode: UserNode = { ...u, reports: [] };
    userMap.set(u.id, userNode);
  });

  // ADD ALL USERS TO THEIR MANAGERS AS REPORTS
  users.forEach((u: User) => {
    if (u.managerId && userMap.has(u.managerId)) {
      const needToUpdate = userMap.get(u.managerId!)!;
      needToUpdate.reports.push(u);
      userMap.set(u.managerId!, needToUpdate);
    }
  });
  return userMap;
}

/**
 * Returns a list og managers
 * @param users the full user list
 * @returns A list of managers
 */
export function generateManagerList(users: User[]) {
  if (users.length == 0) {
    return [];
  }
  return users.filter((u) => u.managerId == null);
}
