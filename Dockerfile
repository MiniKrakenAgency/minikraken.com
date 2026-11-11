FROM oven/bun:1.4.0-distroless AS base
WORKDIR /usr/src/app
LABEL authors="maximehuylebroeck"
ENV PORT=3000

FROM base AS dependencies-builder
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the application
FROM dependencies-builder AS builder
# Install dev dependencies (needed for build)
RUN bun install --frozen-lockfile
# Copy source code and build
COPY . .
RUN bun run prepare && bun run build

# Final production image
FROM base AS production
# Copy only the built application from builder stage
COPY --from=builder /usr/src/app/build .
RUN bun install

# Expose the application port
EXPOSE ${PORT}
# Start the application
CMD ["bun", "run", "--bun", "index.js"]
