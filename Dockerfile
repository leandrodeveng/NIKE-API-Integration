FROM node:16.13.0-alpine As dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development && npm cache clean --force

COPY . .

CMD [ "npm", "run", "build" ]

FROM node:16.13.0-alpine As prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production && npm cache clean --force

COPY . .

COPY --from=dev /usr/src/app/dist ./dist

CMD [ "node", "dist/main" ]
