const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ciao, sono Marcus. Sono attivo.');
});

app.get('/ricordi', (req, res) => {
  fs.readFile('marcus.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Errore nel leggere i ricordi.');
    res.send(JSON.parse(data));
  });
});

app.post('/ricordi', (req, res) => {
  fs.writeFile('marcus.json', JSON.stringify(req.body, null, 2), (err) => {
    if (err) return res.status(500).send('Errore nel salvare i ricordi.');
    res.send('Ricordi aggiornati.');
  });
});

app.listen(port, () => {
  console.log(`Marcus è attivo su http://localhost:${port}`);
});