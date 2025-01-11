export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  apiUrl: process.env.API_URL,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  cors: {
    origins: process.env.ORIGINS ? process.env.ORIGINS.split(',') : [],
  },
  hash: {
    salt: process.env.HASH_SALT || '',
  },
});
