import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import LoadingScreen from './LoadingScreen'; // Certifique-se de que o caminho esteja correto
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Estado de carregamento

  const handleLogin = () => {
    if (username && password) {
      setLoading(true);  // Exibe a tela de carregamento
      setTimeout(() => {
        setLoading(false);  // Esconde a tela de carregamento após um delay
        navigation.replace('Home');  // Navega para a tela Home
      }, 3000);  // Simula o processo de login
    } else {
      Alert.alert("Erro", "Por favor, insira seu nome de usuário e senha.");
    }
  };

  if (loading) {
    return <LoadingScreen />;  // Tela de carregamento com o efeito de Bagley
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Input de Usuário */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Input de Senha */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Botões */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Botão para navegação até a tela de criação de conta */}
      <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.buttonOutlineText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    width: '80%',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonOutline: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonOutlineText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
