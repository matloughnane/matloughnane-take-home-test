import { LoggedInButton } from "@/components/auth/logged-in-button";
import { HierarchyTree } from "@/components/hierarchy/hierarchy-tree";
import { Card } from "@/components/ui/card";
import { VersionToggle } from "@/components/version/version-toggle";
import { AuthContext } from "@/lib/contexts/auth-context";
import { getAllUsers, type User } from "@/lib/services/user-service";
import {
  generateFlatUserMap,
  generateManagerList,
} from "@/lib/utils/tree-utils";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

export default function Hierarchy() {
  const {user} = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const totalUsers = await getAllUsers();
    setUsers(totalUsers);
  };
  // 
  const { managers, flatUserMap } = useMemo(() => {
    const managers = generateManagerList(users);
    const flatUserMap = generateFlatUserMap(users);
    return { managers, flatUserMap };
  }, [users]);

  const deleteUser = useCallback((deletedId: number) => {
    // 
    const localVersionOfUsers = [...users];
    //
    const userIndexToDelete = localVersionOfUsers.findIndex(
      (user: User) => user.id == deletedId
    );
    // console.log(localVersionOfUsers[userIndexToDelete]);
    const userToDelete = localVersionOfUsers[userIndexToDelete];
    // console.log(flatUserMap.get(deletedId));
    const directReports = flatUserMap.get(deletedId)?.reports!;
    if (directReports?.length != 0) {
      // UPDATE REPORTS
      directReports?.forEach((d) => {
        // FIND IN MY LOCALVERSION OF USERS => UPDATE
        const userIndexToUpdate = localVersionOfUsers.findIndex(
          (user: User) => user.id === d.id // '1' == 1 true, '1' === 1 FALSE
        );
        localVersionOfUsers[userIndexToUpdate].managerId =
          userToDelete.managerId;
      });
    }
    //
    localVersionOfUsers.splice(userIndexToDelete, 1);
    //
    setUsers(localVersionOfUsers);
  }, []);

  return (
    <main className="w-full mx-auto px-4 flex flex-col items-center justify-center py-12">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="pb-8 py-4 text-xl font-semibold">Hierarchy Tree</h1>
        <LoggedInButton />
      </div>
      <Card className="w-3xl mx-auto p-8">
        {managers.length == 0 ? (
          <p>No Users Available</p>
        ) : (
          <HierarchyTree
            managers={managers}
            fullUserMap={flatUserMap}
            deleteUser={deleteUser}
          />
        )}
      </Card>
      <div className="flex flex-row justify-between py-4">
        <VersionToggle page={"hierarchy"} />
      </div>
      <div className="w-[800px]">
        <pre className="bg-gray-50 text-xs">{JSON.stringify(users, null, 2)}</pre>
        <pre className="bg-gray-50 text-xs">{JSON.stringify(flatUserMap, null, 2)}</pre>
      </div>
    </main>
  );
}
