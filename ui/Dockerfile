FROM node:19

WORKDIR /app

COPY ui/package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
