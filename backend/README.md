# AI-Powered Dynamic Content Creator (Backend)

Express.js + MongoDB API server for the MERN application enabling user authentication, AI text generation via Google Gemini, and storage of generation history.

## Stack & Features
- Node.js / Express.js
- MongoDB via Mongoose
- JWT authentication (7d expiry)
- Password hashing with bcrypt
- Google Gemini integration (`@google/genai`, model: `gemini-2.5-flash`)
- Rate limiting (`express-rate-limit`) for general API and generation endpoint
- Centralized error handling & async safety (`express-async-handler`)
- Input validation utility for required fields

## Project Structure (Key Folders)
```
src/
  config/          # db connection + gemini client
  models/          # User, ContentItem schemas
  services/        # jwtService, hashingService, geminiService
  middleware/      # auth, errorHandler, rateLimit
  routes/          # auth, generate, content
  utils/           # validateRequest
  app.js           # express app wiring
  server.js        # bootstrap & listen
```

## Environment Setup
Create `.env` from `.env.example`:
```
MONGO_URI=mongodb://localhost:27017/ai_content_creator
PORT=5000
JWT_SECRET=YOUR_STRONG_RANDOM_SECRET
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
NODE_ENV=development
```

## Installation
```powershell
npm install
```
(If you add later) Dev tools already included: `nodemon`.

## Run
```powershell
npm run dev
```
or
```powershell
npm start
```

## Health Check
GET `/api/health` => `{ status: "ok", timestamp }`

## Endpoints
| Method | Route | Purpose | Auth | Extra Middleware |
| ------ | ----- | ------- | ---- | ---------------- |
| POST | /api/auth/register | Create user | No | validateRequest |
| POST | /api/auth/login | Login + token | No | validateRequest |
| POST | /api/generate/text | Generate AI text | Yes | generationLimiter, validateRequest |
| POST | /api/content/save | Persist generated content | Yes | validateRequest |
| GET | /api/content/history | List user content items | Yes | - |

## Error Responses
Errors return JSON:
```json
{
  "message": "Description of error",
  "stack": null,        // omitted in production
  "code": "SERVER_ERROR" // or custom code
}
```

## Security Notes
- Password hashes never exposed (select:false on schema)
- JWT must be sent as `Authorization: Bearer <token>`
- Rate limits: 100 general requests / 15m per IP; 30 generation requests / hour per IP
- Validate required fields to avoid unnecessary DB or AI calls

## Gemini Integration
Service: `geminiService.generateContent(prompt)` wraps SDK call. Adjust parsing if SDK response shape changes.
Model: `gemini-2.5-flash` (fast creative generation). Keep key in server only.

## Future Enhancements (Backend)
- Replace manual validation with schema-based (Zod or Joi)
- Add refresh tokens & short-lived access tokens
- Add Redis-based distributed rate limiting
- Add request logging (winston / pino)
- Add pagination & filtering for history
- Add content editing & deletion endpoints

## License
Add a LICENSE file (MIT recommended) at project root if distributing.

---
Backend ready for frontend integration.
