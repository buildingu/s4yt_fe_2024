import { ref, set, get, DataSnapshot } from "firebase/database";
import { db } from "@root/firebase";
import { addNotification } from "@actions/notifications";

export default async function initializeFirebase(userEmail: string) {
  // Firebase doesn't allow "." for a key
  const encodedEmail = userEmail.replace(/\./g, ",");
  const userRef = ref(db, "users/" + encodedEmail);
  try {
    const snapshot: DataSnapshot = await get(userRef);
    if (snapshot.exists()) {
      console.log("User already exists");
    } else {
      set(userRef, {
        submittedRaffle: false,
        completedQuiz: false,
      });
      console.log("User created successfully");
    }
  } catch (error) {
    console.error("Error checking or creating user:", error);
    addNotification({
      error: true,
      content: "Error adding user to Firebase",
      close: false,
      duration: 0,
    });
  }
}
