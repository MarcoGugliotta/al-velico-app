import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import { theme } from '../core/theme'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
{/*       <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>*/}
      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        textColor={'white'}
        onPress={() => navigation.navigate('Login')} style={undefined}      >
        Login
      </Button>
      <Button
        mode="outlined"
        buttonColor={undefined}
        textColor={theme.colors.primary}
        onPress={() => navigation.navigate('SignUp')} style={undefined}      >
        Registrati
      </Button>
    </Background>
  )
}
