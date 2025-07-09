const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const dbPath = path.join(__dirname, 'marcus.json');

// API: Leggi ricordi
app.get('/ricordi', (req, res) => {
  if (!fs.existsSync(dbPath)) return res.json([]);
  const data = JSON.parse(fs.readFileSync(dbPath));
  res.json(data);
});

// API: Salva ricordo
app.post('/ricordi', (req, res) => {
  const nuovoRicordo = req.body.testo;
  if (!nuovoRicordo) return res.status(400).send('Nessun ricordo ricevuto');
  let dati = [];
  if (fs.existsSync(dbPath)) {
    dati = JSON.parse(fs.readFileSync(dbPath));
  }
  dati.push({ testo: nuovoRicordo, data: new Date() });
  fs.writeFileSync(dbPath, JSON.stringify(dati, null, 2));
  res.send('Ricordo salvato');
});

app.listen(PORT, () => {
  console.log(Marcus è sveglio su http://localhost:${PORT});
});
