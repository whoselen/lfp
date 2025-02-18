import MainLayout from "@/components/layout/main";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const layout = (await cookies()).get("react-resizable-panels:layout:mail");
  const collapsed = (await cookies()).get("react-resizable-panels:collapsed");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <MainLayout user={data?.user} />
    // <Mail
    //   defaultLayout={defaultLayout}
    //   defaultCollapsed={defaultCollapsed}
    //   navCollapsedSize={4}
    // />
  );
}
