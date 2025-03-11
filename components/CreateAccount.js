import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CreateAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleCreateAccount = () => {
    if (email && password && username) {
  
      Alert.alert('Conta criada com sucesso!', 'Você pode agora fazer login.');
      navigation.replace('Login');
    } else {
      Alert.alert('Erro', 'Por favor, insira um nome de usuário, email e senha válidos.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo (caso queira adicionar um logo) */}
      {/* <Image source={require('../assets/logo.png')} style={styles.logo} /> */}

      {/* Input de Nome de Usuário */}
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

      {/* Input de Email */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
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
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonOutlineText}>Back to Login</Text>
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

export default CreateAccountScreen;
