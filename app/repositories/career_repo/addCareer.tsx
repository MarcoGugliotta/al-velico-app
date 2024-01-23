import { collection, doc, addDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../firebaseConfig';
import Career from '../../models/Career';
import addLevel from '../level_repo/addLevel';
import addMovement from '../movement_repo/addMovement';
import addVideoTutorial from '../video_tutorial_repo/addVideoTutorial';

export default async function addCareer(career: Career): Promise<Career> {
  try {
    await Promise.all(
      career.levels.map(async (level) => {
        await Promise.all(
          level.movements.map(async (movement) => {
            const newVideoTutorial = movement.videoTutorial;
            const videoTutorialId = await addVideoTutorial(newVideoTutorial);
            newVideoTutorial.id = videoTutorialId;

            movement.videoTutorial = newVideoTutorial;

            const movementId = await addMovement(movement);
            movement.id = movementId;
          })
        );

        const levelId = await addLevel(level);
        level.id = levelId;
      })
    );

    const careersCollection = collection(FIREBASE_DB, 'careers');
  
    const now = new Date();
    const careerRef = await addDoc(careersCollection, {
      name: career.name,
      actived: false,
      levels: career.levels,
      percentageCompletion: 0,
      startDate: now,
      lastUpdate: now,
    });

    return { ...career, id: careerRef.id };
  } catch (error) {
    console.error('Errore durante la creazione della carriera:', error);
    throw error;
  }
}
