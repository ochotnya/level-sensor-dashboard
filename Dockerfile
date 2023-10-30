FROM node:18-alpine As production

WORKDIR /usr/src/app

ENV NODE_ENV production
ENV PORT 3000

COPY . .

RUN npm install
RUN npm run build

EXPOSE ${PORT}

CMD ["npm", "start"]

