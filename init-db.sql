-- Initialize the database with pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create necessary indexes for better performance
-- These will be created by Prisma migrations, but we can prepare the database

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE archivemind TO archivemind;

-- Set timezone
SET timezone = 'UTC';
