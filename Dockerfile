# Male Niti dev server — no build step, no npm dependencies (dev-server.js
# only uses Node builtins), so the image is just the runtime + the repo.
FROM node:20-alpine

WORKDIR /app
COPY . .

# This image's only purpose is running the real deploy target (see
# CLAUDE.md > Deployment), so lock dev-server.js down to just the files it
# names as shipping - the wireframe canvas/scraps/docs stay off-limits.
ENV MALE_NITI_PRODUCTION=1
ENV PORT=8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD node -e "require('http').get('http://localhost:'+(process.env.PORT||8080)+'/',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

CMD ["node", "dev-server.js"]
