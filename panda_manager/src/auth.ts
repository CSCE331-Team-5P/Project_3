import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { Pool } from "pg"
import PostgresAdapter from "@auth/pg-adapter"
import { signInSchema } from "@/lib/zod"
import { getUserFromDb } from "@/utils/db"


//^ DB Scheme for authentication
// CREATE TABLE verification_token
// (
//   identifier TEXT NOT NULL,
//   expires TIMESTAMPTZ NOT NULL,
//   token TEXT NOT NULL,
 
//   PRIMARY KEY (identifier, token)
// );
 
// CREATE TABLE accounts
// (
//   id SERIAL,
//   "userId" INTEGER NOT NULL,
//   type VARCHAR(255) NOT NULL,
//   provider VARCHAR(255) NOT NULL,
//   "providerAccountId" VARCHAR(255) NOT NULL,
//   refresh_token TEXT,
//   access_token TEXT,
//   expires_at BIGINT,
//   id_token TEXT,
//   scope TEXT,
//   session_state TEXT,
//   token_type TEXT,
 
//   PRIMARY KEY (id)
// );
 
// CREATE TABLE sessions
// (
//   id SERIAL,
//   "userId" INTEGER NOT NULL,
//   expires TIMESTAMPTZ NOT NULL,
//   "sessionToken" VARCHAR(255) NOT NULL,
 
//   PRIMARY KEY (id)
// );
 
// CREATE TABLE users
// (
//   id SERIAL,
//   name VARCHAR(255),
//   email VARCHAR(255),
//   "emailVerified" TIMESTAMPTZ,
//   image TEXT,
 
//   PRIMARY KEY (id)
// );


//^ Other Schema
// CREATE TABLE accounts
//   (
//     id                   SERIAL,
//     compound_id          VARCHAR(255) NOT NULL,
//     user_id              INTEGER NOT NULL,
//     provider_type        VARCHAR(255) NOT NULL,
//     provider_id          VARCHAR(255) NOT NULL,
//     provider_account_id  VARCHAR(255) NOT NULL,
//     refresh_token        TEXT,
//     access_token         TEXT,
//     access_token_expires TIMESTAMPTZ,
//     created_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at           TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (id)
//   );

// CREATE TABLE sessions
//   (
//     id            SERIAL,
//     user_id       INTEGER NOT NULL,
//     expires       TIMESTAMPTZ NOT NULL,
//     session_token VARCHAR(255) NOT NULL,
//     access_token  VARCHAR(255) NOT NULL,
//     created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (id)
//   );

// CREATE TABLE users
//   (
//     id             SERIAL,
//     name           VARCHAR(255),
//     email          VARCHAR(255),
//     email_verified TIMESTAMPTZ,
//     image          TEXT,
//     created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (id)
//   );

// CREATE TABLE verification_requests
//   (
//     id         SERIAL,
//     identifier VARCHAR(255) NOT NULL,
//     token      VARCHAR(255) NOT NULL,
//     expires    TIMESTAMPTZ NOT NULL,
//     created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     PRIMARY KEY (id)
//   );

// CREATE UNIQUE INDEX compound_id
//   ON accounts(compound_id);

// CREATE INDEX provider_account_id
//   ON accounts(provider_account_id);

// CREATE INDEX provider_id
//   ON accounts(provider_id);

// CREATE INDEX user_id
//   ON accounts(user_id);

// CREATE UNIQUE INDEX session_token
//   ON sessions(session_token);

// CREATE UNIQUE INDEX access_token
//   ON sessions(access_token);

// CREATE UNIQUE INDEX email
//   ON users(email);

// CREATE UNIQUE INDEX token
//   ON verification_requests(token);



const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export const { handlers, auth } = NextAuth({
    adapter: PostgresAdapter(pool),
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    let user = null
            
                    const { email, password } = await signInSchema.parseAsync(credentials)
            
                    // logic to verify if the user exists
                    user = await getUserFromDb(email, password)
            
                    if (!user) {
                        throw new Error("Invalid credentials.")
                    }
            
                    // return JSON object with the user data
                    return user
                } catch (error) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null
                    }
                }
            },
        }),
    ],
})