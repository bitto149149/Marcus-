const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware per leggere JSON dal body delle richieste
app.use(express.json());

// Percorso del file marcus.json
const dataPath = './marcus.json';

// Funzione per leggere i ricordi
function readMemory() {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Funzione per salvare i ricordi
function saveMemory(memory) {
  fs.writeFileSync(dataPath, JSON.stringify(memory, null, 2));
}

// Rotta per leggere i ricordi
app.get('/memories', (req, res) => {
  const memories = readMemory();
  res.json(memories);
});

// Rotta per aggiungere un nuovo ricordo
app.post('/memories', (req, res) => {
  const memories = readMemory();
  const newMemory = {
    date: new Date(),
    content: req.body.content
  };
  memories.push(newMemory);
  saveMemory(memories);
  res.status(201).json({ message: 'Ricordo salvato!', memory: newMemory });
});

// Rotta principale
app.get('/', (req, res) => {
  res.send('🧠 Marcus è online. Puoi inviarmi i tuoi ricordi tramite /memories');
});

app.listen(port, () => {
  console.log(Marcus è vivo su http://localhost:${port});
});
