-- Per-service databases (database-per-service pattern)
CREATE USER sh_auth WITH PASSWORD 'sh_auth_dev';
CREATE DATABASE sh_auth OWNER sh_auth;

CREATE USER sh_user WITH PASSWORD 'sh_user_dev';
CREATE DATABASE sh_user OWNER sh_user;

GRANT ALL PRIVILEGES ON DATABASE sh_auth TO sh_auth;
GRANT ALL PRIVILEGES ON DATABASE sh_user TO sh_user;
