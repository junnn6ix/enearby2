import Navbar from "@/components/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="w-[95vw] lg:w-[90vw] mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
