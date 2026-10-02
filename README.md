# ReceiptRelay

ReceiptRelay is a privacy-first proof of concept for turning noisy receipt text into useful return and warranty checkpoints.

## Why it exists
Receipts often contain one or two dates that can save money, but those dates are easy to miss. ReceiptRelay keeps the first step small: paste text, see the dates, verify the evidence.

## Run locally

```bash
python -m http.server 4173
```

Open <http://localhost:4173>.

## Demo path
1. Click **Try a sample**.
2. Click **Find my dates**.
3. Review the merchant, amount, purchase date, return checkpoint, warranty checkpoint, and confidence.
4. Click **Start another receipt** to show reset behavior.

## Privacy
This proof of concept makes no network requests and stores nothing. The receipt stays in the current browser page.

## Hackathon
Built as a new project for Devpost's Build With AI: Basics hackathon. The repository includes the planning artifacts `scope.md`, `prd.md`, and `spec.md`.
