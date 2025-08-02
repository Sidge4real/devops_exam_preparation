FROM node:23.6

COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]