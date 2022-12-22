FROM denoland/deno:alpine-1.28.3

WORKDIR /deno-dir/
RUN chown -R deno:deno /deno-dir

USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .

RUN deno cache ./src/main.ts

ARG PORT=8000
EXPOSE ${PORT}

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "./src/main.ts"]
