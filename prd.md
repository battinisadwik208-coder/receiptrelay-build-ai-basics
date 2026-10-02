# ReceiptRelay — product requirements

## Outcome
Help people avoid losing money because a return or warranty date disappeared in a receipt.

## User story
As a buyer, I want to paste receipt text and get a short, understandable list of important dates so I can act before a deadline.

## Functional requirements
1. The app accepts multiline receipt text.
2. The app offers a sample receipt.
3. The parser detects a purchase date in common numeric formats.
4. The parser detects a currency amount.
5. The parser detects return windows expressed in days.
6. The parser detects warranty windows expressed in days, months, or years.
7. Each result displays the evidence phrase used by the parser.
8. The app shows a confidence percentage based on detected fields.
9. The app works without a network request.

## Quality requirements
- Mobile responsive
- Keyboard accessible controls
- No secrets or personal data in the repository
- Explainable results rather than unsupported certainty

## Acceptance test
Paste the sample. The app must show MOSS & MINT, $68.00, Sep 22, 2026, a return checkpoint Oct 22, 2026, and a warranty checkpoint Sep 22, 2027.
