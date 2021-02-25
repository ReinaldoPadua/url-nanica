# Pull base image.
FROM node:15

EXPOSE 3000

RUN mkdir -p /app
WORKDIR /app
COPY . /app/
RUN npm install 
RUN npm run build

CMD ["npm", "start"]
