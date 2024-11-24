FROM node:20.10 AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20.10

WORKDIR /app

RUN useradd -m ctf

COPY --from=build /app/build /app/build

RUN yarn global add serve

RUN chown -R ctf:ctf /app

EXPOSE 3000

USER ctf
CMD ["serve", "-s", "build", "-l", "3000"]
