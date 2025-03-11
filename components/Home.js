import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Importando o ícone

const SERP_API_KEY = '425515adfa3a13c3884a093d3756b4e035bea3dcfcff5c59e4a645eed62d63eb';

const HomeScreen = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([{ id: '0', text: 'Olá, sou Bagley, sua IA de cibersegurança.', from: 'bagley' }]);
  const [loading, setLoading] = useState(false);
  const sound = useRef(new Audio.Sound()).current;

  useEffect(() => {
    return () => {
      sound.unloadAsync();
    };
  }, []);

  const startRotation = () => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      })
    ]).start();
  };

  const getBagleyResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();
    
    if (lowerMessage === 'oi' || lowerMessage === 'olá') {
      return 'Oi! Finalmente alguém para conversar. Espero que seja interessante...';
    }

    if (lowerMessage.includes('o que é cibersegurança')) {
      return 'Cibersegurança é o que me mantém longe das suas senhas... Brincadeira! É a prática de proteger sistemas e redes contra ataques digitais.';
    }

    try {
      console.log('🔎 Buscando resposta na SerpAPI para:', userMessage);
      const response = await axios.get('https://serpapi.com/search', {
        params: {
          api_key: SERP_API_KEY,
          q: userMessage,
          engine: 'google',
        },
      });

      return response.data?.organic_results?.[0]?.snippet || 'Não encontrei uma resposta relevante.';
    } catch (error) {
      console.error('❌ Erro ao buscar na SerpAPI:', error);
      return 'Ops! Parece que minha internet caiu. Ou será a sua?';
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setResponses((prev) => [...prev, { id: Date.now().toString(), text: message, from: 'user' }]);
    setMessage('');
    setLoading(true);

    // Animação de "Pensando..."
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResponses((prev) => [...prev, { id: (Date.now() + 1).toString(), text: 'Bagley: Hmm... Deixe-me pensar...', from: 'bagley' }]);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const bagleyResponse = await getBagleyResponse(message);
    setResponses((prev) => [...prev, { id: (Date.now() + 2).toString(), text: `Bagley: ${bagleyResponse}`, from: 'bagley' }]);

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Chat com Bagley</Text>
      
      <TouchableOpacity style={styles.circle} onPress={startRotation}>
        <Animated.View style={{ transform: [{ rotate: rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
          <Text style={styles.bagleyText}>Bagley</Text>
        </Animated.View>
      </TouchableOpacity>
      
      <FlatList
        data={responses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.from === 'user' ? styles.userMessage : styles.bagleyMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={styles.messagesContainer}
      />

      {loading && <ActivityIndicator size="large" color="#4191e1" style={styles.loader} />}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          activeOpacity={0.7} // Efeito de clique
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  greeting: {
    fontSize: 20,
    color: '#FFF',
    marginBottom: 20,
  },
  messagesContainer: {
    width: '90%',
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  bagleyMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#444',
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
  },
  loader: {
    marginBottom: 10,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4191e1',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  bagleyText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 15, 
    color: '#FFF',
    backgroundColor: '#222',
    borderRadius: 10, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#444', 
    placeholderTextColor: '#AAA', 
  },  
  sendButton: {
    padding: 12,
    backgroundColor: '#0A84FF',
    borderRadius: 50,
    marginLeft: 10,
    shadowColor: '#0A84FF',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default HomeScreen;
