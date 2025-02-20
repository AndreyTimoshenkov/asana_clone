FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm install

RUN npm run build -- --configuration production

FROM nginx:alpine

COPY --from=build /app/dist/mini-asana/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
