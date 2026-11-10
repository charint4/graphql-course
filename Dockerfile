FROM oven/bun:1.2-alpine

WORKDIR /app

COPY package.json ./
RUN bun install

COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["bun", "run", "start"]
