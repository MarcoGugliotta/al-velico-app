import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import initializeCareerForUser from '../utils/inizializeCareer';
import { Icon } from 'react-native-paper';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { theme } from '../core/theme';
import BackButton from '../components/BackButton';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email.value, password.value);
            // Chiamata alla funzione per gestire l'accesso dell'utente e inizializzare la struttura della carriera
            handleUserLogin(response.user.uid);
        } catch (error) {
            alert('Sign In fallita: ' + error.message)
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email.value, password.value);
            alert('Controlla la tua email!');
            // Chiamata alla funzione per gestire l'accesso dell'utente e inizializzare la struttura della carriera
            handleUserLogin(response.user.uid);
        } catch (error) {
            alert('Registrazione fallita: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    // Funzione per gestire l'accesso dell'utente
    const handleUserLogin = async (userId) => {
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
    };

    return (
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            description={undefined}
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
            description={undefined}
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPasswordScreen')}
            >
              <Text style={styles.forgot}>Dimenticata la password?</Text>
            </TouchableOpacity>
          </View>
          <Button mode="contained" onPress={handleUserLogin} style={undefined} buttonColor={theme.colors.primary} textColor={'white'}>
            Login
          </Button>
          <View style={styles.row}>
            <Text>Non hai un account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={styles.link}>Registrati</Text>
            </TouchableOpacity>
          </View>
        </Background>
      )
    }
    
    const styles = StyleSheet.create({
      forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
      },
      row: {
        flexDirection: 'row',
        marginTop: 4,
      },
      forgot: {
        fontSize: 13,
        color: theme.colors.primary,
        textDecorationLine: 'underline',
      },
      link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
      },
    })

    export default Login