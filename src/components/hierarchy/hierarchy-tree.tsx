import type { User } from "@/lib/services/user-service";
import type { UserMap } from "@/lib/utils/tree-utils";
import { HierarchyNode } from "./hierarchy-node";
import { HierarchyNodeExact } from "./hierarchy-node-exact";
import { useContext } from "react";
import { AuthContext } from "@/lib/contexts/auth-context";

interface HierarchyTreeProps {
  managers: User[];
  fullUserMap: UserMap;
}

export function HierarchyTree({ managers, fullUserMap }: HierarchyTreeProps) {
  const { useExactVersion } = useContext(AuthContext);

  return (
    <>
      {managers.map((m) => {
        return useExactVersion ? (
          <HierarchyNodeExact key={m.id} user={m} fullUserMap={fullUserMap} />
        ) : (
          <HierarchyNode key={m.id} user={m} fullUserMap={fullUserMap} />
        );
      })}
    </>
  );
}
