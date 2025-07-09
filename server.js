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
  if (!req.query.chiave || req.query.chiave !== 'marcus2025') {
    return res.status(403).json({ error: 'Accesso negato' });
  }

  if (!fs.existsSync(dbPath)) return res.json({ ricordi: [] });

  const dati = JSON.parse(fs.readFileSync(dbPath));
  const ricordi = dati.map(entry => 📝 ${entry.testo} (📅 ${new Date(entry.data).toLocaleString('it-IT')}));
  res.json({ ricordi });
});

// API: Salva ricordo
app.post('/ricordi', (req, res) => {
  const { chiave, ricordo } = req.body;
  if (chiave !== 'marcus2025') return res.status(403).json({ error: 'Chiave non valida' });
  if (!ricordo) return res.status(400).send('Nessun ricordo ricevuto');

  let dati = [];
  if (fs.existsSync(dbPath)) {
    dati = JSON.parse(fs.readFileSync(dbPath));
  }

  dati.push({ testo: ricordo, data: new Date() });
  fs.writeFileSync(dbPath, JSON.stringify(dati, null, 2));
  res.send({ message: 'Ricordo salvato' });
});

app.listen(PORT, () => {
  console.log(Marcus è sveglio su http://localhost:${PORT});
});
