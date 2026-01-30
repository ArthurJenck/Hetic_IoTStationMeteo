FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

FROM node:22-alpine
WORKDIR /app
RUN addgroup -S nodejs && adduser -S iotheticuser -G nodejs
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.js ./
USER iotheticuser
EXPOSE 8080
CMD ["node", "server.js"]
