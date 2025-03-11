import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const LoadingScreen = () => {
  const glitchAnimX = new Animated.Value(0);
  const glitchAnimY = new Animated.Value(0);
  const opacityAnim = new Animated.Value(1);
  const rotateAnim = new Animated.Value(0); // Para a animação de rotação

  useEffect(() => {
    const glitchEffect = () => {
      // Animações para o glitch (movimento e opacidade)
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(glitchAnimX, {
              toValue: Math.random() * 30 - 15,  // Movimento aleatório
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(glitchAnimY, {
              toValue: Math.random() * 10 - 5, // Movimento aleatório no eixo Y
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: Math.random() * 0.5 + 0.5, // Mudança de opacidade para dar o efeito de falha
              duration: 50,
              useNativeDriver: true,
            }),
          ]),
          Animated.delay(100),
        ])
      ).start();
    };

    glitchEffect(); // Iniciar o efeito quando a tela for montada

    // Animação de rotação contínua
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Interpolação para rotação
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Logo girando */}
      <Animated.Image
        source={require('../assets/logo.png')} // Caminho para a sua logo
        style={[styles.logo, { transform: [{ rotate }] }]}
      />

      <Animated.Text
        style={[
          styles.glitchText,
          {
            transform: [
              {
                translateX: glitchAnimX, // Aplicar movimento horizontal
              },
              {
                translateY: glitchAnimY, // Aplicar movimento vertical
              },
            ],
            opacity: opacityAnim, // Alterar a opacidade
          },
        ]}
      >
        BAGLEY
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120, // Tamanho da logo
    height: 120,
    marginBottom: 20, // Distância entre a logo e o texto
  },
  glitchText: {
    fontSize: 60,
    color: '#ffff', // Cor verde neon para imitar terminal
    fontWeight: 'bold',
    letterSpacing: 5,
    marginTop: 20,
    textShadowColor: '#ffffff',  // Cor azul da borda
    textShadowOffset: { width: 1, height: 1 }, // Deslocamento da sombra
    textShadowRadius: 10, // Tamanho da borda azul
    textTransform: 'uppercase',
  },
});

export default LoadingScreen;
