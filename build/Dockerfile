FROM node:16-alpine as build

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

COPY . /app
RUN npm run build

FROM node:16-alpine

WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist/ ./

CMD ["node", "-r", "dotenv/config", "index.js"]