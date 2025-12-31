import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL!,
  groqKey: process.env.GROQ_API_KEY!,
};

if (!env.databaseUrl) {
  throw new Error("DATABASE_URL is missing");
}

if (!env.groqKey) {
  throw new Error("GROQ_API_KEY is missing");
}
