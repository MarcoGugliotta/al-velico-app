import Career from '../models/Career';
import addCareer from './career_repo/addCareer';
import addLevel from './level_repo/addLevel';
import addMovement from './movement_repo/addMovement';
import addVideoTutorial from './video_tutorial_repo/addVideoTutorial';

export default async function generateCareer(career: Career): Promise<Career> {
  try {
    // Eseguire in modo sequenziale i cicli sui livelli
    for (const level of career.levels) {
      // Eseguire in modo parallelo i cicli sui movimenti del livello
      await Promise.all(
        level.movements.map(async (movement) => {
          const newVideoTutorial = movement.videoTutorial;
          const videoTutroialId = await addVideoTutorial(newVideoTutorial);
          newVideoTutorial.id = videoTutroialId;

          movement.videoTutorial = newVideoTutorial;

          const movementId = await addMovement(movement);
          movement.id = movementId;
          console.log(movementId);
        })
      );

      const levelId = await addLevel(level);
      level.id = levelId;
    }

    const now = new Date();
    career.startDate = now;
    career.lastUpdate = now;
    await addCareer(career);

    // Restituisci la carriera appena generata
    return career;
  } catch (error) {
    console.error('Errore durante la verifica del documento della carriera dell\'utente:', error);
    throw error; // Puoi decidere se propagare l'errore o ritornare un oggetto di fallback
  }
}
