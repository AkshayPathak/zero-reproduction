export const postgres = new sst.aws.Postgres("Postgres", {
  vpc: null,
  dev: {
    username: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "new_zero",
  },
});

export const studio = new sst.x.DevCommand("Studio", {
  link: [postgres],
  dev: {
    command: "bunx drizzle-kit studio",
    directory: "packages/core",
    autostart: true,
  },
});

export const myApi = new sst.aws.Function("MyApi", {
  url: true,
  link: [postgres],
  handler: "packages/zero/src/server.handler",
  environment: {
    ZERO_UPSTREAM_DB: $interpolate`postgresql://${postgres.username}:${postgres.password}@${postgres.host}:${postgres.port}/${postgres.database}`,
  },
});

export const web = new sst.aws.StaticSite("Web", {
  path: "packages/web",
  build: {
    output: "dist",
    command: "bun run build",
  },
  environment: {
    VITE_API_URL: myApi.url,
    VITE_PUBLIC_SERVER: "http://localhost:4848",
  },
});

export const zero = new sst.x.DevCommand("Zero", {
  link: [web, myApi],
  dev: {
    command: "bun run dev:zero-cache",
    directory: "packages/zero",
    autostart: true,
  },
  environment: {
    ZERO_UPSTREAM_DB: $interpolate`postgresql://${postgres.username}:${postgres.password}@${postgres.host}:${postgres.port}/${postgres.database}`,
    ZERO_REPLICA_FILE: "/tmp/zstart_new_zero_replica.db",
    ZERO_PUSH_URL: $interpolate`${myApi.url}/api/push`,
    ZERO_LOG_LEVEL: "debug",
  },
});
