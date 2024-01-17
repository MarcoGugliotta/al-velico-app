import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Career from "../../models/Career";
import { FIREBASE_DB } from "../../../firebaseConfig";
import Level from "../../models/Level";
import Movement from "../../models/Movement";

export default async function getCareers(): Promise<Career[]>{
    const careers: Career[] = [];

    const careersCollection = collection(FIREBASE_DB, 'careers');
    const careersDocs = await getDocs(careersCollection);

    for (const careerDoc of careersDocs.docs) {
    const careerData = careerDoc.data() as Career;

    const levelsData = await Promise.all(
        careerData.levels.map(async (levelRef) => {
        try {
            // Ottieni il riferimento al documento usando doc
            const levelDocRef = doc(FIREBASE_DB, 'levels', levelRef.id);

            // Ottieni i dati del documento
            const levelDoc = await getDoc(levelDocRef);

            // Verifica se il documento esiste prima di accedere ai dati
            if (levelDoc.exists()) {
            const levelData = levelDoc.data() as Level;

            // Ottieni i movimenti per ogni livello
            const movementsData = await Promise.all(
                levelData.movements.map(async (movementRef) => {
                try {
                    const movementDocRef = doc(FIREBASE_DB, 'movements', movementRef.id);
                    const movementDoc = await getDoc(movementDocRef);

                    if (movementDoc.exists()) {
                    movementDoc.data() as Movement;

                    const videoTutorialRefDoc = await getDoc(movementDoc.data().videoTutorial);
                    if (videoTutorialRefDoc.exists()) {
                        const videoTutorialData = videoTutorialRefDoc.data();
                        return { ...movementDoc.data(), videoTutorial: videoTutorialData };
                        } else {
                        console.error(`Il documento del video tutorial con ID ${movementDoc.data().videoTutorial.id} non esiste.`);
                        return null; // o gestisci il caso in cui il documento del video tutorial non esiste
                        }
                    } else {
                    console.error(`Il documento del movimento con ID ${movementRef.id} non esiste.`);
                    }
                } catch (error) {
                    console.error('Errore nel recupero dei dati del movimento:', error);
                    }
                })
            );

            return {
                ...levelData,
                movements: movementsData,
            };
            } else {
            console.error(`Il documento del livello con ID ${levelRef.id} non esiste.`);
            return null; // o gestisci il caso in cui il documento del livello non esiste
            }
        } catch (error) {
            console.error('Errore nel recupero dei dati del livello:', error);
            return null; // o gestisci l'errore in modo appropriato
        }
        })
    ) as Level[];

    careers.push({
        ...careerData,
        levels: levelsData,
    });
    }

              
    return careers;
}