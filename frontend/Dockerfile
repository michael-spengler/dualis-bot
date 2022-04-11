FROM denoland/deno:1.19.1 AS build


WORKDIR /app

COPY . .

# install snel
RUN deno run --allow-run --allow-read https://deno.land/x/snel/install.ts

# build the app
RUN snel build
 

FROM nginx AS production

# copy only the files needed for production 
COPY --from=build /app/dist /usr/share/nginx/html 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]