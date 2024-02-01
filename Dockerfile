FROM node:20.10-alpine
WORKDIR /app
RUN npm install -g pnpm http-server
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build
EXPOSE 8080
CMD ["http-server", "dist", "-p", "8080"]