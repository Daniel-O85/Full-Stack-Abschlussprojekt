import "./App.css";
import "./Komponente/Responsiv.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Menu/Menu";
import Startseite from "./Komponente/Startseite/Startseite";
import Vorspeisen from "./Komponente/Vorspeisen/Vorspeisen";
import Hauptspeisen from "./Komponente/Hauptspeisen/Hauptspeisen";
import Nachspeisen from "./Komponente/Nachspeisen/Nachspeisen";
import Backen from "./Komponente/Backen/Backen";
import Sossen from "./Komponente/Sossen/Sossen";
import Beilagen from "./Komponente/Beilagen/Beilagen";
import NeuesRezept from "./Komponente/NeuesRezept/NeuesRezept";




export default function App() {
  const eingeloggt = sessionStorage.getItem("eingeloggt");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/" element={<Startseite />} />
          <Route path="/vorspeisen" element={<Vorspeisen />} />
          <Route path="/hauptspeisen" element={<Hauptspeisen />} />
          <Route path="/nachspeisen" element={<Nachspeisen />} />
          <Route path="/backen" element={<Backen />} />
          <Route path="/sossen" element={<Sossen />} />
          <Route path="/salatBeilagen" element={<Beilagen />} />
          <Route path="/neuesRezept" element={<NeuesRezept />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
