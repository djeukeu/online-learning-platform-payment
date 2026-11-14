FROM node:22.17.0-alpine AS build
WORKDIR /usr/app
COPY package.json yarn.lock tsconfig.json ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile
COPY src ./src
RUN yarn build

FROM node:22.17.0-alpine AS deps
WORKDIR  /usr/app
COPY package.json yarn.lock ./
COPY prisma ./prisma
RUN yarn install --frozen-lockfile --production

FROM node:22.17.0-alpine
RUN apk add --no-cache openssl
WORKDIR  /usr/app
ENV NODE_ENV=production
COPY --from=deps  /usr/app/node_modules ./node_modules
COPY --from=build /usr/app/dist ./dist
COPY --from=build /usr/app/package.json ./
COPY --from=build /usr/app/prisma ./prisma
USER node
CMD ["node", "dist/server.js"]