import { AccessibilityToolKey } from "@/lib/constants";
import { getUserAccessibilityTools } from "@/queries/common";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import UserAccessibility from "./user-accessibility";

const UserAccessibilityTools = ({ ids }: { ids: number[] }) => {
  const supabase = useSupabaseBrowser();

  const { data: allAccessibilityTools } = useQuery(
    getUserAccessibilityTools(supabase)
  );

  const userTools = allAccessibilityTools?.filter((tool) =>
    ids.includes(tool.id)
  );

  return userTools?.map((tool) => (
    <UserAccessibility
      key={tool.name}
      name={
        tool?.name.toLowerCase().replace(/\s+/g, "-") as AccessibilityToolKey
      }
    />
  ));
};

export default UserAccessibilityTools;
