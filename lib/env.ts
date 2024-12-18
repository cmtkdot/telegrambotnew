const requiredEnvVars = {
  supabase: {
    url: 'https://jgfivmrejdxcoeopcctk.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZml2bXJlamR4Y29lb3BjY3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0Mjk4ODUsImV4cCI6MjA1MDAwNTg4NX0.qCeAqzzsabuBdus9sGlP2huazzpzMWx6oueoPsdHRfk',
  },
  telegram: {
    botApi: '7717223683:AAFsA-TrrkF09eeGubXHPO1uaiJ5ugGVLVw',
    botUsername: 'xdelo_mediabot',
  },
} as const;

// Validate required environment variables
if (!requiredEnvVars.supabase.url || !requiredEnvVars.supabase.anonKey) {
  throw new Error('Missing required Supabase environment variables');
}

export const env = requiredEnvVars;