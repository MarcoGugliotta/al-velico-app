import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";
import initializeCareerForUser from "./inizializeCareer";

export default async function handleUserLogin(userId) {
    // Verifica se il documento della carriera dell'utente esiste già
    const userCareerRef = doc(FIREBASE_DB, 'careers', userId);

    try {
        const docSnapshot = await getDoc(userCareerRef);
        
        if (!docSnapshot.exists()) {
            await initializeCareerForUser(userId);
        } else {
            console.log('La carriera dell\'utente esiste già.');
        }
    } catch (error) {
        console.error('Errore durante la verifica del documento della carriera dell\'utente:', error);
    }
}
