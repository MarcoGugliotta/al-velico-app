import { addDoc, collection, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import Movement from "../../models/Movement";
import Career from "../../models/Career";

async function createCareer(career: Career) {
  try {
    const careersCollection = collection(FIREBASE_DB, 'careers');

    const levelsRef = [] 
    career.levels.forEach(level => {
        const levelRef = doc(FIREBASE_DB, 'levels', level.id);
        levelsRef.push(levelRef);
    });

    const now = new Date();
    const careerRef = await addDoc(careersCollection, {
      name: career.name,
      actived: false,
      levels: levelsRef,
      percentageCompletion: 0,
      startDate: now,
      lastUpdate: now,
    });

    return careerRef.id;
    
  } catch (error) {
    console.error('Errore durante la creazione del movimento:', error);
  }
}

// Funzione principale
export default async function addCareer(career: Career) {

  await createCareer(career);
}