import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface EstimateData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}

export async function saveEstimateRequest(data: EstimateData) {
  const result = await pool.query(
    `INSERT INTO estimate_requests (name, email, phone, project_type, message)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, created_at`,
    [data.name, data.email, data.phone || null, data.projectType, data.message]
  );
  return result.rows[0];
}
