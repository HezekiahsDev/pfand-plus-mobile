/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Import the Firebase Admin SDK to access Firestore.
import * as admin from "firebase-admin";

// Initialize the Firebase Admin SDK.
// This gives your functions access to other Firebase services.
admin.initializeApp();

// Get a reference to the Firestore database.
const db = admin.firestore();

// --- Functions that DO NOT use Firestore ---

/**
 * 1. A simple "Hello World" endpoint.
 * This function sends a basic text response.
 * METHOD: GET
 */
export const helloWorld = onRequest((request, response) => {
  logger.info("Executing helloWorld function", { structuredData: true });
  response.send("Hello from Firebase!");
});

/**
 * 2. An endpoint that returns the current server time.
 * This demonstrates sending a JSON response.
 * METHOD: GET
 */
export const getTime = onRequest((request, response) => {
  logger.info("Executing getTime function");
  const currentTime = new Date().toISOString();
  response.json({
    timestamp: currentTime,
    timezone: "UTC",
  });
});

// --- Functions that DO use Firestore ---

/**
 * 3. Creates a new user in Firestore.
 * Expects a POST request with a JSON body, e.g., { "name": "Jane Doe", "email": "jane.doe@example.com" }
 * METHOD: POST
 */
export const createUser = onRequest(async (request, response) => {
  // We only want to handle POST requests for this function.
  if (request.method !== "POST") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const { name, email } = request.body;

    // Basic validation
    if (!name || !email) {
      response
        .status(400)
        .send("Missing 'name' or 'email' in the request body.");
      return;
    }

    logger.info(`Creating new user with email: ${email}`);

    // Add a new document with a generated ID to the "users" collection.
    const userRef = await db.collection("users").add({
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
    });

    response.status(201).json({
      message: "User created successfully!",
      userId: userRef.id,
    });
  } catch (error) {
    logger.error("Error creating user:", error);
    response.status(500).send("Internal Server Error");
  }
});

/**
 * 4. Retrieves a user's data from Firestore by their document ID.
 * To use, call the URL like this: .../getUser?id=someUserId
 * METHOD: GET
 */
export const getUser = onRequest(async (request, response) => {
  // We only want to handle GET requests for this function.
  if (request.method !== "GET") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const userId = request.query.id;

    if (!userId || typeof userId !== "string") {
      response
        .status(400)
        .send("Please provide a 'id' parameter in the query string.");
      return;
    }

    logger.info(`Fetching user with ID: ${userId}`);
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      response.status(404).send(`User with ID ${userId} not found.`);
    } else {
      response.status(200).json({
        id: userDoc.id,
        ...userDoc.data(),
      });
    }
  } catch (error) {
    logger.error("Error getting user:", error);
    response.status(500).send("Internal Server Error");
  }
});
