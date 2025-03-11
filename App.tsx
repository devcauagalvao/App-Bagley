import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../bagleyAI/components/LoginScreen'; // Corrigido para LoginScreen
import HomeScreen from '../bagleyAI/components/Home'; // Corrigido para HomeScreen
import CreateAccountScreen from '../bagleyAI/components/CreateAccount'; // Nova importação

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Remover o cabeçalho da tela de login
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Mostrar o cabeçalho apenas na tela de Home
        />
        <Stack.Screen 
          name="CreateAccount" // Nome da tela de criar conta
          component={CreateAccountScreen} // Componente da tela de criação de conta
          options={{ headerShown: false }} // Remover o cabeçalho da tela de criação de conta
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
