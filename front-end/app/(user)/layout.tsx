import UserNavbar from "@/components/user/UserNavbar";
import UserFooter from "@/components/user/UserFooter";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserNavbar />

      <main>
        {children}
      </main>

      <UserFooter />
    </>
  );
}