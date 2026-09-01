import express from "express";
import cookieParser from "cookie-parser";
import qs from "qs";
import cors from "cors";


// importing routes

import { authRoutes } from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// ============================================================
// MIDDLEWARE CONFIGURATION
// ============================================================
/**
 * Express JSON parser middleware -> app.use(express.json())
 * @description Parses incoming JSON request bodies and populates 'req.body'
 *
 * @technical-details
 * - Uses body-parser internally
 * - Only parses requests with Content-Type: application/json
 * - Handles JSON up to the default limit of 100kb
 * - Populates `req.body` with parsed JavaScript objects
 *
 * @example
 * // Request: POST /api/user with body: {"name": "John"}
 * // After middleware: req.body = { name: 'John' }
 *
 * @note Without this, `req.body` would be undefined for JSON requests
 */
app.use(express.json()); // to parse json data

/**
 * URL-Encoded Data Parser Middleware
 * @description Parses URL-encoded form data from HTML forms (application/x-www-form-urlencoded)
 *
 * @technical-details
 * - **extended: true** → Parses nested objects and arrays using the `qs` library
 *   - Supports: `user[name]=John&user[age]=30` → `{ user: { name: 'John', age: 30 } }`
 *   - Also supports: `items[]=1&items[]=2` → `{ items: ['1', '2'] }`
 *
 * - **extended: false** → Uses querystring library (simple key-value pairs only)
 *   - Flatter structure, no nested objects supported
 *
 * @example
 * // Form submission: user[name]=John&interests[]=coding&interests[]=reading
 * // After middleware: req.body = {
 * //   user: { name: 'John' },
 * //   interests: ['coding', 'reading']
 * // }
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Query Parser
 * @description Overrides Express's default query parser to use `qs` with dot notation support
 * @technical-details
 * - Default Express parser doesn't support dot notation in query params
 * - `qs` with `allowDots: true` enables: `?user.name=John&user.age=30`
 * - Without this: `?user.name` would be parsed as `{ 'user.name': 'John' }`
 * - With this: `?user.name` is parsed as `{ user: { name: 'John' } }`
 *
 * @example
 * // URL: /api/users?filter.name=John&filter.age=30
 * // After parser: req.query = { filter: { name: 'John', age: '30' } }
 *
 */
app.set("query parser", (str) => qs.parse(str, { allowDots: true }));

/**
 * Cookie Parser Middleware
 * @description Parses Cookie header and populates `req.cookies`
 *
 * @technical-details
 * - Automatically parses cookies from the request header
 * - Populates `req.cookies` with key-value pairs
 * - Does NOT parse signed cookies by default (for that, pass a secret)
 * - Handles URL-encoded cookie values automatically
 *
 * @example
 * // Request Cookie: name=John; sessionId=abc123
 * // After middleware: req.cookies = { name: 'John', sessionId: 'abc123' }
 */
app.use(cookieParser());

// ============================================================
// CORS CONFIGURATION
// ============================================================

/**
 * Allowed Origins for CORS
 * @description Whitelist of domains permitted to access the API
 *
 *
 *
 */

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_PROD_URL,
].filter(Boolean); // filter method removes undefined or empty values from array

/**
 * CORS (Cross-Origin Resource Sharing) Middleware
 * @description Enables secure cross-origin requests with configurable options
 *
 */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) { // !orgin -> postman ke liye  hai
        return callback(null, true);
      } else {
        const msg = `The CORS policy for this site does not allow access from the specified Origin. CORS: Origin "${origin}" is not allowed.`;
        return callback(new Error(msg), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware)



export default app;