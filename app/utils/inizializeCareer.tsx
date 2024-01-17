import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

export default async function initializeCareerForUser(userId) {
    try {
        const userCareerRef = doc(FIREBASE_DB, 'careers', userId);

        console.log('Struttura della carriera creata con successo per il nuovo utente.');
    } catch (error) {
        console.error('Errore durante la creazione della struttura della carriera:', error);
    }
}
