import { View, StyleSheet, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WindsurfCareer } from '../../Images'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Career from '../models/Career'
import CareerCardComponent from '../components/CareerCardComponent'
import { ActivityIndicator, Text } from 'react-native-paper'
import { theme } from '../core/theme'
import getDafaultCareer from '../helpers/getDefaultCareer'
import getCareers from '../repositories/career_repo/getCareers'
import addCareer from '../repositories/career_repo/addCareer'

const HomeScreen = ({ navigation }) => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCareers = async () => {
            setIsLoading(true);
            try {
              const careersData: Career[] = await getCareers();      
              setCareers(careersData);
            } catch (error) {
              console.error('Errore nel recupero delle carriere:', error);
            } finally{
                setIsLoading(false);
            }
          };
      fetchCareers();
    }, []);

    const handleCareer = async () => {
        setIsLoading(true);
        try {
            const newCareer = await addCareer(getDafaultCareer());
            setCareers((prevCareers) => [...prevCareers, newCareer]);
          } catch (error) {
            console.error("Errore nella creazione della Carriera")
          } finally {
            setIsLoading(false);
          }
      };
      
      return (
        <SafeAreaView style={styles.container}>
            {isLoading && (
              <View style={styles.activityIndicatorOverlay}>
                <ActivityIndicator animating={isLoading} color={theme.colors.accent} size="large" />
              </View>
            )}
            <Text variant='headlineLarge' style={{fontFamily:'rale-b', color:theme.colors.primary}}>Home</Text>
            <Text variant='bodyLarge' style={{fontFamily:'rale-sb', color:theme.colors.primary}}>Inizia la tua nuova carriera!</Text>
            <View style={{ height: 300 }}>
            <FlatList
            contentContainerStyle={styles.contentContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={careers}
            keyExtractor={(career, index) => `${index}`}
            renderItem={({ item: career }) => (
                <CareerCardComponent
                title={career.name}
                subTitle={`${countLevels(career.levels)} Livelli | ${countMovements(career.levels)} Movimenti | ${countTutorials(career.levels)} Tutorial`}
                img={WindsurfCareer}
                width={280}
                height={250}
                topTitleOverLay={140}
                onPress={() => navigation.navigate('CareerDetailLayout', {
                                                              screen: 'CareerDetailScreen',
                                                              params: { career: career },
                                                            })}
                />
            )}
            />
            </View>
            <Button title="Aggiungi Carriera" onPress={handleCareer} />
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
      },
      contentWrapper: {
        flex: 1,
        position: 'relative',
        ...StyleSheet.absoluteFillObject,
      },
      contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        height: 300,
      },
      activityIndicatorOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex:99
      },
    });
    
    export default HomeScreen;

// Funzione per contare il numero totale di livelli
const countLevels = (levels: any[]) => levels.length;

// Funzione per contare il numero totale di movimenti
const countMovements = (levels: any[]) => levels.reduce((acc, level) => acc + level.movements.length, 0);

// Funzione per contare il numero totale di tutorial video
const countTutorials = (levels: any[]) => levels.reduce((acc, level) => acc + level.movements.reduce((accMov, movement) => accMov + 1, 0), 0);
