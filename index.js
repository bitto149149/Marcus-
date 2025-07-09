// index.js

// Funzione per verificare la chiave segreta
function confermaAccesso() {
  const chiave = document.getElementById("keyInput").value;
  if (chiave === "marcus") {
    document.getElementById("contenuto").style.display = "block";
    parla("Benvenuto Mirko, sono pronto.");
  } else {
    parla("Chiave non riconosciuta.");
    alert("Inserisci una chiave valida.");
  }
}

// Funzione per far parlare Marcus
function parla(testo) {
  const synth = window.speechSynthesis;
  const voce = new SpeechSynthesisUtterance(testo);
  voce.lang = "it-IT"; // Italiano
  voce.pitch = 1;
  voce.rate = 1;
  voce.volume = 1;
  synth.speak(voce);
}

// Funzione per salvare un ricordo
async function salvaRicordo() {
  const testo = document.getElementById("nuovoRicordo").value;
  if (!testo) {
    parla("Scrivi qualcosa prima di salvarlo.");
    return alert("Scrivi qualcosa!");
  }

  const risposta = await fetch("/ricordi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ testo })
  });

  const risultato = await risposta.text();
  parla("Ho memorizzato il tuo pensiero.");
  document.getElementById("nuovoRicordo").value = "";
  caricaRicordi();
}

// Funzione per caricare i ricordi esistenti
async function leggiRicordi() {
  const risposta = await fetch("/ricordi");
  const dati = await risposta.json();

  const div = document.getElementById("listaRicordi");
  div.innerHTML = dati
    .map(r => <p><strong>${new Date(r.data).toLocaleString()}</strong>: ${r.testo}</p>)
    .join("\n");
}

// Caricamento iniziale dei ricordi
function caricaRicordi() {
  leggiRicordi().catch(err => {
    console.error("Errore nel caricamento dei ricordi:", err);
    parla("C'è stato un errore nel leggere i miei ricordi.");
  });
}
