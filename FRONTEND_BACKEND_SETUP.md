# Frontend-Backend Connection Setup

## Environment Configuration

### Frontend Setup

#### Development (.env.development)
- API URL: `http://localhost:5000`
- Used when running `npm run dev`

#### Production (.env.production)  
- API URL: `https://api.triofit.com` (update with your actual production backend URL)
- Used when running `npm run build` and deploying

### Backend Setup

#### Development
- Port: 5000 (default or from `.env`)
- CORS Origins: `http://localhost:5173` (Vite dev server), `https://triofit.netlify.app` (production)

## How to Use

### Local Development

1. **Start Backend:**
   ```bash
   cd backend
   npm install  # if not done
   npm start    # or npm run dev
   ```
   Backend should run on `http://localhost:5000`

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install  # if not done
   npm run dev  # runs on http://localhost:5173
   ```

### API Calls

Use the centralized API client in your components:

```javascript
import apiClient from '@/services/apiClient.js';

// GET request
const response = await apiClient.get('/api/products/all');

// POST request
const response = await apiClient.post('/api/auth/login', { email, password });

// DELETE request
await apiClient.delete(`/api/products/${productId}`);
```

The API client automatically:
- Uses the correct base URL from environment variables
- Includes authentication token from localStorage
- Sets proper headers
- Handles credentials for cross-origin requests

## Configuration Details

### Vite Proxy
The frontend's `vite.config.js` includes a proxy that forwards `/api/*` requests to the backend during development.

### CORS
The backend allows requests from:
- `http://localhost:5173` (local development)
- `https://triofit.netlify.app` (production)

To add more production URLs, update the CORS configuration in [backend/server.js](../backend/server.js#L20-L22).

## Production Deployment

1. Update `.env.production` with your actual backend URL
2. Update CORS origins in `backend/server.js`
3. Deploy frontend to Netlify/Vercel
4. Deploy backend to a server (Railway, Heroku, AWS, etc.)
5. Update `VITE_API_URL` in frontend environment variables to point to production backend

## Troubleshooting

### CORS Error
- Check that backend's CORS origin includes your frontend URL
- Ensure `credentials: true` is set in axios requests

### API calls return 404
- Verify backend is running on the correct port
- Check that API endpoint exists in backend routes
- Ensure VITE_API_URL is correctly set

### Token not being sent
- Token should be stored in `localStorage` with key `token`
- Check browser DevTools Network tab to verify Authorization header
