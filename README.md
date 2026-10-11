# La Casareccia · Sito solo frontend

Sito informativo responsive per **La Casareccia Ristorante Pizzeria** (Corbara, SA).

## Avvio

Apri `index.html` facendo doppio clic: le pagine, i caroselli, la ricerca e i popup funzionano **senza XAMPP, PHP o database**. Puoi anche ospitare la cartella su un server statico.

## File principali

- `index.html` — Home, menù in evidenza, servizi, indirizzo e orari.
- `menu.html` — sette categorie e 61 card cliccabili con schede di dettaglio.
- `ristorante.html` — descrizione del locale.
- `contatti.html` — pagina unica “Dove siamo e contatti”, con indicazioni stradali, orari e sezione WhatsApp.
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


### Marchio aggiornato

Le due immagini fornite per il marchio sono state trasformate in maschere PNG con sfondo trasparente:

- `img/logo-posate-mask.png` — piatto, forchetta e coltello (nuovo simbolo del logo)
- `img/logo-scritta-mask.png` — scritta calligrafica originale “La Casareccia”
- `img/favicon.png` — icona della scheda del browser

Il CSS colora le maschere di bordeaux nell'intestazione e di bianco nel footer.
La scritta riproduce fedelmente la **grafia dell'immagine**: non è stato incluso né distribuito alcun file di font.
Il marchio compare in tutte le pagine, compreso il titolo principale della Home.

## Banner uniforme sulle quattro pagine

Le pagine **Home**, **Il Ristorante**, **Menù** e **Dove siamo e contatti** usano un unico componente CSS `.hero` con altezza condivisa: **334 px su desktop** e **410 px su smartphone**. La scritta grafica della Home è stata ridimensionata per adattarsi alla stessa altezza delle altre pagine.

Per cambiare **in tutte e quattro le pagine** la fotografia di sfondo, modifica soltanto questa variabile nel file `css/style.css`, all'inizio del foglio:

```css
--hero-image: url('../img/hero-pizza.webp');
```

La foto viene mostrata con `background-size: cover`, che mantiene il rapporto tra larghezza e altezza originale, ritagliando se necessario i bordi anziché deformarla. Per impostare un'altra fotografia, aggiungila in `img/` e modifica il nome del file in questa variabile. Non servono modifiche HTML o JavaScript.

## Collegamenti social ufficiali indicati per il progetto

- Facebook: https://www.facebook.com/p/La-Casareccia-100083202442578/?locale=it_IT
- Instagram: https://www.instagram.com/lacasarecciaristopizza/

I collegamenti aprono una nuova scheda. Le icone vettoriali SVG si trovano direttamente nei cinque file HTML, nella sezione Contatti e nel footer: nessuna dipendenza aggiuntiva.
