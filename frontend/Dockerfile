FROM node:latest as build

WORKDIR /usr/local/app
COPY ./BinanceCharts /usr/local/app/

RUN npm install
RUN npm run build

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/binance-charts /usr/share/nginx/html