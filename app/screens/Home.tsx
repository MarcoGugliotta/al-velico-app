import { View, Text, StyleSheet, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SurfCareer, VelaCareer, WindsurfCareer } from '../../Images'
import CardC from '../components/CareerCardComponent'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Career from '../models/Career'
import { collection, getDocs, getDoc, doc, DocumentReference } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import generateCareer from '../utils/generateCareer'
import Level from '../models/Level'
import Movement from '../models/Movement'
import CareerCardComponent from '../components/CareerCardComponent'

const Home = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [isCreatingCareer, setIsCreatingCareer] = useState(false);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
              const careersCollection = collection(FIREBASE_DB, 'careers');
              const careersDocs = await getDocs(careersCollection);
          
              const careersData = [];
          
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
                );
          
                careersData.push({
                  ...careerData,
                  levels: levelsData,
                });
              }
          
              setCareers(careersData);
            } catch (error) {
              console.error('Errore nel recupero delle carriere:', error);
            }
          };
      fetchCareers();
    }, []);

    const handleCareer = async () => {
        setIsCreatingCareer(true);
        const career: Career = {
            percentageCompletion: 0,
            startDate: undefined,
            lastUpdate: undefined,
            name: 'Windsurf',
            actived: false,
            levels: [{
                name: "Principiante",
                movements: [{
                    name: "Trasporto della tavola",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Trasporto della tavola',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Partenza",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Partenza',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Rotazione di prua",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Rotazione di prua',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Rotazione di poppa",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Rotazione di poppa',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Orzare",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Orzare',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Puggiare",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Puggiare',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Navigare in sicurezza",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Navigare in sicurezza',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Andatura di bolina",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Andatura di bolina',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Andatura di traverso",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Andatura di traverso',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Andatura di lasco",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Andatura di lasco',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Andatura di poppa",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Andatura di poppa',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Virata semplice",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Virata semplice',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Strambata semplice",
                    difficulty: "Facile",
                    videoTutorial: {
                        name: 'Strambata semplice',
                        path: 'https://www.youtube.it'
                    }
                }]
            },{
                name: "Intermedio",
                movements: [{
                    name: "Partenza dalla spiaggia",
                    difficulty: "Media",
                    videoTutorial: {
                        name: 'Partenza dalla spiaggia',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Strambata pivot",
                    difficulty: "Media",
                    videoTutorial: {
                        name: 'Strambata pivot',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Trapezio",
                    difficulty: "Media",
                    videoTutorial: {
                        name: 'Trapezio',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Virata avanzata",
                    difficulty: "Media",
                    videoTutorial: {
                        name: 'Virata avanzata',
                        path: 'https://www.youtube.it'
                    }
                }]
            },{
                name: "Avanzato",
                movements: [{
                    name: "Planare",
                    difficulty: "Difficile",
                    videoTutorial: {
                        name: 'Planare',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Evitare lo spin out",
                    difficulty: "Difficile",
                    videoTutorial: {
                        name: "Evitare lo spin out",
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Salto",
                    difficulty: "Difficile",
                    videoTutorial: {
                        name: 'Salto',
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Partenza dall'acqua",
                    difficulty: "Difficile",
                    videoTutorial: {
                        name: "Partenza dall'acqua",
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Power Jibe",
                    difficulty: "Difficile",
                    videoTutorial: {
                        name: "Power Jibe",
                        path: 'https://www.youtube.it'
                    }
                },{
                    name: "Virata Power",
                    difficulty: "Difficile",
                    videoTutorial: {
                        name: "Virata Power",
                        path: 'https://www.youtube.it'
                    }
                }]
            }]
        };
        
        try {
            const newCareer = await generateCareer(career);
        
            setCareers((prevCareers) => [...prevCareers, newCareer]);
          } catch (error) {
            console.log("Errore nella creazione della Carriera")
          } finally {
            setIsCreatingCareer(false);
          }
      };
      
    return (
        <SafeAreaView  style={styles.container}>
            <Header>Home</Header>
            <Paragraph>Inizia una nuova carriera!</Paragraph>
            <View style={{height: 300}}>
                <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                {careers.map((career) => (
                    <CareerCardComponent
                        key={career.id} // Assicurati di avere una chiave univoca per ogni card
                        title={career.name}
                        subTitle={`${countLevels(career.levels)} Livelli | ${countMovements(career.levels)} Movimenti | ${countTutorials(career.levels)} Tutorial`}
                        img={WindsurfCareer}
                        width={280}
                        height={250}
                        topTitleOverLay={140} numLevels={0} numMovements={0} numTutorials={0}                    />
                ))}
                </ScrollView>
            </View>
            <Paragraph>Inizia una nuova carriera!</Paragraph>
            <Button title="Aggiungi Carriera" onPress={handleCareer} />
        </SafeAreaView>
    )
}

export default Home

// Funzione per contare il numero totale di livelli
const countLevels = (levels: any[]) => levels.length;

// Funzione per contare il numero totale di movimenti
const countMovements = (levels: any[]) => levels.reduce((acc, level) => acc + level.movements.length, 0);

// Funzione per contare il numero totale di tutorial video
const countTutorials = (levels: any[]) => levels.reduce((acc, level) => acc + level.movements.reduce((accMov, movement) => accMov + 1, 0), 0);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    contentContainer:{
        paddingVertical: 20,
        paddingHorizontal: 20,
        height: 300
    },
    career: {
    },
    textOverlay: {
        position: 'absolute'
    },
    scrollView: {
        flex:1
    }
})