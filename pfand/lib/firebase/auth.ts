import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./init";

const email = "user@example.com";
const password = "securePassword123";

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log("User created:", userCredential.user);
  })
  .catch((error) => {
    console.error("Error creating user:", error.message);
  });
