import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchSchema() {
  try {
    // Fetch tables
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('*')
      .eq('table_schema', 'public');

    if (tablesError) throw tablesError;

    // Fetch columns for each table
    const schema = {};
    for (const table of tables) {
      const { data: columns, error: columnsError } = await supabase
        .from('information_schema.columns')
        .select('*')
        .eq('table_schema', 'public')
        .eq('table_name', table.table_name);

      if (columnsError) throw columnsError;

      schema[table.table_name] = columns.map(col => ({
        name: col.column_name,
        type: col.data_type,
        nullable: col.is_nullable === 'YES',
      }));
    }

    // Write schema to file
    writeFileSync(
      join(process.cwd(), 'scripts', 'schema.json'),
      JSON.stringify(schema, null, 2)
    );

    console.log('Schema fetched successfully!');
  } catch (error) {
    console.error('Error fetching schema:', error);
    process.exit(1);
  }
}

fetchSchema();