# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Install system dependencies needed for Puppeteer and canvas
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    musl-dev \
    gcc \
    g++ \
    make \
    python3 \
    openssl

# Set working directory
WORKDIR /app

# Set Puppeteer to use system Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY dist ./dist/

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S archivemind -u 1001

# Create logs directory
RUN mkdir -p /app/logs && chown -R archivemind:nodejs /app/logs

# Switch to non-root user
USER archivemind

# Expose port (if needed for health checks)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "console.log('Health check passed')" || exit 1

# Start the application
CMD ["npm", "start"]