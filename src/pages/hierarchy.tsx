import { LoggedInButton } from "@/components/auth/logged-in-button";
import { HierarchyTree } from "@/components/hierarchy/hierarchy-tree";
import { Card } from "@/components/ui/card";
import { VersionToggle } from "@/components/version/version-toggle";
import { getAllUsers, type User } from "@/lib/services/user-service";
import {
  generateFlatUserMap,
  generateManagerList,
} from "@/lib/utils/tree-utils";
import { useEffect, useMemo, useState } from "react";

export default function Hierarchy() {
  const [users, setUsers] = useState<User[]>([]);

  // DECLARE FUNCTION BEFORE CALLING IN useEffect
  const loadUsers = async () => {
    const totalUsers = await getAllUsers();
    setUsers(totalUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const { managers, flatUserMap } = useMemo(() => {
    const managers = generateManagerList(users);
    const flatUserMap = generateFlatUserMap(users);
    return { managers, flatUserMap };
  }, [users]);

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
          <HierarchyTree managers={managers} fullUserMap={flatUserMap} />
        )}
      </Card>{" "}
      <div className="flex flex-row justify-between py-4">
        <VersionToggle page={"hierarchy"} />
      </div>
    </main>
  );
}
