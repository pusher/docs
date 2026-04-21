# Build-time assets (_site/) are produced by the GitHub Actions runner before
# `docker build` runs. This image is a thin static server.
#
# Using nginxinc/nginx-unprivileged so the master process runs as the non-root
# `nginx` user (uid 101) and listens on :8080 — matches the k8s security
# context used for the rest of our web workloads.
#
# Build locally:
#   yarn install && yarn build && docker build -t docs:dev .
#   docker run --rm -p 8080:8080 docs:dev
#   open http://localhost:8080/docs/

FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY _site /usr/share/nginx/html

EXPOSE 8080
