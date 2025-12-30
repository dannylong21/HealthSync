import SearchTab from "./searchBar";
import Logo from "./logo";

const Header = () => {
  return (
    <div className="w-full h-16 bg-gray-600 flex items-center justify-between">
      <div className="ml-4 flex items-center">
      <Logo />
      <h1 className="text-white text-2xl font-bold">HealthSync</h1>
        </div>

    </div>
  );
}

export default Header;