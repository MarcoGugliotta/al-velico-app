import { addDoc, collection, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import Level from "../../models/Level";

// Funzione per creare un movimento con referenza al video tutorial
async function createLevel(level: Level) {
  try {
    const levelsCollection = collection(FIREBASE_DB, 'levels');

    const movementsRef = [] 
    level.movements.forEach(movement => {
        const movementRef = doc(FIREBASE_DB, 'movements', movement.id);
        movementsRef.push(movementRef);
    });

    const levelRef = await addDoc(levelsCollection, {
      name: level.name,
      movements: movementsRef,
    });
    
    return levelRef.id;
  } catch (error) {
    console.error('Errore durante la creazione del level:', error);
  }
}

// Funzione principale
export default async function addLevel(level: Level) {

  return await createLevel(level);
}