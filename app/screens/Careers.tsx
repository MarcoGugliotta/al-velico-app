import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../core/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import CircularProgress from '../components/CircularProgress';

const items = [
    {
      name: 'Windsurf',
      airport: 'DXB',
      departure: '2022-10-10',
      arrival: '2023-04-01',
      price: 966,
    },
    {
      name: 'Vela',
      airport: 'VCE',
      departure: '2022-10-10',
      arrival: '2023-04-01',
      price: 652,
    },
    {
      name: 'Surf',
      airport: 'BNX',
      departure: '2022-10-10',
      arrival: '2023-04-01',
      price: 566,
    },
    {
      name: 'Wingfoil',
      airport: 'BCN',
      departure: '2022-10-10',
      arrival: '2023-04-01',
      price: 602,
    },
  ];
  
  export default function Example() {
    return (
      <SafeAreaView style={{ backgroundColor: "white", flex:1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Carriere</Text>
  
          {items.map(
            ({ name, airport, departure, arrival, price }, index) => {
              return (
                <View key={index} style={styles.card}>

                <CircularProgress></CircularProgress>

                <View style={styles.cardBody}>
                    <Text>
                    <Text style={styles.cardTitle}>{name}</Text>{' '}
                    <Text style={styles.cardAirport}>{airport}</Text>
                    </Text>

                    <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                        <FontAwesome
                        color="#6f61c4"
                        name="plane-departure"
                        size={10}
                        />

                        <Text style={styles.cardRowItemText}>
                        {new Date(departure).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                        </Text>
                    </View>

                    <View style={styles.cardRowItem}>
                        <FontAwesome
                        color="#6f61c4"
                        name="plane-arrival"
                        size={10}
                        />

                        <Text style={styles.cardRowItemText}>
                        {new Date(arrival).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                        </Text>
                    </View>
                    </View>

                    <Text style={styles.cardPrice}>
                    <Text>from </Text>

                    <Text style={styles.cardPriceValue}>
                        ${price.toLocaleString('en-US')}{' '}
                    </Text>

                    <Text style={styles.cardPriceCurrency}>USD</Text>
                    </Text>

                    <TouchableOpacity
                    onPress={() => {
                        // handle onPress
                    }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Book now</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                </View>
              );
            },
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 32,
      fontWeight: '700',
      color: theme.colors.primary,
      marginBottom: 12,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'stretch',
      borderRadius: 12,
      marginBottom: 16,
      backgroundColor: '#e2e2e2',
    },
    cardImg: {
      width: 120,
      height: 154,
      borderRadius: 12,
    },
    cardBody: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: '#173153',
      marginRight: 8,
    },
    cardAirport: {
      fontSize: 13,
      fontWeight: '600',
      color: '#5f697d',
    },
    cardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: -8,
      flexWrap: 'wrap',
    },
    cardRowItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 6,
    },
    cardRowItemText: {
      marginLeft: 4,
      fontSize: 12,
      fontWeight: '500',
      color: '#5f697d',
    },
    cardPrice: {
      fontSize: 13,
      fontWeight: '500',
      color: '#5f697d',
    },
    cardPriceValue: {
      fontSize: 21,
      fontWeight: '700',
      color: '#173153',
    },
    cardPriceCurrency: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#6f61c4',
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderWidth: 1,
      backgroundColor: theme.colors.accent,
      borderColor: theme.colors.accent,
    },
    btnText: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '600',
      color: '#fff',
    },
  });