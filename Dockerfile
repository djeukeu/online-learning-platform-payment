FROM node:22.17.0-alpine
WORKDIR /usr/app
COPY package.json yarn.lock tsconfig.json ./
COPY prisma ./prisma
RUN yarn
COPY src ./src
RUN yarn build

FROM node:22.17.0-alpine
WORKDIR  /usr/app
COPY --from=0 /usr/app/package.json /usr/app/yarn.lock  ./
COPY --from=0 /usr/app/prisma ./prisma
ENV NODE_ENV=production
RUN yarn install --production

FROM node:22.17.0-alpine
WORKDIR  /usr/app
COPY --from=0  /usr/app ./
USER 1000
CMD ["node", "dist/server.js"]