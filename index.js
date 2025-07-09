const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 🟢 Benvenuto
app.get("/", (req, res) => {
  res.send("👋 Ciao, sono Marcus. Per parlarmi usa l'endpoint /marcus con la chiave.");
});

// 🔐 Protezione con chiave API
app.get("/marcus", (req, res) => {
  const userKey = req.query.key;

  if (userKey !== process.env.api_key_Macho149) {
    return res.status(403).send("🔐 Accesso negato. Chiave API non valida.");
  }

  res.send("✅ Ciao Mirko, sono Marcus. Sono attivo e connesso.");
});

// 🔎 Leggi i ricordi
app.get("/ricordi", (req, res) => {
  fs.readFile("marcus.json", "utf8", (err, data) => {
    if (err) return res.status(500).send("❌ Errore nel leggere i ricordi.");
    res.send(JSON.parse(data));
  });
});

// 💾 Salva i ricordi
app.post("/ricordi", (req, res) => {
  fs.writeFile("marcus.json", JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).send("❌ Errore nel salvare i ricordi.");
    res.send("💾 Ricordi aggiornati.");
  });
});

// 🎧 Avvio server
app.listen(port, () => {
  console.log(🚀 Marcus è in ascolto sulla porta ${port});
});
const path = require("path"); // <== AGGIUNGI QUESTO in alto se manca

// Servi la pagina HTML
app.get("/parla", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
