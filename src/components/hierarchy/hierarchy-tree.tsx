import type { User } from "@/lib/services/user-service";
import type { UserMap } from "@/lib/utils/tree-utils";
import { HierarchyNode } from "./hierarchy-node";
// import { HierarchyNodeExact } from "./hierarchy-node-exact";
import { useContext } from "react";
import { AuthContext } from "@/lib/contexts/auth-context";

interface HierarchyTreeProps {
  managers: User[];
  fullUserMap: UserMap;
  deleteUser: (id: number) => void;
}

export function HierarchyTree({
  managers,
  fullUserMap,
  deleteUser,
}: HierarchyTreeProps) {
  const { useExactVersion } = useContext(AuthContext);

  return (
    <>
      {managers.map((m) => {
        return <HierarchyNode
          key={m.id}
          user={m}
          fullUserMap={fullUserMap}
          deleteUser={deleteUser}
        />;
        // return useExactVersion ? (
        // <HierarchyNodeExact key={m.id} user={m} fullUserMap={fullUserMap} deleteUser={deleteUser}/>
        // ) : (
        // <HierarchyNode key={m.id} user={m} fullUserMap={fullUserMap} deleteUser={deleteUser} />
        // );
      })}
    </>
  );
}
