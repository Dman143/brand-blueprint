# Brand Blueprint V1

A production-ready, founder-led strategy journey: five conversational workshops produce one canonical **Your Brand Blueprint** for the interactive report, branded PDF and email.

## Run locally

Requires Node.js 22+ and TypeScript (`tsc`).

```bash
cp .env.example .env
# export the values in .env, then:
npm run dev
```

Open <http://localhost:4173>. Answers persist in browser `localStorage`; generated reports are retained in the current tab only.

## Services and environment

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Enables server-side AI drafting. Without it, the server uses the complete deterministic drafting engine. |
| `OPENAI_MODEL` | Responses API model (default `gpt-5-mini`). |
| `RESEND_API_KEY` | Sends Blueprint and consultation emails through Resend. |
| `EMAIL_FROM` | Verified sender address. |
| `CONTACT_TO` | Consultation recipient. |

The API validates the same canonical Blueprint object before creating a PDF or email, preventing channel drift. Email deliberately returns a clear unavailable state if Resend is not configured. Consultation requests are logged locally when Resend is absent.

## Quality and production

```bash
npm run lint
npm test
npm run build
npm run preview
```

`vercel.json` configures the static build and Node serverless functions. In Vercel, add the environment variables above, deploy, and verify the sender domain in Resend. API errors never discard locally saved workshop answers.

## Endpoints

- `POST /api/generate` — accepts `{ answers }` and returns the canonical Blueprint.
- `POST /api/pdf` — accepts `{ blueprint }` and returns a branded PDF.
- `POST /api/email` — accepts `{ email, blueprint }`.
- `POST /api/contact` — accepts `{ name, email, message }`.
