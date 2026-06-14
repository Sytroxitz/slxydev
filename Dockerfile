# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Copy manifests only -> layer caching for npm ci
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and build
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM nginx:1.27-alpine AS runtime

# Custom Nginx config (SPA fallback + caching)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static build artifacts
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Healthcheck so Portainer shows a green/red status
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
