# ReceiptRelay — technical specification

## Stack
- Static HTML, CSS, and vanilla JavaScript
- No runtime dependencies
- Browser `Date` and regular-expression parsing only

## Files
- `index.html`: semantic page structure and content
- `styles.css`: visual system and responsive layout
- `app.js`: local parser and rendering

## Data flow
1. User enters text in `#receiptText`.
2. `parseReceipt()` searches for a date, amount, return-day phrase, and warranty phrase.
3. `addDays()` calculates checkpoint dates locally.
4. `render()` updates the summary, evidence list, and confidence meter.

## Privacy
No fetch calls, analytics, cookies, storage, or external APIs are used. Receipt text remains in the current page and disappears on refresh.

## Known limitations
- OCR is not included.
- Retailer-specific return rules are not verified.
- Ambiguous dates and amounts may need human review.
- Year arithmetic uses 365 days for the proof of concept.
