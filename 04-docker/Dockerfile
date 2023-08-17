FROM node:latest

WORKDIR /app

COPY . .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm i -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]
