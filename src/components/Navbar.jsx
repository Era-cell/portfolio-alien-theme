import { NavLink, useLocation } from "react-router-dom";
import { logo } from "../assets/images";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className='w-16 h-16 object-contain' />
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive ?"text-blue-600": location.pathname === "/" ? "text-black" : "text-white"
          }
        >
          About
        </NavLink>
        <NavLink
          to='/projects'
          className={({ isActive }) =>
            isActive ?"text-blue-600": location.pathname === "/" ? "text-black" : "text-white"
          }
        >
          Projects
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
