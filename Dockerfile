FROM node as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build


FROM alpine/node

WORKDIR /app

COPY --from=builder /dist /

ENV VITE_BASE_API_URL=http://localhost:5000

ENTRYPOINT [ "node ./" ]