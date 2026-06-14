# ---- Build-Stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Nur Manifeste kopieren -> Layer-Caching für npm ci
COPY package.json package-lock.json ./
RUN npm ci

# Restlichen Code kopieren und bauen
COPY . .
RUN npm run build

# ---- Runtime-Stage ----
FROM nginx:1.27-alpine AS runtime

# Eigene Nginx-Config (SPA-Fallback + Caching)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Statische Build-Artefakte
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Healthcheck, damit Portainer den Status grün/rot anzeigt
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
