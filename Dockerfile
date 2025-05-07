FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm","run","start"]