import { Navbar } from "@/components/navbar";
import { DashboardMain } from "@/components/dashboard-main";
import { Footer } from "@/components/footer";

export default function DashboardPage() {
  return (
    <main>
      <Navbar />
      <DashboardMain />
      <Footer />
    </main>
  );
}
