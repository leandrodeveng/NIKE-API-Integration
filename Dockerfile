FROM node:16.13.0-alpine as prod
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force
COPY . .
RUN npm install -g @nestjs/cli && nest build
CMD [ "node", "dist/main" ]

FROM prod as dev
ENV NODE_ENV=development
RUN npm install

FROM dev as test
ENV NODE_ENV=test
CMD ["npm", "run", "test"]
