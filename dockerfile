# 1. Зависимости
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# 2. Сборка
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Аргументы для билда (публичные переменные)
ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

# 3. Запуск
FROM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Папка для загрузок (если нужна)
RUN mkdir -p public/uploads && chmod 777 public/uploads

# Копируем ресурсы
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["bun", "server.js"]