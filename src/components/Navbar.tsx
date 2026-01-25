import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-20 flex items-center justify-between border-b font-medium bg-white">
      <h1 className="text-xl lg:text-4xl font-bold tracking-tighter pl-8">
        eNearby
      </h1>
      <div className="h-full flex items-center">
        <Link
          href="#"
          className="h-full flex items-center justify-center px-12 border-l hover:bg-primary hover:text-secondary transition-colors">
          Sign In
        </Link>
        <Link
          href="#"
          className="h-full flex items-center justify-center bg-pink-400 border-l px-12 hover:bg-pink-400/80 transition-colors">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
