import HeaderInicial from "@/components/layout/HeaderInicial";
import LoginForm from "./LoginForm";
import Footer from "@/components/layout/Footer";

export default function Index() {
  return (
    <main className="flex flex-col overflow-hidden h-screen w-screen bg-gradient-to-b from-fiap-navy-blue to-white">
      <HeaderInicial />
      <div className="flex flex-col justify-between h-full w-full overflow-x-hidden overflow-y-scroll">
        <div className="flex flex-col">
          <div className="flex justify-center w-full h-full sm:p-10 max-sm:py-5">
            <LoginForm />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
