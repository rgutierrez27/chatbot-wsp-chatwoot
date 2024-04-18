# Use the official Node.js image as the base image for building the application.
FROM node:21-alpine3.18 as builder

# Enable Corepack and prepare for PNPM installation
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml files to the working directory
COPY package*.json pnpm-lock.yaml ./

# Install git for potential dependencies
RUN apk add --no-cache git

# Install PM2 globally using PNPM
RUN pnpm install  pm2 -g

# Copy the application source code into the containe
COPY . .

# Install dependencies using PNPM
RUN pnpm i

# Create a new stage for deployment
FROM builder as deploy

#ARG RAILWAY_STATIC_URL
#ARG PUBLIC_URL
#ARG PORT

# Copy only necessary files and directories for deployment
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

# Install production dependencies using frozen lock file
RUN pnpm install --frozen-lockfile --production

# Copia el archivo .env en el contenedor y usa envsubst para reemplazar las variables de entorno
# COPY .env .env
# RUN apk add --no-cache gettext \
#     && envsubst < .env > .env.tmp \
#     && mv .env.tmp .env \
#     && apk del gettext

# Define las variables de entorno
#ENV $(grep -v '^#' .env | xargs)




# Define the command to start the application using PM2 runtime
CMD ["pm2-runtime", "start", "./dist/app.js", "--cron", "0 */12 * * *"]
#CMD ["npm", "start"]