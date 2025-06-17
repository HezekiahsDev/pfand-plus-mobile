/**
 * Firebase configuration and initialization module.
 * This module handles the setup of Firebase services for the application.
 * @module
 */
import { initializeApp } from "firebase/app";

// IGNORE IMPORT ERROR, this is a valid import, still investigating
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// ============================================================================
// Configuration
// ============================================================================

/**
 * Firebase configuration object containing necessary credentials and endpoints
 * @type {Object}
 */
const firebaseConfig = {
  apiKey: "AIzaSyAbHpuSrdsLiU-UxtIdEinyHhGLv8uVGR4",
  authDomain: "pfand-plus-be.firebaseapp.com",
  projectId: "pfand-plus-be",
  storageBucket: "pfand-plus-be.firebasestorage.app",
  messagingSenderId: "510878772169",
  appId: "1:510878772169:web:3ffdecf380b59bb9dfd618",
};

// ============================================================================
// Firebase Initialization
// ============================================================================

/**
 * Initialize Firebase application instance
 * @type {FirebaseApp}
 */
const app = initializeApp(firebaseConfig);

/**
 * Initialize Firebase Authentication service
 * @type {Auth}
 */
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
export default app;
