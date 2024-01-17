import React, { useEffect, useState } from "react";
import "./Startseite.css";
import axios from "axios";

// Funktionskomponente für die Startseite
export default function Startseite() {
    // Zustandsvariablen für Rezept und Rezeptdetails
    const [rezept, setRezept] = useState(null);
    const [rezeptDetails, setRezeptDetails] = useState(null);

    // useEffect-Hook für die Initialisierung beim ersten Laden der Seite
    useEffect(() => {
        // API-Aufruf zum Laden eines zufälligen Rezepts
        axios.get('http://localhost:8899/hauptspeise/zufaellig')
            .then(response => {
                // Daten aus der API-Antwort extrahieren und verarbeiten
                const data = response.data;
                let zutatenMengeWerte = '';

                // Versuche, die ZutatenMenge zu parsen und formatieren
                try {
                    const zutatenObjekt = JSON.parse(data.ZutatenMenge);
                    zutatenMengeWerte = zutatenObjekt.map((zutat, index) => (
                        <React.Fragment key={index}>
                            {`${zutat.zutat}: ${zutat.menge}`}<br />
                        </React.Fragment>
                    ));
                } catch (error) {
                    console.error('Fehler beim Parsen von ZutatenMenge:', error);
                }

                // Setze den Zustand für das aktuelle Rezept
                setRezept({
                    ...data,
                    zutatenMengeWerte: zutatenMengeWerte
                });
            })
            .catch(error => {
                console.error('Fehler beim Laden des Rezepts:', error);
            });
    }, []);

    // Funktion zum Zurücksetzen der Rezeptdetails
    const zurueck = () => {
        setRezeptDetails(null);
    };

    // Funktion zum Laden und Anzeigen der Details für ein bestimmtes Rezept
    const zumRezept = (nummer) => {
        axios.get(`http://localhost:8899/hauptspeise/anzeigen/${nummer}`)
            .then(response => {
                // Verarbeite die Daten der Antwort und setze rezeptDetails
                setRezeptDetails(response.data);
            })
            .catch(error => {
                console.error('Fehler beim Laden des Rezepts:', error);
            });
    };

    // JSX-Struktur für die Komponente
    if (!rezept) {
        return <div>Lädt...</div>;
    }

    return (
        <div className="startseite">
            {/* Anzeige des zufälligen Rezepts */}
            <div className="rezept-start">
                <h1>Empfehlung des Tages</h1>
                <h3>{rezept.Name}</h3>
                <p>
                    <img src={rezept.Bild} alt={rezept.Name} />
                </p>
                <button onClick={() => zumRezept(rezept.RezeptNr)}>zum Rezept</button>
            </div>
            {/* Anzeige der Rezeptdetails, wenn vorhanden */}
            {rezeptDetails && (
                <div>
                    <div className="rezept-details">
                        <p>{rezept.Name}</p>
                        <p>
                            <img src={rezept.Bild} alt={rezept.Name} />
                        </p>
                        <p>Zutaten: <br />{rezept.zutatenMengeWerte}</p>
                        <p>Vorbereitung: <br />{rezept.Kochanleitung}</p>
                        <p>Zubereitung: <br />{rezept.Zubereitung}</p>
                        <button onClick={zurueck}>zurück</button>
                    </div>
                </div>
            )}
        </div>
    );
}