FROM fusuf/whatsasena:latest

RUN git clone https://github.com/mbesoftware/mbewp /root/mbewp
WORKDIR /root/mbewp/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g
RUN npm install

CMD ["node", "bot.js"]
