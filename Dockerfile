FROM node:10 AS installer
WORKDIR /root/app
COPY package.json package-lock.json /root/app/
RUN npm install --only=production

FROM node:10-slim
USER node
WORKDIR /home/node/app
COPY --chown=node:node --from=installer /root/app /home/node/app
COPY --chown=node:node . .

CMD ["node", "server.js"]
