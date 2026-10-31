import UserNavbar from "@/components/user/UserNavbar";
import UserFooter from "@/components/user/UserFooter";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <UserNavbar />
      <main className="flex-1">{children}</main>
      <UserFooter />
    </div>
  );
}
