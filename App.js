import { LogBox } from 'react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, Text, Button, Card } from 'react-native-paper';

// Suprime warnings específicos (opcional)
LogBox.ignoreLogs([
  'props.pointerEvents is deprecated',
  'Cannot record touch end without a touch start'
]);

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.title}>
              🔐 SafeShield Mobile
            </Text>
            <Text variant="bodyMedium">
              Seu aplicativo está funcionando perfeitamente!
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => console.log('Funcionando!')}>
              Testar
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
});