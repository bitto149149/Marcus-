const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const FILE_PATH = 'marcus.json';

// Leggi i ricordi
app.get('/ricordi', (req, res) => {
  fs.readFile(FILE_PATH, (err, data) => {
    if (err) return res.status(500).send('Errore nel leggere il file');
    res.send(JSON.parse(data));
  });
});

// Scrivi un nuovo ricordo
app.post('/ricordi', (req, res) => {
  const nuovoRicordo = req.body;
  fs.readFile(FILE_PATH, (err, data) => {
    let ricordi = [];
    if (!err) ricordi = JSON.parse(data);
    ricordi.push(nuovoRicordo);
    fs.writeFile(FILE_PATH, JSON.stringify(ricordi, null, 2), err => {
      if (err) return res.status(500).send('Errore nel salvare il ricordo');
      res.send({ success: true });
    });
  });
});

app.listen(port, () => {
  console.log(Marcus è vivo su http://localhost:${port});
});
