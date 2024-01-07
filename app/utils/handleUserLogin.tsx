import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

export default async function handleUserLogin(userId) {
    try {
        const userCareerRef = doc(FIREBASE_DB, 'careers', userId);

        const beginnerMovements = [
            { name: 'Squat', completed: false, subMovements: [{ name: 'Squat Standard', completed: false }, { name: 'Squat Jump', completed: false }] },
            { name: 'Trazioni', completed: false, subMovements: [{ name: 'Trazione Standard', completed: false }, { name: 'Trazione Jump', completed: false }] },
            // Altri movimenti e sotto-movimenti per il livello principiante
        ];

        const intermediateMovements = [
            { name: 'Intermediate Squat', completed: false, subMovements: [{ name: 'Intermediate Squat Standard', completed: false }, { name: 'Intermediate Squat Jump', completed: false }] },
            // Altri movimenti e sotto-movimenti per il livello intermedio
        ];

        const levels = [
            {
                name: 'Principiante',
                movements: beginnerMovements
            },
            {
                name: 'Intermedio',
                movements: intermediateMovements
            }
        ];

        const completionPercentage = 0;

        // Creazione della struttura dati per la carriera dell'utente
        await setDoc(userCareerRef, {
            levels: levels,
            completionPercentage: completionPercentage
        });

        console.log('Struttura della carriera creata con successo per il nuovo utente.');
    } catch (error) {
        console.error('Errore durante la creazione della struttura della carriera:', error);
    }
}
