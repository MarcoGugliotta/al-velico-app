import { addDoc, collection, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import Movement from "../../models/Movement";

// Funzione per creare un movimento con referenza al video tutorial
async function createMovement(movement: Movement) {
  try {
    const movementsCollection = collection(FIREBASE_DB, 'movements');

    
    const newVideoTutorial = doc(FIREBASE_DB, 'video_tutorials', movement.videoTutorial.id);

    // Creazione del documento nella raccolta "movements" con referenza al video tutorial
    const movementRef = await addDoc(movementsCollection, {
      name: movement.name,
      difficulty: movement.difficulty,
      videoTutorial: newVideoTutorial,
    });

    return movementRef.id;

  } catch (error) {
    console.error('Errore durante la creazione del movimento:', error);
  }
}

// Funzione principale
export default async function addMovement(movement: Movement) {

  return await createMovement(movement);
}