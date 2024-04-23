import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li>
          <NavLink className={buildLinkClass} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={buildLinkClass} to="/movies">
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
