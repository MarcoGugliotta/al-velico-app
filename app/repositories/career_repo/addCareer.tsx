import { collection, doc, addDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../firebaseConfig';
import Career from '../../models/Career';
import addLevel from '../level_repo/addLevel';
import addMovement from '../movement_repo/addMovement';
import addVideoTutorial from '../video_tutorial_repo/addVideoTutorial';

async function createCareerDocument(career: Career) {
  const careersCollection = collection(FIREBASE_DB, 'careers');
  const levelsRef = await Promise.all(career.levels.map(addLevel));

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
}

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

    const careerId = await createCareerDocument(career);

    return { ...career, id: careerId };
  } catch (error) {
    console.error('Errore durante la creazione della carriera:', error);
    throw error;
  }
}
