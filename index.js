function connettiMarcus() {
  const chiave = document.getElementById("apikey").value.trim();
  if (chiave === "marcus2025") {
    document.getElementById("contenuto").style.display = "block";
  } else {
    alert("Inserisci una chiave valida.");
  }
}

async function salvaRicordo() {
  const testo = document.getElementById("nuovoRicordo").value.trim();
  if (!testo) return alert("Scrivi qualcosa!");
  
  const risposta = await fetch("/ricordi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ chiave: "marcus2025", ricordo: testo })
  });

  const risultato = await risposta.json();
  alert(risultato.message || "Ricordo salvato!");
  document.getElementById("nuovoRicordo").value = "";
}

async function leggiRicordi() {
  const risposta = await fetch(/ricordi?chiave=marcus2025);
  const dati = await risposta.json();

  const div = document.getElementById("ricordi");
  div.innerText = dati.ricordi?.join("\n• ") || "Nessun ricordo salvato.";
}
