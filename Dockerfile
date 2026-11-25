# 1. Base: Node (same major as .nvmrc) + pnpm (same version as "packageManager")
FROM node:26-alpine AS base
# Some packages with native code need this on Alpine (official Next.js example)
RUN apk add --no-cache libc6-compat
RUN npm install -g pnpm@12.21.0
WORKDIR /app
# Turn off Next.js's anonymous usage data, at build and at run time
ENV NEXT_TELEMETRY_DISABLED=1

# 2. Install dependencies (cached unless package.json or the lockfile changes)
FROM base AS deps
ENV HUSKY=0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# 3. Build the app
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_ values are baked in at build time, so they come in as build arguments
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_APP_ENV
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN pnpm build

# 4. Run: copy only what's needed to run
FROM node:26-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
# Let the app (running as nextjs, not root) write its page cache
RUN mkdir .next && chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
