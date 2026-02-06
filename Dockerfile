FROM node:25.6.0
LABEL authors="j.nerlich"

COPY . /opt

WORKDIR /opt

RUN ["npm", "install"]
EXPOSE 5173

ENTRYPOINT ["npm", "run", "dev"]

