import { LoggedInButton } from "@/components/auth/logged-in-button";
import { LoggedInButtonExact } from "@/components/auth/logged-in-button-exact";
import { HierarchyTree } from "@/components/hierarchy/hierarchy-tree";
import { Card } from "@/components/ui/card";
import { VersionToggle } from "@/components/version/version-toggle";
import { getAllUsers, type User } from "@/lib/services/user-service";
import {
  generateFlatUserMap,
  generateManagerList,
} from "@/lib/utils/tree-utils";
import { useEffect, useMemo, useState } from "react";

export default function ExactHierarchyPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const totalUsers = await getAllUsers();
    setUsers(totalUsers);
  };
  const { managers, flatUserMap } = useMemo(() => {
    const managers = generateManagerList(users);
    const flatUserMap = generateFlatUserMap(users);
    return { managers, flatUserMap };
  }, [users]);

  return (
    <main className="w-full mx-auto px-4 flex flex-col items-center justify-center pb-12">
      <div className="w-full flex flex-row justify-between items-center p-2">
        <h1 className="py-0 text-xl font-semibold">Hierarchy</h1>
        <LoggedInButtonExact />
      </div>
      <Card className="w-3xl mx-auto p-8 rounded-none">
        <HierarchyTree managers={managers} fullUserMap={flatUserMap} />
      </Card>{" "}
      <div className="flex flex-row justify-between py-4">
        <VersionToggle page={"hierarchy"} />
      </div>
    </main>
  );
}
