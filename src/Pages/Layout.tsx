import { Outlet, Link } from "react-router-dom";
import "../App.css";

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Opening">Öppningsrutin</Link>
          </li>
          <li>
            <Link to={"/Closning"}>Stängningsrutin</Link>
          </li>
          <li>
            <Link to={"/Weekly"}>Veckorutin</Link>
          </li>
          <li>
            <Link to="/Monthly">Månadsrutin</Link>
          </li>
          <li>
            <Link to="/Special">Special</Link>
          </li>
          <li>
            <Link to={"/Summary"}>Tidigare rutiner</Link>
          </li>
          <li>
            <Link to={"/Upload"}>Ladda upp</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

export default Layout;
