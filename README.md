# VIVO Bracelet

Sito riprogettato sui toni del blu, con il logo originale fornito e i contenuti originali in italiano e inglese.

## Aprire il sito

Fare doppio clic su **`index.html`**: si apre nel browser, senza installare nulla e senza server.
Serve una connessione a internet per i font (Google Fonts) e per Three.js (CDN jsDelivr); senza rete il sito funziona comunque e al posto del 3D compare un'immagine.

## Pubblicare

Caricare la cartella così com'è su un qualsiasi hosting statico (bastano `index.html`, `src/` e `img/`).
I percorsi sono relativi: il sito può stare anche in una sottocartella.

`src/model-data.js` contiene il modello GLB e il decoder Draco incorporati (generati da `public/models` e `public/draco`): così il 3D funziona anche aprendo il file direttamente. Se si riesporta il modello, va rigenerato.

## Demo 3D

- Modello originale convertito dalla scena **VIVO - Dettagli da fotografie** del file Blender fornito.
- Otto gruppi reali: cassa/cinturino, bobina, ricevitore, sensori, batteria, scheda, display e vetro.
- Parte assemblato, senza riquadro. Il puntatore deve incontrare la geometria del bracciale per aprirlo: lo spazio vuoto non attiva l'animazione. Allontanando il puntatore dal modello si ricompone.
- **Scomponi / Ricomponi** compare soltanto su telefono (fino a 700 px). Con la tastiera si può selezionare il modello e premere Invio o Spazio. Un'apertura effettuata col pulsante o con la tastiera rimane attiva fino alla chiusura.
- Il modello è allineato a sinistra; gli otto nomi compaiono in un'unica colonna alla sua destra.
- Il logo usato dal sito è `img/vivo-logo-clear.png`: ricavato da `vivo-logo.png` (che resta intatto), senza sfondo bianco e ritagliato. In tema scuro le parti nere diventano chiare tramite CSS.
- `Esc` ricompone il modello. La preferenza di sistema per ridurre i movimenti è rispettata.
- I modelli si fermano fuori schermo o quando la scheda del browser è nascosta.
- Il file `.blend` originale non viene modificato. Il GLB è compresso con Draco; i piccoli inserti e il tracciato del display riprendono il rosso VIVO.

## File principali

- `index.html`: contenuti e struttura. Ordine: hero → bracciale 3D → problema → soluzione → funzionamento → app → affidabilità → tecnologia → futuro.
- `src/navbar.js`: barra di navigazione in stile liquid glass (`<vivo-navbar>`): markup, stili e logica in un unico file. Indicatore che scorre tra le voci, riflesso che segue il puntatore, barra di lettura, menu mobile.
- `src/style.css`: veste grafica e layout responsive (sostituisce `base.css` e `design.css`).
- `src/motion.js`: animazioni allo scroll (cascate, linea dei passaggi, contatore numeri, parallasse hero).
- `src/app.js`: traduzioni e simulazione dell'app, con cambio tema a cerchio (View Transitions) e anello del conto alla rovescia.
- `src/main.js`: punto d'ingresso; tastiera delle schede e caricamento del 3D.
- `src/model.js`: caricamento, materiali, animazione ed etichette 3D.
- `public/models/vivo-bracelet.glb`: modello pronto per il web, circa 1,1 MB.
- `scripts/export_model.py`: conversione ripetibile con Blender 5.1; da eseguire dopo aver aperto il file sorgente in background.
- `.backup/index.original.html`: copia locale del sito prima delle modifiche.

## Verifiche

```sh
npm install
npm test
```

I test usano Microsoft Edge installato su Windows. Controllano apertura/chiusura 3D, otto etichette, touch, tastiera, traduzioni, tema scuro, simulazione della caduta, annullamento, assenza di overflow a diverse larghezze e conservazione dei testi originali. Le schermate di verifica vengono salvate in `.backup`.
