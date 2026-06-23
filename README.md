# Help Desk Hero — Client

Agent console for the Help Desk Hero IT ticketing system. Rebuilt from Create React App to
**Vite + React + TypeScript** with a Zendesk/ServiceNow-style UI.

## Stack

- Vite + React 18 + TypeScript
- Redux Toolkit + **RTK Query** (data layer)
- Tailwind CSS (custom components, `cn()` helper)
- **Recharts** (dashboard: status bar, priority donut, 14-day trend)
- AWS **Cognito** via Amplify (auth) with a local **dev seam**
- react-router-dom v6 with an auth route guard

## Run

```bash
cp .env.example .env     # set VITE_API_URL; VITE_AUTH_MODE=dev for local
npm install
npm run dev              # http://localhost:5173
```

Requires the API (see `../Ticketing-tool-server`). In **dev** mode, sign in with any email — the
server's `/auth/dev-login` seam issues a token (agent role) so the whole console is usable without AWS.

## Structure

```
src/
  components/    ui/ primitives, layout/ (sidebar + topbar), PageHeader, States
  features/
    auth/        login / register, RequireAuth guard, auth actions
    tickets/     list / detail / new pages + presentational components + saved views
    dashboard/   useTicketStats hook + pure aggregation (ticket-stats.ts) + charts
    search/
  store/         RTK Query: baseApi (+ token + envelope unwrap), tickets/users endpoints
  lib/           authClient (dev/cognito), formatting, user + ticket metadata
```

Container components (pages) own data + state; presentational components take props only. Dashboard
math lives in `features/dashboard/ticket-stats.ts` (pure, testable), not in the view.
