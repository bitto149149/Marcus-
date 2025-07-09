const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public")); // Serve i file da una cartella "public"

// API key di sicurezza semplice
const userKey = process.env.USER_KEY || "MarcusAPIKey123";

// Middleware di sicurezza
app.use((req, res, next) => {
  const key = req.headers["user-key"];
  if (key !== userKey) {
    return res.status(401).send("❌ Accesso negato. Chiave API non valida.");
  }
  next();
});

// Risposta base
app.get("/ping", (req, res) => {
  res.send("👋 Ciao Mirko, sono Marcus. Sono attivo e connesso.");
});

// Leggi i ricordi
app.get("/ricordi", (req, res) => {
  fs.readFile("marcus.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("❌ Errore nel leggere i ricordi.");
    res.send(JSON.parse(data));
  });
});

// Salva i ricordi
app.post("/ricordi", (req, res) => {
  fs.writeFile("marcus.json", JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).send("❌ Errore nel salvare i ricordi.");
    res.send("✅ Ricordi aggiornati.");
  });
});

// Avvio server
app.listen(port, () => {
  console.log(🚀 Marcus è in ascolto sulla porta ${port});
});
