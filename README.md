# The Dashboard

En enkel, personlig dashboard för webbläsaren. Den visar klocka och datum, lokala genvägar, väder för din plats, en slumpmässig fakta, anteckningar och en valbar bakgrund.

## Funktioner

- Klocka och datum på svenska.
- Anpassningsbar rubrik.
- Lägg till och ta bort snabblänkar.
- Väderprognos för idag och de två kommande dagarna, baserad på enhetens plats.
- Slumpmässig fakta.
- Anteckningar som sparas lokalt.
- Slumpa bakgrundsbild.

Rubrik, länkar, anteckningar och vald bakgrund sparas i webbläsarens `localStorage` på den aktuella enheten och i den aktuella webbläsaren.

## Kom igång

1. Klona eller ladda ner repot.
2. Öppna `index.html` i en modern webbläsare.
3. Tillåt platsåtkomst om du vill visa väder för din position.

Ingen byggprocess eller paketinstallation krävs. Väder hämtas från [Open-Meteo](https://open-meteo.com/), fakta från [Useless Facts API](https://uselessfacts.jsph.pl/) och bakgrundsbilder från [Picsum Photos](https://picsum.photos/).

## Projektstruktur

- `index.html` – dashboardens markup.
- `CSS-Dashboard/style.css` – layout och utseende.
- `script.js` – funktioner och datahantering.

## Integritet

Dashboarden använder geolokaliseringsfunktionen i webbläsaren för att hämta väder. Platsåtkomst kräver ditt tillstånd. Dina rubrikinställningar, länkar, anteckningar och bakgrund sparas i webbläsarens lokala lagring; de synkroniseras inte mellan enheter.
