FROM node:latest

# Create the bot's directory
RUN mkdir -p /src/index
WORKDIR /src/index

COPY package.json /src/index
RUN npm install

COPY . /src/index

# Start the bot.
CMD ["node", "index.js"]