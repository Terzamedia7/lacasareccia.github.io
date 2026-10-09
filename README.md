# La Casareccia · Sito solo frontend

Sito informativo responsive per **La Casareccia Ristorante Pizzeria** (Corbara, SA).

## Avvio

Apri `index.html` facendo doppio clic: le pagine, i caroselli, la ricerca e i popup funzionano **senza XAMPP, PHP o database**. Puoi anche ospitare la cartella su un server statico.

## File principali

- `index.html` — Home, menù in evidenza, servizi, indirizzo e orari.
- `menu.html` — sette categorie e 61 card cliccabili con schede di dettaglio.
- `ristorante.html` — descrizione del locale.
- `galleria.html` — galleria di immagini illustrative.
- `contatti.html` — contatti, indicazioni stradali, orari e sezione WhatsApp.
- `privacy.html` — note e trasparenza sul sito.
- `css/style.css` — tutto lo stile, inclusi desktop/mobile e popup.
- `js/script.js` — menu mobile, caroselli, ricerca, dettagli, popup e attivazione WhatsApp.
- `js/menu-data.js` — catalogo dimostrativo, indipendente dal server.
- `js/site-config.js` — numero WhatsApp da configurare quando viene confermato.
- `img/` — logo e fotografie illustrative locali.

## Come funzionano le prenotazioni

I pulsanti **Prenota al telefono** aprono un popup informativo. Il bottone **Chiama ora** usa `tel:+39081930964`. Il secondo bottone porta a `contatti.html#prenota-whatsapp`.

La sezione **Prenota tramite WhatsApp** è già progettata ma **non pubblica un link WhatsApp** finché il titolare non conferma il numero abilitato. Per attivarlo, apri `js/site-config.js` e inserisci `whatsappNumber` nel formato internazionale, senza il simbolo `+` e senza spazi. Ad esempio per un ipotetico numero italiano si scriverebbe `39...` seguito dal numero completo. Dopo aver salvato, il bottone **Apri WhatsApp** comparirà automaticamente.

La chat verrà aperta con un messaggio precompilato e la prenotazione sarà valida solo dopo conferma del ristorante. Non ci sono form, account, PHP o archivi di dati personali nel progetto.

## Menù e dati non verificati

Il menù (`js/menu-data.js`) contiene **7 categorie e 61 card dimostrative**. Le fotografie sono illustrative; ingredienti, prezzi, allergeni e alcune proposte non sono stati verificati con un menù ufficiale leggibile. Aggiorna i contenuti solo dopo conferma del ristorante. Per ciascun piatto imposta `verified: true` solo dopo aver verificato tutti i dati che vuoi pubblicare.

## Requisiti

Qualunque browser moderno con HTML5, CSS e JavaScript. Nessuna dipendenza esterna obbligatoria. Per provare il responsive, apri gli strumenti sviluppatore del browser e attiva la vista dispositivo, oppure apri il sito direttamente da un telefono.
