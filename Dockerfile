FROM node:alpine
 
WORKDIR /app
 
COPY package.json yarn.lock ./
 
RUN yarn install --frozen-lockfile && \
    yarn cache clean
 
COPY . .
 
EXPOSE 4200
 
CMD ["ng", "serve"]