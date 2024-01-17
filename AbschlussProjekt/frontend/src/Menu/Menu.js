import { Outlet, Link } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
    return (
        <>
            <header>
                <h3>RezAPPt</h3>
                <ul>
                    <li>
                        <img src={"https://cdn-icons-png.flaticon.com/128/2276/2276931.png?uid=R103053098&ga=GA1.1.611708852.1684318471&track=ais"} alt={"Logo"} />

                    </li>
                    <li>
                        <Link to="/">Startseite</Link>
                    </li>
                    <li>
                        <Link to="/vorspeisen">Vorspeisen</Link>
                    </li>
                    <li>
                        <Link to="/hauptspeisen">Hauptspeisen</Link>
                    </li>
                    <li>
                        <Link to="/nachspeisen">Nachspeisen</Link>
                    </li>
                    <li>
                        <Link to="/backen">Backen</Link>
                    </li>
                    <li>
                        <Link to="/sossen">Soßen</Link>
                    </li>
                    <li>
                        <Link to="/salatBeilagen">Salate / Beilagen</Link>
                    </li>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
            <footer >
                <p className="copy">Copyright&copy; by Daniel Ottinger</p>
                <p className="newRez"> <Link to="/neuesRezept">Rezept hinzufügen</Link></p>
            </footer>
        </>
    );
}
