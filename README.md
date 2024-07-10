# Bat Stats UI

**Goals**
- Implement a fully featured list editor for the Batman Minuature Game (BMG).
- Implement a "print" mode which will generate printable PDF views of character cards to support offline play.
- Implement a "play mode" with sharable match codes that can be shared between opponents to view the current state of opponent models, and what their deck is. The "play mode" should also track and sync blood, stun, audacity, etc.
- All views should be reasonably mobile friendly, and cross-browse friendly.

**Current State**

## Available Routes
### Card viewer
Link: http://localhost:5173/card/

- This view has a toggle to switch between a "compact" view of character cards, and a "full version of character cards.
- This view is intended to eventually support a list editor eventually, and additionally a "play mode"


**Compact mode**
![readme_assets/compact_card_view_2024_08_10.png]

**full mode**
![readme_assets/full_card_view_2024_08_10.png]


### Single Card Print Mode

**Single Card Print Mode**
Link: http://localhost:5173/card/print/1

![readme_assets/print_card_view_2024_08_10.png]


### Compendium 
Link: http://localhost:5173/compendium

![readme_assets/compendium_view_2024_08_10.png]

## Developers

To run the project:
1. clone, setup, and start the [bat_stats_api](https://github.com/jghibiki/bat-stats-api) project
2. cone this repo
3. Run `npm install` to install javascript dependencies
4. Run `npm run start` to start the development server
5. Browse to http://localhost:5173/card or whatever port number the `npm run start` command reports

