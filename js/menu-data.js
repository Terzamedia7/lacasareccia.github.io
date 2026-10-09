/*
 * Catalogo modificabile — dati ricostruiti per il prototipo.
 * ATTENZIONE: non sono stati verificati con un menù ufficiale leggibile.
 * Inserire ingredienti/prezzi/allergeni solo dopo conferma del ristorante.
 * La proprietà image fa riferimento a fotografie ILLUSTRATIVE.
 */
(function () {
  'use strict';
  const makeItems = (names, photoPrefix, total, defaultText) => names.map((name, index) => ({
    id: `${photoPrefix}-${index + 1}`,
    name,
    image: `img/food/${photoPrefix}-${(index % total) + 1}.webp`,
    description: defaultText,
    ingredients: null,
    allergens: null,
    price: null,
    verified: false
  }));
  window.CASARECCIA_MENU = [
    {
      id: 'pizza', label: 'Pizze', subtitle: 'Classiche e speciali', icon: 'pizza',
      items: makeItems([
        'Margherita', 'Marinara', 'Napoli', 'Romana', 'Capricciosa', 'Diavola',
        'Quattro stagioni', 'Quattro formaggi', 'Prosciutto', 'Würstel',
        'Tonno e cipolla', 'Spinaci', 'Salsiccia e friarielli', 'Vegetariana',
        'Crudo', 'Bresaola', 'Bufalina', 'Parmigiana', 'Frutti di mare',
        'Calzone', 'Calzone farcito', 'Pizza al metro'
      ], 'pizza', 8, 'Pizza della categoria pizze. Chiedi al personale ingredienti e varianti disponibili.')
    },
    {
      id: 'calzoni', label: 'Calzoni', subtitle: 'Ripieni di gusto', icon: 'bread',
      items: makeItems([
        'Classico', 'Farcito', 'Ripieno', 'Prosciutto e funghi',
        'Quattro formaggi', 'Vegetariano'
      ], 'calzone', 6, 'Calzone ripieno. Preparazione e ingredienti da confermare con il ristorante.')
    },
    {
      id: 'panuozzi', label: 'Panuozzi', subtitle: 'Proposte da confermare', icon: 'bread',
      items: makeItems([
        'Panuozzo classico', 'Panuozzo ripieno', 'Panuozzo farcito',
        'Panuozzo con wurstel', 'Panuozzo salsiccia e friarielli', 'Panuozzo bresaola'
      ], 'panuozzo', 6, 'Proposta illustrativa: disponibilità e composizione da verificare con il locale.')
    },
    {
      id: 'saltimbocca', label: 'Saltimbocca', subtitle: 'Proposte da confermare', icon: 'bread',
      items: makeItems([
        'Saltimbocca classico', 'Saltimbocca con prosciutto crudo',
        'Saltimbocca con mozzarella', 'Saltimbocca caprese',
        'Saltimbocca con speck', 'Saltimbocca con verdure'
      ], 'saltimbocca', 6, 'Proposta illustrativa: disponibilità e composizione da verificare con il locale.')
    },
    {
      id: 'salumeria', label: 'Salumeria', subtitle: 'Affettati e sfiziosità', icon: 'bag',
      items: makeItems([
        'Salumeria mista', 'Prosciutto crudo', 'Salame napoletano',
        'Mortadella', 'Bresaola', 'Tagliere misto'
      ], 'salumeria', 6, 'Selezione di salumi. Chiedi al personale la composizione e le porzioni.')
    },
    {
      id: 'antipasti', label: 'Antipasti', subtitle: 'Sapori del territorio', icon: 'leaf',
      items: makeItems([
        'Antipasto della casa', 'Mozzarella di bufala', 'Caprese',
        'Prosciutto e melone', 'Verdure grigliate', 'Olive miste'
      ], 'antipasti', 6, 'Antipasto. Ingredienti, disponibilità e allergeni da confermare con il ristorante.')
    },
    {
      id: 'primi', label: 'Primi piatti', subtitle: 'Pasta e piatti caldi', icon: 'bowl',
      items: makeItems([
        'Spaghetti al pomodoro', 'Spaghetti alla carbonara',
        'Spaghetti alla bolognese', 'Penne all’arrabbiata',
        'Penne ai quattro formaggi', 'Gnocchi alla sorrentina',
        'Risotto ai frutti di mare', 'Lasagne', 'Pasta e patate'
      ], 'primi', 6, 'Primo piatto. Disponibilità e ricetta da confermare con il personale.')
    }
  ];
})();
