
import { Pool } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless"

config({ path: ".env" });

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle(sql, { schema });

const pool = new Pool({connectionString: process.env.DATABASE_URL!})

export const db = drizzle({client: pool})