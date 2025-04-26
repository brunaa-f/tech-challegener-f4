// "use client";

// import { useSession } from "next-auth/react";
// import Loading from "@/components/ui/Loading";
// import HeaderInicial from "./HeaderInicial";
// import Footer from "./Footer";

// export default function LayoutInicial({ children }: Readonly<{ children: React.ReactNode }>) {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return (
//       <div className="flex items-center justify-center h-screen bg-fiap-light-green">
//         <Loading />
//       </div>
//     );
//   }

//   if (status === "authenticated") {
//     return <main className="flex flex-col">{children}</main>;
//   }

//   return (
//     <div className="flex flex-col overflow-hidden h-screen w-screen bg-gradient-to-b from-fiap-navy-blue to-white">
//       <HeaderInicial />
//       <div className="flex flex-col justify-between h-full w-full overflow-x-hidden overflow-y-scroll">
//         <main className="flex flex-col">{children}</main>
//         <Footer />
//       </div>
//     </div>
//   );
// }
