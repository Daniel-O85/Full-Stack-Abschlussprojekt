// Pakete
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const sql = require("sqlite3");

// Portnummer
const PortNummer = 8899;

// Datenbank Verbindung
let db = new sql.Database("./RezeptDaten.db", (fehler) => {
    if (fehler) console.log(fehler.message);
    else
        console.log("Verbindung zur Datenbank erfolgreich aufgebaut");
});

// Routen
//  Startseite zufälliges Rezept
app.get("/hauptspeise/zufaellig", (req, res) => {
    const quelle = "SELECT * FROM RezepteHauptspeisen ORDER BY RANDOM() LIMIT 1";

    db.all(quelle, [], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows[0]);
        }
    });
});
///////////////////////////
//      VORSPEISEN      //
//////////////////////////
// Vorspeise suchen
app.get("/vorspeise/finden/:begriff", (req, res) => {
    const suchBegriff = req.params.begriff;
    const quelle = "SELECT * FROM RezepteVorspeisen WHERE Name LIKE ? || '%'";

    db.all(quelle, [suchBegriff], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Vorspeise anzeigen
app.get("/vorspeise/anzeigen/:nummer", (req, res) => {
    const rezeptNummer = req.params.nummer;
    const quelle = "SELECT * FROM RezepteVorspeisen WHERE RezeptNr = ?";

    db.all(quelle, [rezeptNummer], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Alle Vorspeisen anzeigen
app.get("/vorspeise/alleAnzeigen", (req, res) => {
    const quelle = `SELECT * FROM RezepteVorspeisen`;
    db.all(quelle, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

///////////////////////////
//     HAUPTSPEISEN     //
//////////////////////////

// Hauptspeise suchen
app.get("/hauptspeise/finden/:begriff", (req, res) => {
    const suchBegriff = req.params.begriff;
    const quelle = "SELECT * FROM RezepteHauptspeisen WHERE Name LIKE ? || '%'";

    db.all(quelle, [suchBegriff], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Hauptspeise anzeigen
app.get("/hauptspeise/anzeigen/:nummer", (req, res) => {
    const rezeptNummer = req.params.nummer;
    const quelle = "SELECT * FROM RezepteHauptspeisen WHERE RezeptNr = ?";

    db.all(quelle, [rezeptNummer], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Alle Hauptspeisen anzeigen
app.get("/hauptspeise/alleAnzeigen", (req, res) => {
    const quelle = `SELECT * FROM RezepteHauptspeisen`;
    db.all(quelle, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

///////////////////////////
//     NACHSPEISEN      //
//////////////////////////
// Nachspeise suchen
app.get("/nachspeise/finden/:begriff", (req, res) => {
    const suchBegriff = req.params.begriff;
    const quelle = "SELECT * FROM RezepteNachspeisen WHERE Name LIKE ? || '%'";

    db.all(quelle, [suchBegriff], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Nachspeisen anzeigen
app.get("/nachspeise/anzeigen/:nummer", (req, res) => {
    const rezeptNummer = req.params.nummer;
    const quelle = "SELECT * FROM RezepteNachspeisen WHERE RezeptNr = ?";

    db.all(quelle, [rezeptNummer], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Alle Nachspeisen anzeigen
app.get("/nachspeise/alleAnzeigen", (req, res) => {
    const quelle = `SELECT * FROM RezepteNachspeisen`;
    db.all(quelle, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

///////////////////////////
//        BACKEN        //
//////////////////////////
// Backen suchen
app.get("/backen/finden/:begriff", (req, res) => {
    const suchBegriff = req.params.begriff;
    const quelle = "SELECT * FROM RezepteBacken WHERE Name LIKE ? || '%'";

    db.all(quelle, [suchBegriff], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Backen anzeigen
app.get("/backen/anzeigen/:nummer", (req, res) => {
    const rezeptNummer = req.params.nummer;
    const quelle = "SELECT * FROM RezepteBacken WHERE RezeptNr = ?";

    db.all(quelle, [rezeptNummer], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Alle Backen anzeigen
app.get("/backen/alleAnzeigen", (req, res) => {
    const quelle = `SELECT * FROM RezepteBacken`;
    db.all(quelle, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});
///////////////////////////
//        SOßEN        //
//////////////////////////
// Soßen suchen
app.get("/sossen/finden/:begriff", (req, res) => {
    const suchBegriff = req.params.begriff;
    const quelle = "SELECT * FROM RezepteSossen WHERE Name LIKE ? || '%'";

    db.all(quelle, [suchBegriff], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Soßen anzeigen
app.get("/sossen/anzeigen/:nummer", (req, res) => {
    const rezeptNummer = req.params.nummer;
    const quelle = "SELECT * FROM RezepteSossen WHERE RezeptNr = ?";

    db.all(quelle, [rezeptNummer], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Alle Soßen anzeigen
app.get("/sossen/alleAnzeigen", (req, res) => {
    const quelle = `SELECT * FROM RezepteSossen`;
    db.all(quelle, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});
///////////////////////////
//    SALATE/BEILAGEN   //
//////////////////////////
// Beilagen suchen
app.get("/beilagen/finden/:begriff", (req, res) => {
    const suchBegriff = req.params.begriff;
    const quelle = "SELECT * FROM RezepteSalatBeilagen WHERE Name LIKE ? || '%'";

    db.all(quelle, [suchBegriff], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Beilagen anzeigen
app.get("/beilagen/anzeigen/:nummer", (req, res) => {
    const rezeptNummer = req.params.nummer;
    const quelle = "SELECT * FROM RezepteSalatBeilagen WHERE RezeptNr = ?";

    db.all(quelle, [rezeptNummer], (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

// Alle Beilagen anzeigen
app.get("/beilagen/alleAnzeigen", (req, res) => {
    const quelle = `SELECT * FROM RezepteSalatBeilagen`;
    db.all(quelle, (error, rows) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(rows);
        }
    });
});

///////////////////////////
//  Rezepte Bearbeiten  //
//////////////////////////
// Rezept Update
app.post("/rezept/edit/:kategorie/:nummer", (req, res) => {
    let rezId = req.params.nummer;
    let name = req.body.name;
    let kategorie = req.params.kategorie;
    let zutaten = req.body.zutaten;
    let zubereitung = req.body.zubereitung;
    let kochanleitung = req.body.kochanleitung;
    let bild = req.body.bild;

    console.log("Daten, die an den Server gesendet werden:", {
        name,
        kategorie,
        zutaten,
        zubereitung,
        kochanleitung,
        bild,
        rezId
    });

    let tabellenName;
    switch (kategorie.toLowerCase()) {
        case 'backen':
            tabellenName = 'RezepteBacken';
            break;
        case 'vorspeise':
            tabellenName = 'RezepteVorspeisen';
            break;
        case 'hauptspeise':
            tabellenName = 'RezepteHauptspeisen';
            break;
        case 'nachspeise':
            tabellenName = 'RezepteNachspeisen';
            break;
        case 'sose':
            tabellenName = 'RezepteSossen';
            break;
        case 'beilage':
            tabellenName = 'RezepteSalat-Beilagen';
            break;
        default:
            // Sende eine JSON-Antwort für ungültige Kategorie
            res.status(400).json({ fehler: "Ungültige Kategorie" });
            return;
    }

    const sql = `
        UPDATE ${tabellenName}
        SET
            Name = ?,
            Kategorie = ?,
            ZutatenMenge = ?,
            Zubereitung = ?,
            Kochanleitung = ?,
            Bild = ?
        WHERE RezeptNR = ?
    `;

    const params = [name, kategorie, zutaten, zubereitung, kochanleitung, bild, rezId];

    db.run(sql, params, (error, result) => {
        if (error) {
            console.error("Fehler beim Ausführen des SQL-Statements:", error);
            res.status(500).send("Interner Serverfehler");
        } else {
            res.json({ message: `Rezept ${name} erfolgreich gespeichert!` });
        }
    });
});


///////////////////////////
// Neues Rezept anlegen //
//////////////////////////

// Neues Rezept Speichern
app.post("/neuesRezept/:name/:kategorie", (req, res) => {
    let name = req.params.name;
    let kategorie = req.params.kategorie;
    let zutaten = req.body.zutaten;
    let zubereitung = req.body.zubereitung;
    let kochanleitung = req.body.kochanleitung;
    let bild = req.body.bild;


    // Überprüfe, welche Kategorie übergeben wurde und setze den korrekten Tabellennamen
    let tabellenName;
    switch (kategorie.toLowerCase()) {
        case 'backen':
            tabellenName = 'RezepteBacken';
            break;
        case 'vorspeise':
            tabellenName = 'RezepteVorspeisen';
            break;
        case 'hauptspeise':
            tabellenName = 'RezepteHauptspeisen';
            break;
        case 'nachspeise':
            tabellenName = 'RezepteNachspeisen';
            break;
        case 'sose':
            tabellenName = 'RezepteSossen';
            break;
        case 'beilage':
            tabellenName = 'RezepteSalatBeilagen';
            break;

        default:
            // Standardfall, wenn keine Übereinstimmung gefunden wird
            res.status(400).send("Ungültige Kategorie");
            return;
    }

    const sql = `INSERT INTO ${tabellenName} (Name, Kategorie, ZutatenMenge, Zubereitung, Kochanleitung, Bild)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [name, kategorie, zutaten, zubereitung, kochanleitung, bild], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(`Rezept ${name} erfolgreich gespeichert!`);
        }
    });
});

///////////////////////////
//    Rezept löschen    //
//////////////////////////

app.get("/rezept/entf/:nummer/:kategorie", (req, res) => {
    let Rnummer = req.params.nummer;
    let kategorie = req.params.kategorie;

    let tabellenName;
    switch (kategorie.toLowerCase()) {
        case 'backen':
            tabellenName = 'RezepteBacken';
            break;
        case 'vorspeise':
            tabellenName = 'RezepteVorspeisen';
            break;
        case 'hauptspeise':
            tabellenName = 'RezepteHauptspeisen';
            break;
        case 'nachspeise':
            tabellenName = 'RezepteNachspeisen';
            break;
        case 'sose':
            tabellenName = 'RezepteSossen';
            break;
        case 'beilage':
            tabellenName = 'RezepteSalatBeilagen';
            break;
        default:
            // Standardfall, wenn keine Übereinstimmung gefunden wird
            res.status(400).send("Ungültige Kategorie");
            return;
    }

    // Beispiel für die Definition von sql
    const sql = `DELETE FROM ${tabellenName} WHERE RezeptNr = ?`;

    db.run(sql, [Rnummer], function (err) {
        if (err) {
            console.error(err);
            res.status(500).send("Fehler beim Entfernen des Rezepts");
        } else if (this.changes === 0) {
            res.status(404).send("Rezept nicht gefunden");
        } else {
            res.send("Rezept wurde entfernt");
        }
    });
});


// Ausgabe
const newServer = app.listen(
    PortNummer,
    () => {
        console.log(`Server horcht nach http://localhost:${PortNummer}/`);
    }
);