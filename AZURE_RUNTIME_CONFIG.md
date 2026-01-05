# Runtime Configuration for Azure Deployment

## How It Works

This setup ensures that environment variables are read **at runtime** from Azure App Service, not baked in at build time.

### Architecture

1. **Server-Side Only Config** (`nuxt.config.ts`)
   - Environment variables are defined in `runtimeConfig` (NOT in `runtimeConfig.public`)
   - This keeps them server-side only and prevents build-time baking

2. **Runtime API Endpoint** (`/server/api/config/runtime.get.ts`)
   - Reads environment variables from Azure at runtime
   - Exposes only necessary values to the client
   - Called automatically on first page load

3. **Client Composable** (`/app/composables/useApi.ts`)
   - On server: reads directly from runtime config
   - On client: fetches from `/api/config/runtime` endpoint
   - Caches the result using `useState` to avoid repeated API calls

### Usage in Components

```typescript
// In any component or composable
const { cmsUrl, orderUrl, siteKey } = await useApi();
```

### Azure Environment Variables

Set these in your Azure App Service → Configuration → Application settings:

- `CMS_URL` - Your CMS base URL (e.g., `https://cms.example.com`)
- `ORDER_URL` - Your order service URL
- `RECAPTCHA_SITE_KEY` - Your reCAPTCHA site key
- `ORDER_API_SECRET` - Secret for order API (server-side only)
- `PAYMENT_INTENT_API_SECRET` - Secret for payment intents (server-side only)
- `CLIENT_URL` - Your client URL (server-side only)

### Benefits

✅ Environment variables are read at runtime from Azure  
✅ No need to rebuild when changing deployment slots  
✅ Secrets stay server-side only  
✅ Client gets only the values it needs  
✅ Works across different Azure deployment slots

### Deployment

1. Build your app: `npm run build`
2. Deploy to Azure
3. Set environment variables in Azure portal
4. Restart the app - it will read the new values at runtime
