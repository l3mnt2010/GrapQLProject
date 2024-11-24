FROM node:20.10

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libx11-xcb1 \
    libxss1 \
    libasound2 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libgbm1 \
    libgtk-3-0 \
    libxcomposite1 \
    libxrandr2 \
    libxdamage1 \
    libxkbcommon-x11-0 \
    libxshmfence1 \
    libxtst6 \
    xvfb \
    && apt-get clean

COPY package*.json ./

RUN npm install

RUN npm install electron@8.0.0

COPY . .

COPY flag.txt /flag.txt

RUN mv /flag.txt /flag_$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 20).txt

RUN rm /app/flag.txt

EXPOSE 4000

CMD ["npm", "start"]
