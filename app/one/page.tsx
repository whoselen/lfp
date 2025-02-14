import MainLayout from "@/components/layout/main";
import { Mail } from "@/components/layout/main/mainv1";
import Image from "next/image";
import { cookies } from "next/headers";

export default async function Home() {
  const layout = (await cookies()).get("react-resizable-panels:layout:mail");
  const collapsed = (await cookies()).get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <MainLayout />
    // <Mail
    //   defaultLayout={defaultLayout}
    //   defaultCollapsed={defaultCollapsed}
    //   navCollapsedSize={4}
    // />
  );
}
