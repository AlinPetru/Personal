# AiDo — local prototype

AiDo lets a customer upload a home or garden photo, describe a change, review a before/after design, explicitly approve it, and then explore a budget and demo partner board.

## Run locally

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by the development server. No API key is required for this prototype. No photos are sent to an AI service.

## Try the complete journey

1. Choose **Start your project** and **Try the sample room instead**.
2. Choose **Sage green walls**, then **Preview my design**.
3. Choose **Show sample result**. Move the before/after slider.
4. Choose **I like this design — continue** to unlock the budget.
5. Add a demo project and review it on the partner board.

For a photo of your own, upload it at step one, describe the change, then use **Load an edited test image** on the result screen. This manual test result stands in for an eventual AI response. It is clearly labelled and is never advertised as an AI-generated edit. The sample room output is fixed and does not respond to arbitrary prompts.

Changing the description clears approval; a new result must be supplied before continuing. Window projects have a separate quote-required step instead of being priced with painting rates.

## Connect AI later

The integration boundary is `lib/image-api.mjs`, routed by `worker/index.ts`. It currently returns `ready: false` and never calls an external provider.

The intended live flow is:

- Browser sends the original image and requested change to a same-origin server endpoint.
- Server validates the authenticated user, origin, image size/type and prompt, applies persistent rate limits and duplicate-request protection, and calls an image **editing** service using a server-only secret.
- Model prompt preserves the original camera view and unchanged parts of the space. Only the requested changes are applied.
- The server returns `{ "image": "data:image/jpeg;base64,..." }`, or a private result URL scoped to the user.
- The frontend sets `state.result` to that image, sets `state.resultDemo = false`, and renders the comparison. Only explicit approval proceeds to costs.

`public/app.js` has the Generate button handler in `renderDesignReview()`. It deliberately does not submit the photo or call an AI API until that integration is implemented. Add actual network loading, error, cancellation and retry behavior there alongside the server adapter. Never put an API key in browser JavaScript, local storage, a URL, or a tracked source file. Configure the chosen provider's secret only on the server.

API reference consulted for a possible later OpenAI implementation: https://developers.openai.com/api/reference/resources/images/methods/edit

## Scope of this version

- This is local-only work. The earlier hosted site has not been updated.
- Budget rates are illustrative, not verified market prices or binding quotes.
- Windows/opening changes require a specialist quote and structural assessment.
- Partner requests and shortlists use this browser's local storage; no real business is contacted, no payment is taken, and no booking is made.
- Uploaded photos and test results remain in memory for the browser session and are not stored on the partner board.
- Real accounts, approved-image persistence, partner dispatch, quotes, payments and production abuse controls remain future work.

## Project structure

- `app/page.tsx`, `app/site-content.ts`: landing page markup.
- `public/style.css`: visual design and responsive layouts.
- `public/app.js`: upload, compare, approve, estimate, and local partner interactions.
- `lib/image-api.mjs`: disconnected local adapter for future image editing.
- `worker/index.ts`: supported Sites/Vinext worker entrypoint.

## Asset

`public/assets/room-pair.jpg` is an AI-generated sample created with the built-in image generation tool. The prompt requested two identical Scandinavian living-room photos from the same viewpoint: one with off-white walls, the other with sage green walls, with matching furniture and natural light. It is illustrative sample imagery, not a real customer project.
