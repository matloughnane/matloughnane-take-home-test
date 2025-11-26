import type { User } from "@/lib/services/user-service";
import { getUserFullName } from "@/lib/utils/string-utils";
import { Avatar } from "@radix-ui/react-avatar";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import type { UserMap } from "@/lib/utils/tree-utils";

interface HierarchyNodeProps {
  user: User;
  fullUserMap: UserMap;
}

export function HierarchyNode({ user, fullUserMap }: HierarchyNodeProps) {
  const fullName = getUserFullName(user.firstName, user.lastName);
  const [showReports, setShowReports] = useState<boolean>(false);
  const reports = fullUserMap.has(user.id)
    ? fullUserMap.get(user.id)!.reports
    : [];
  return (
    <div
      key={user.id}
      className="flex flex-col gap-2 py-2 hover:bg-primary/10 rounded-lg px-4"
    >
      <div className="flex flex-row items-center gap-4">
        {reports.length > 0 && !showReports ? (
          <Plus className="cursor-pointer" onClick={() => setShowReports(true)} />
        ) : (
          <Minus className="cursor-pointer" onClick={() => setShowReports(false)} />
        )}
        <Avatar className="w-10 h-10 rounded-full border-2 border-primary">
          <AvatarImage
            src={user.photo}
            className="rounded-full"
            alt={`${fullName} Profile Photo`}
          />
          <AvatarFallback className="bg-white">{`${user.firstName[0]}${user.lastName[0]}`}</AvatarFallback>
        </Avatar>
        <div>
          <p>{fullName}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      {showReports && (
        <div className="flex flex-col ml-8 py-2w">
          {reports.map((r: User) => {
            return <HierarchyNode user={r} fullUserMap={fullUserMap} />;
          })}
        </div>
      )}
    </div>
  );
}
