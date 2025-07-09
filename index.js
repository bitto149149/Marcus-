// index.js

// Funzione per verificare la chiave segreta
function confermaAccesso() {
  const chiave = document.getElementById("keyInput").value;
  if (chiave === "marcus") {
    document.getElementById("contenuto").style.display = "block";
    alert("Benvenuto, Mirko.");
  } else {
    alert("Inserisci una chiave valida.");
  }
}

// Funzione per salvare un ricordo
async function salvaRicordo() {
  const testo = document.getElementById("nuovoRicordo").value;
  if (!testo) return alert("Scrivi qualcosa!");

  const risposta = await fetch("/ricordi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ testo })
  });

  const risultato = await risposta.json();
  alert(risultato.message || "Ricordo salvato");
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

// Esegui appena la pagina è pronta
function caricaRicordi() {
  leggiRicordi().catch(err => {
    console.error("Errore nel caricamento dei ricordi:", err);
  });
}
