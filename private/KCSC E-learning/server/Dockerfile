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

ENV DATABASE_URL=mysql://l3mnt2010:l3mnt2010@mysql:3306/on_tap_khoa_hoc
ENV PORT=4000
ENV MYSQL_HOST=mysql
ENV MYSQL_USER=l3mnt2010
ENV MYSQL_PASSWORD=l3mnt2010
ENV MYSQL_DATABASE=on_tap_khoa_hoc

RUN SECRET_KEY=$(head -c 200 /dev/urandom | tr -dc 'A-Za-z0-9!@#$%^&*()_+-=<>?/:;,.[]{}|`~' | head -c 80) && \
    REFRESH_SECRET_KEY=$(head -c 200 /dev/urandom | tr -dc 'A-Za-z0-9!@#$%^&*()_+-=<>?/:;,.[]{}|`~' | head -c 80) && \
    echo "SECRET_KEY=$SECRET_KEY" > /app/.env && \
    echo "REFRESH_SECRET_KEY=$REFRESH_SECRET_KEY" >> /app/.env

RUN useradd -m ctf

COPY flag.txt /flag.txt

RUN mv /flag.txt /flag_$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 20).txt && \
    chmod 644 /flag_*.txt

RUN rm /app/flag.txt

RUN chown -R ctf:ctf /app

EXPOSE 4000

USER ctf
CMD ["npm", "start"]
