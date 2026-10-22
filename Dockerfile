FROM node:24.22.1-alpine3.24 AS base
WORKDIR /app

FROM base AS build
RUN npm install --global npm@12.2.1
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY index.html vite.config.js ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM base AS dependencies
RUN npm install --global npm@12.2.1
COPY package.json package-lock.json .npmrc ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

FROM base AS release
# The runtime only needs Node; omit package managers and their dependency trees.
RUN rm -rf /usr/local/lib/node_modules /opt/yarn-* /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/yarn /usr/local/bin/yarnpkg
ENV NODE_ENV=production PORT=3000
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json app.js index.js ./
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/up').then(r => { if (r.status !== 200) process.exit(1) }).catch(() => process.exit(1))"
CMD ["node", "index.js"]
