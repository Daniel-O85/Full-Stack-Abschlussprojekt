import React, { useState, useRef, useEffect } from "react";
import "./NeuesRezept.css";

// Funktionskomponente für das Hinzufügen neuer Rezepte
export default function NeuesRezept() {
    // Zustandsvariablen mithilfe des useState-Hooks
    const [zutaten, setZutaten] = useState([{ zutat: "", menge: "" }]);
    const [selectedKategorie, setSelectedKategorie] = useState("Vorspeise");
    const inpName = useRef();
    const inpImg = useRef();
    const inpVorbereiten = useRef();
    const inpZubereiten = useRef();

    // Funktion zum Lesen von Textdaten vom Server
    function readTEXTFromServer(u, data, cb) {
        window.fetch(u, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(daten => cb(daten))
            .catch((fehler) => console.error(fehler));
    }

    // useEffect-Hook zur Initialisierung der Refs
    useEffect(() => {
        inpName.current = inpName.current || { value: "" };
        inpImg.current = inpImg.current || { value: "" };
        inpVorbereiten.current = inpVorbereiten.current || { value: "" };
        inpZubereiten.current = inpZubereiten.current || { value: "" };
    }, []);

    // Funktion zum Hinzufügen einer neuen Zutat/Menge
    function zutatenHinzu() {
        setZutaten([...zutaten, { zutat: "", menge: "" }]);
    }

    // Funktion zum Bearbeiten des Zutaten-Namens
    function handleZutatChange(index, value) {
        const aktualisierteZutaten = [...zutaten];
        aktualisierteZutaten[index].zutat = value;
        setZutaten(aktualisierteZutaten);
    }

    // Funktion zum Bearbeiten der Zutatenmenge
    function handleMengeChange(index, value) {
        const aktualisierteZutaten = [...zutaten];
        aktualisierteZutaten[index].menge = value;
        setZutaten(aktualisierteZutaten);
    }

    // Funktion zum Entfernen einer Zutat/Menge
    function zutatEntf(index) {
        const aktualisierteZutaten = [...zutaten];
        aktualisierteZutaten.splice(index, 1);
        setZutaten(aktualisierteZutaten);
    }

    // Funktion zum Senden der Rezeptdaten an die Datenbank
    function RezeptToDatenbank() {
        const kategorie = selectedKategorie.toLowerCase();
        const data = {
            name: inpName.current?.value,
            zutaten: JSON.stringify(zutaten),
            zubereitung: inpZubereiten.current?.value,
            kochanleitung: inpVorbereiten.current?.value,
            bild: inpImg.current?.value,
        };

        // Daten an den Server senden und die Serverantwort loggen
        readTEXTFromServer(`http://localhost:8899/neuesRezept/${inpName.current?.value}/${kategorie}`, data, (response) => {
            console.log(response);
        });
    }

    // JSX-Struktur für die Komponente
    return (
        <div className="neuesRezept">
            {/* Eingabefelder für Rezeptinformationen */}
            <div className="RezeptInfo">
                <input ref={inpName} type="text" placeholder="Name" />
                <br />
                <input ref={inpImg} type="text" placeholder="Bild Link" />
                <br />
                <select onChange={(e) => setSelectedKategorie(e.target.value)}>
                    <option value={"Vorspeise"}>Vorspeise</option>
                    <option value={"Hauptspeise"}>Hauptspeise</option>
                    <option value={"Nachspeise"}>Nachspeise</option>
                    <option value={"Backen"}>Backen</option>
                    <option value={"Soße"}>Soße</option>
                    <option value={"Beilage"}>Beilage</option>
                </select>
                <br />
                <button onClick={zutatenHinzu}>Zutaten/Menge +</button>
                <br />
                {/* Eingabefelder für Zutaten und Mengen */}
                {zutaten.map((zutat, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Zutat"
                            value={zutat.zutat}
                            onChange={(e) => handleZutatChange(index, e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Menge"
                            value={zutat.menge}
                            onChange={(e) => handleMengeChange(index, e.target.value)}
                        />
                        <button onClick={() => zutatEntf(index)}>x</button>
                    </div>
                ))}
            </div>
            {/* Eingabefelder für Vorbereitung und Zubereitung */}
            <div className="RezeptTexte">
                <h3>Vorbereitung</h3>
                <textarea ref={inpVorbereiten} id="inpVorbereiten"></textarea>
                <br />
                <h3>Zubereitung</h3>
                <textarea ref={inpZubereiten} id="inpZubereiten"></textarea>
                <button className="btn-hinzu" onClick={() => RezeptToDatenbank()}>Rezept Hinzufügen</button>
            </div>
        </div >
    );
}
