FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock . /app/
 
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start"]