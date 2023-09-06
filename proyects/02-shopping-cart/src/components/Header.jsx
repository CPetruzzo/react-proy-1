import { Filters } from "./Filters.jsx";
import "./Header.css";

export function Header() {
  return (
    <header className="Header">
      {/* <h1>React Shop 🛒</h1> */}
      <picture>
        <source srcSet="https://sparkly-crisp-736a93.netlify.app/libreriacivica.png" media="(max-width: 600px)" />
        <img src="https://sparkly-crisp-736a93.netlify.app/libreriacivica.png" alt="logo" />
      </picture>{" "}
      <Filters />
    </header>
  );
}
