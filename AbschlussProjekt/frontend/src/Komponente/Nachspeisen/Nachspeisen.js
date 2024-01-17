// Importieren der benötigten Module und Styles
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "./Nachspeisen.css";

// Funktionskomponente für Nachspeisen
export default function Nachspeisen() {

    // Zustandsvariablen mithilfe des useState-Hooks
    const [rezeptFinden, setRezeptFinden] = useState([]);
    const [rezeptAnzeigen, setRezeptAnzeigen] = useState([]);
    const [alleRezepteAnzeigen, setAlleRezepteAnzeigen] = useState([]);
    const [suchbegriff, setSuchbegriff] = useState("");
    const [AnAUS, setAnAUS] = useState(false);
    const [alleRezepteSichtbar, setAlleRezepteSichtbar] = useState(true);
    const [bearbeitungsModus, setBearbeitungsModus] = useState({});
    const [aktuellerRezeptNr, setAktuellerRezeptNr] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const { rezeptId } = useParams();
    const [aktualisierteDaten, setAktualisierteDaten] = useState({

        name: "",
        bild: "",
        kategorie: "",
        zubereitung: "",
        kochanleitung: "",
    });

    // Funktion zum Abrufen von JSON-Daten vom Server
    function readJSONFromServer(url, cb) {
        window
            .fetch(url)
            // Antwort erhalten und als Text weiterreichen
            .then((response) => response.json())
            // Die weitergereichte Information an die Callback-Funktion übergeben
            .then((data) => cb(data))
            // Falls ein Fehler aufteten sollte, diese auf der Konsole ausgegeben
            .catch((error) => console.error(error));
    }

    // Funktion zum Abrufen von reinem Textdaten vom Server
    function readTEXTFromServer(url, cb) {
        // Anfrage an den Server schicken
        window.fetch(url)
            // Antwort erhalten und als Text weiterreichen
            .then(rohdaten => rohdaten.text())
            // Die weitergereichte Information an die Callback-Funktion übergeben
            .then(data => cb(data))
            // Falls ein Fehler aufteten sollte, diese auf der Konsole ausgegeben
            .catch((fehler) => console.error(fehler));
    }

    // useEffect-Hook zum Umgang mit Änderungen in rezeptId
    useEffect(() => {
        if (rezeptId) {
            zumRezept(rezeptId);
        }
        // ...
    }, [rezeptId]);

    // Funktion zum Suchen von Rezepten
    function suchen(begriff) {
        readJSONFromServer(
            `http://localhost:8899/nachspeise/finden/${begriff}`,
            (respond) => {
                const daten = respond.map((row) => (
                    <li key={row.RezeptNr}>
                        <p>{row.Name}</p>
                        <p>
                            <img src={row.Bild} alt={row.Name} />
                        </p>
                        <button onClick={() => zumRezept(row.RezeptNr, begriff)}>
                            zum Rezept
                        </button>
                        <hr />
                    </li>
                ));
                setRezeptFinden(daten);
            }
        );
    }

    // Funktion zum Zurückkehren zur Hauptrezeptliste
    function zuruek() {
        setAnAUS(false);
        setAlleRezepteSichtbar(true);
        setAktuellerRezeptNr(null);
    }

    // Funktion zum Umschalten des Bearbeitungsmodus für ein Rezept
    function bearbeiten(rezeptNr) {
        setBearbeitungsModus((prevModus) => {
            const neuerModus = {
                ...prevModus,
                [rezeptNr]: !prevModus[rezeptNr],
            };
            // Wenn der Bearbeitungsmodus ausgeschaltet wird, die aktualisierten Daten zurücksetzen
            if (!neuerModus[rezeptNr]) {
                setAktualisierteDaten({
                    name: "",
                    bild: "",
                    kategorie: "",
                    zubereitung: "",
                    kochanleitung: "",
                });
            }
            return neuerModus;
        });
    }

    // Funktion zum Sammeln von Formulardaten zum Speichern oder Aktualisieren eines Rezepts
    function sammleDaten() {
        // Daten aus den Formulareingaben extrahieren
        const zutatenArray = document.getElementById('zutatenInput').value.split('\n');
        const zutatenJSON = JSON.stringify(zutatenArray.map(zutat => {
            let [zutatName, menge] = zutat.split('menge:').map(item => item.trim());

            if (zutatName.startsWith('zutat:')) {
                zutatName = zutatName.replace('zutat:', '').trim();
            }

            return { zutat: zutatName, menge };
        }));

        return {
            name: document.getElementById('nameInput').value,
            bild: document.getElementById('bildInput').value,
            zubereitung: document.getElementById('zubereitungInput').value,
            kochanleitung: document.getElementById('kochanleitungInput').value,
            zutaten: zutatenJSON,
        };
    }

    // Funktion zum Speichern oder Aktualisieren eines Rezepts
    function speichern() {
        // Daten an den Server senden
        const aktualisierteDaten = sammleDaten();
        const selectedCategory = document.getElementById("meinSelectElement").value;
        const rezeptNr = aktuellerRezeptNr; // RezeptNr aus dem Zustand abrufen

        console.log("Daten, die an den Server gesendet werden:", {
            RezeptNr: rezeptNr, // Hinzufügen der RezeptNr zum Datenobjekt
            name: aktualisierteDaten.name,
            bild: aktualisierteDaten.bild,
            kategorie: selectedCategory,
            zutaten: aktualisierteDaten.zutaten,
            zubereitung: aktualisierteDaten.zubereitung,
            kochanleitung: aktualisierteDaten.kochanleitung,
        });

        // Den ausgewählten Wert verwenden
        fetch(`http://localhost:8899/rezept/edit/${selectedCategory}/${rezeptNr}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: aktualisierteDaten.name,
                bild: aktualisierteDaten.bild,
                kategorie: selectedCategory,
                zutaten: aktualisierteDaten.zutaten,
                zubereitung: aktualisierteDaten.zubereitung,
                kochanleitung: aktualisierteDaten.kochanleitung,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.error(error));

        // Zustand und Benutzeroberfläche aktualisieren
        setAnAUS(false);
        setAlleRezepteSichtbar(true);
        setAktuellerRezeptNr(null);
    }

    // Funktion zum Löschen eines Rezepts
    function rezeptLoeschen(rezeptNr) {
        // Anfrage zum Löschen eines Rezepts an den Server senden
        const kategorieSelect = document.getElementById('meinSelectElement');
        const kategorie = kategorieSelect.value;

        readTEXTFromServer(`http://localhost:8899/rezept/entf/${rezeptNr}/${kategorie}`, (responseText) => {
            // Erstellen des Paragraph-Elements für die Nachricht
            const paragraph = document.createElement("p");
            paragraph.classList.add("delete-Rezept");
            paragraph.textContent = responseText;
            paragraph.style.color = "green";

            // Finden des Buttons, bevor der Paragraph eingefügt wird
            const button = document.querySelector('.loeschen');

            // Einfügen des Paragraph-Elements vor dem Button
            button.parentNode.insertBefore(paragraph, button);

            setTimeout(() => {
                window.location.reload();
            }, 2000);

            // Aktualisieren der Benutzeroberfläche
        }, (error) => {
            console.error('Fehler beim Löschen des Rezepts:', error);

        });
    }

    // Funktion zum Anzeigen von Details zu einem Rezept
    function zumRezept(nummer) {
        const inpSuche = document.getElementById("suchInput");
        setAktuellerRezeptNr(nummer);

        readJSONFromServer(
            `http://localhost:8899/nachspeise/anzeigen/${nummer}`,
            (respond) => {
                const daten = respond.map((row) => {
                    let zutatenMengeWerte = '';

                    try {
                        const zutatenObjekt = JSON.parse(row.ZutatenMenge);

                        if (bearbeitungsModus[row.RezeptNr]) {
                            // Im Bearbeitungsmodus: Zutaten als formatierter Text
                            zutatenMengeWerte = zutatenObjekt.map(zutat => `zutat: ${zutat.zutat}  menge: ${zutat.menge}`).join('\n');
                        } else {
                            // Im normalen Modus: Zutaten als Liste
                            zutatenMengeWerte = zutatenObjekt.map((zutat, index) => (
                                <React.Fragment key={index}>
                                    {`${zutat.zutat}: ${zutat.menge}`}
                                    <br />
                                </React.Fragment>
                            ));
                        }
                    } catch (error) {
                        console.error('Fehler beim Parsen von ZutatenMenge:', error);
                    }
                    return (
                        <li key={row.RezeptNr} className="bearbeiten">
                            {bearbeitungsModus[row.RezeptNr] ? (
                                <>
                                    <input
                                        id="nameInput"
                                        type="text"
                                        defaultValue={aktualisierteDaten.name || row.Name}
                                        onChange={(e) =>
                                            setAktualisierteDaten({
                                                ...aktualisierteDaten,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <input
                                        id="bildInput"
                                        type="text"
                                        defaultValue={aktualisierteDaten.bild || row.Bild}
                                        onChange={(e) =>
                                            setAktualisierteDaten({
                                                ...aktualisierteDaten,
                                                bild: e.target.value,
                                            })
                                        }
                                    />
                                    <br />
                                    <select
                                        id="meinSelectElement"
                                    >
                                        <option value={"Vorspeise"}>Vorspeise</option>
                                        <option value={"Hauptspeise"}>Hauptspeise</option>
                                        <option value={"Nachspeise"} selected>Nachspeise</option>
                                        <option value={"Backen"}>Backen</option>
                                        <option value={"Sose"}>Soße</option>
                                        <option value={"Beilage"}>Beilage</option>
                                    </select>
                                    <br />
                                    <textarea
                                        id="zutatenInput"
                                        defaultValue={zutatenMengeWerte}
                                        onChange={(e) =>
                                            setAktualisierteDaten({
                                                ...aktualisierteDaten,
                                                zutaten: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                    <br />
                                    <textarea
                                        id="kochanleitungInput"
                                        defaultValue={aktualisierteDaten.kochanleitung || row.Kochanleitung}
                                        onChange={(e) =>
                                            setAktualisierteDaten({
                                                ...aktualisierteDaten,
                                                kochanleitung: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                    <br />
                                    <textarea
                                        id="zubereitungInput"
                                        defaultValue={aktualisierteDaten.zubereitung || row.Zubereitung}
                                        onChange={(e) =>
                                            setAktualisierteDaten({
                                                ...aktualisierteDaten,
                                                zubereitung: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                </>
                            ) : (
                                <>
                                    <p>{row.Name}</p>
                                    <p><img src={row.Bild} alt={row.Name} /></p>
                                    <p>Zutaten: <br />{zutatenMengeWerte}</p>
                                    <p>Vorbereitung: <br />{row.Kochanleitung}</p>
                                    <p>Zubereitung: <br />{row.Zubereitung}</p>
                                </>
                            )}
                            <hr />
                            <button onClick={() => {
                                bearbeiten(row.RezeptNr); // Zuerst den Bearbeitungsmodus beenden
                                zuruek(); // Dann zurückspringen
                            }}>
                                {bearbeitungsModus[row.RezeptNr] ? "Abbrechen" : "Zurück"}
                            </button>
                            <button onClick={() => bearbeitungsModus[row.RezeptNr] ? speichern() : bearbeiten(row.RezeptNr)}>
                                {bearbeitungsModus[row.RezeptNr] ? "Speichern" : "Bearbeiten"}
                            </button>
                            <button className={bearbeitungsModus[row.RezeptNr] ? "loeschen" : "none"} onClick={() => rezeptLoeschen(row.RezeptNr)}>
                                Löschen
                            </button>
                        </li>
                    );
                });

                setRezeptAnzeigen(daten);
                setRezeptFinden([]);
                inpSuche.value = "";
                setAnAUS(true);
                setAlleRezepteSichtbar(false);
            }
        );
    }

    // Funktion zum Anzeigen aller Rezepte
    function alleRezepte() {
        readJSONFromServer(`http://localhost:8899/nachspeise/alleAnzeigen`, (respond) => {
            const daten = respond.map((row) => (
                <div key={row.RezeptNr}>
                    <p>{row.Name}</p>
                    <p>
                        <img src={row.Bild} alt={row.Name} />
                    </p>
                    <button onClick={() => zumRezept(row.RezeptNr)}>zum Rezept</button>
                    <hr />
                </div>
            ));

            // Daten verarbeiten und Zustand aktualisieren
            setAlleRezepteAnzeigen(daten);
            setUpdateTrigger((prev) => !prev); // Aktualisieren Sie den Trigger, um die Komponente zu re-rendern
        });
    }

    // useEffect-Hook für die erste Renderung und Aktualisierungen
    useEffect(() => {
        alleRezepte();
        if (aktuellerRezeptNr !== null) {
            zumRezept(aktuellerRezeptNr);
        }
    }, [bearbeitungsModus, aktuellerRezeptNr]);

    // JSX-Struktur für die Komponente
    return (
        <div className="nachspeisen">
            <div>
                <div className="vorspeisen-anzeige">
                    <input
                        id="suchInput"
                        type="search"
                        placeholder="Rezept suchen"
                        defaultValue={suchbegriff}
                        onKeyUp={(e) => suchen(e.target.value)}
                    />
                    <ul>{rezeptFinden}</ul>
                </div>
                <div className={alleRezepteSichtbar ? "alleRezepte" : "alleRezepteVersteckt"}>
                    {alleRezepteAnzeigen}
                </div>
            </div>
            <div className={AnAUS ? "rezeptAnzeigen" : "rezeptAusblenden"}>
                <ul>{rezeptAnzeigen}</ul>
            </div>
        </div>
    );
}
