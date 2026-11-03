import UserNavbar from "@/components/user/UserNavbar";
import UserFooter from "@/components/user/UserFooter";
import SmoothScroll from "@/components/user/SmoothScroll";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-clip">
      <SmoothScroll />
      <UserNavbar />
      <main className="flex-1 overflow-x-clip">{children}</main>
      <UserFooter />
    </div>
  );
}
