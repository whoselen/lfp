import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import UserModeChip from "./user-mode-chip";
import { getUserTagsByIds } from "@/queries/common";
import useSupabaseBrowser from "@/utils/supabase/client";

const UserCustomTags = ({ ids }: { ids: number[] }) => {
  const supabase = useSupabaseBrowser();

  const { data: customTags } = useQuery(getUserTagsByIds(supabase, ids));

  return customTags?.map((tag) => (
    <UserModeChip
      key={tag.name}
      title={tag.name}
      backgroundColor={""}
      textColor={""}
    />
  ));
};

export default UserCustomTags;
