import { collection, addDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";
import VideoTutorial from "../../models/VideoTutorial";

// Funzione per creare un video tutorial e ottenere il suo ID
async function createVideoTutorial(videoTutorial?: VideoTutorial) {
    const videoTutorialsCollection = collection(FIREBASE_DB, 'video_tutorials');
    const videoTutorialRef = await addDoc(videoTutorialsCollection, {
      name: videoTutorial.name,
      path: videoTutorial.path,
    });
   
    return videoTutorialRef.id;
  }

export default async function addVideoTutorial(videoTutorial?: VideoTutorial) {
    // Crea un video tutorial
    return await createVideoTutorial(videoTutorial);
}