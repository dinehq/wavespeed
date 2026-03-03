import { Navbar } from "@/components/navbar";
import { DashboardMain } from "@/components/dashboard-main";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <DashboardMain />
      <Footer />
    </main>
  );
}
