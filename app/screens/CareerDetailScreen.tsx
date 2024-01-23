import { StyleSheet, View} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../components/BackButton'
import Career from '../models/Career'
import { Text } from 'react-native-paper'
import { theme } from '../core/theme'

const CareerDetailScreen = ({ route, navigation }) => {
    const careerDetail: Career = route.params?.career;
  
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <BackButton goBack={navigation.goBack} />
            </View>
                {careerDetail.levels.map((level, index) => (
                    <View key={index} style={styles.levelContainer}>
                        <Text variant='displaySmall' style={{ fontFamily: 'rale-b', color: theme.colors.primary }}>
                            {level.name}
                        </Text>
                        {level.movements.map((movement, indexL) => (
                            <View key={indexL}>
                                <Text variant='bodySmall' style={{ fontFamily: 'rale-b', color: theme.colors.primary }}>
                                    {movement.name}
                                </Text>

                            </View>
                        ))}
                    </View>
                ))}
        </SafeAreaView>
    )
}

export default CareerDetailScreen

const styles = StyleSheet.create({
    container: { flex:1},
    levelContainer: {
        margin:24// Aggiungi spazio tra i livelli se necessario
    }
})
