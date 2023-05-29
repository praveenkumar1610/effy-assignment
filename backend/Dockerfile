FROM node:14-alpine

RUN mkdir -p /app
WORKDIR /app 

COPY package.json ./    
COPY package-lock.json ./

COPY . .
RUN npm run build

RUN npm install 
RUN rm -rf package-lock.json src/ 

EXPOSE 8000 
CMD ["npm","start"]
