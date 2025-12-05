FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies (production) - copy only package files first for layer caching
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY . .

# Environment
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["node", "src/server.js"]
