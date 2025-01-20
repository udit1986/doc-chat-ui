# Stage 1: Compile and Build angular codebase

FROM node:latest as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm install
RUN npm run build


# Stage 2: Serve app with nginx server

FROM nginx:latest
COPY --from=build /usr/local/app/dist/doc-chat-ui /usr/share/nginx/html

# Expose port 80
EXPOSE 80