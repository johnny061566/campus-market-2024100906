# Day3 Evidence

## Completed

- Installed `axios` and `json-server@0.17.4`.
- Added `db.json` with four mock collections: `trades`, `lostFounds`, `groupBuys`, and `errands`.
- Added the `mock` script: `json-server --watch db.json --port 3001`.
- Created Axios base instance in `src/api/http.ts`.
- Created business API modules:
  - `src/api/trade.ts`
  - `src/api/lostFound.ts`
  - `src/api/groupBuy.ts`
  - `src/api/errand.ts`
- Created reusable components:
  - `src/components/ItemCard.vue`
  - `src/components/EmptyState.vue`
- Updated the main business pages to request data and render lists:
  - `TradeView.vue`
  - `LostFoundView.vue`
  - `GroupBuyView.vue`
  - `ErrandView.vue`

## Verification

- `pnpm type-check`: passed.
- `pnpm build`: passed.
- `db.json` collection counts:
  - `trades`: 5
  - `lostFounds`: 5
  - `groupBuys`: 5
  - `errands`: 5
