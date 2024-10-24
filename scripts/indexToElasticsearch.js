import { Client } from '@elastic/elasticsearch';
import { Pool } from 'pg';

const esClient = new Client({ node: 'http://localhost:9200' });
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function indexData() {
  try {
    const { rows } = await pgPool.query('SELECT * FROM services');
    
    for (const row of rows) {
      await esClient.index({
        index: 'services',
        id: row.id.toString(),
        body: row
      });
    }

    console.log('Indexing complete');
  } catch (error) {
    console.error('Indexing error:', error);
  } finally {
    await pgPool.end();
  }
}

indexData();

