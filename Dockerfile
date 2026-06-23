# ── Build stage ───────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Vite inlines VITE_* at build time — pass them as build args.
ARG VITE_API_URL=http://localhost:3001/api/v1
ARG VITE_AUTH_MODE=dev
ARG VITE_AWS_REGION=
ARG VITE_COGNITO_USER_POOL_ID=
ARG VITE_COGNITO_USER_POOL_CLIENT_ID=
ARG VITE_DEMO_EMAIL=
ARG VITE_DEMO_PASSWORD=
ENV VITE_API_URL=$VITE_API_URL \
    VITE_AUTH_MODE=$VITE_AUTH_MODE \
    VITE_AWS_REGION=$VITE_AWS_REGION \
    VITE_COGNITO_USER_POOL_ID=$VITE_COGNITO_USER_POOL_ID \
    VITE_COGNITO_USER_POOL_CLIENT_ID=$VITE_COGNITO_USER_POOL_CLIENT_ID \
    VITE_DEMO_EMAIL=$VITE_DEMO_EMAIL \
    VITE_DEMO_PASSWORD=$VITE_DEMO_PASSWORD
RUN npm run build

# ── Serve stage ───────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
