import React, { useState } from 'react';
import { StyleSheet, View, Alert, ScrollView, Dimensions } from 'react-native';
import { 
  Text, 
  Button, 
  Card, 
  TextInput, 
  Switch,
  IconButton
} from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function TabOneScreen() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState('12');
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const generatePassword = () => {
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let characters = lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
    
    if (characters === '') {
      Alert.alert('Erro', 'Selecione pelo menos um tipo de caractere!');
      return;
    }
    
    const passwordLength = parseInt(length) || 12;
    let result = '';
    
    for (let i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    setPassword(result);
    setPasswordHistory(prev => [result, ...prev.slice(0, 9)]);
  };

  const copyToClipboard = (pwd?: string) => {
    const textToCopy = pwd || password;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      Alert.alert('Sucesso', 'Senha copiada!');
    } else {
      Alert.alert('Senha Gerada', textToCopy);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Cores dinâmicas
  const backgroundColor = isDarkMode ? '#121212' : '#f5f5f5';
  const surfaceColor = isDarkMode ? '#1e1e1e' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#333333';
  const secondaryTextColor = isDarkMode ? '#aaaaaa' : '#666666';
  const borderColor = isDarkMode ? '#333333' : '#e0e0e0'; // CORRIGIDO: definida aqui
  const primaryColor = '#ffc107';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.scrollView}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: textColor }]}>SafeShield Mobile</Text>
          </View>
          <IconButton
            icon={isDarkMode ? "white-balance-sunny" : "moon-waning-crescent"}
            iconColor={primaryColor}
            size={24}
            onPress={toggleTheme}
          />
        </View>

        <Card style={[styles.card, { backgroundColor: surfaceColor }]}>
          <Card.Content>
            {/* LOGO */}
            <View style={styles.logoContainer}>
              <View style={[styles.logoPlaceholder, { backgroundColor: '#fff3c4', borderColor: primaryColor }]}>
                <Text style={styles.logoEmoji}>🔐</Text>
              </View>
              <View style={styles.subtitleContainer}>
                <Text style={[styles.subtitle, { color: secondaryTextColor }]}>Seguro • Rápido • Grátis</Text>
              </View>
            </View>

            {/* Senha Gerada */}
            <TextInput
              label="Senha Gerada"
              value={password}
              mode="outlined"
              style={styles.passwordInput}
              editable={false}
              dense={false}
              right={
                password ? (
                  <TextInput.Icon 
                    icon="content-copy" 
                    onPress={() => copyToClipboard()} 
                  />
                ) : null
              }
              theme={{
                colors: {
                  primary: primaryColor,
                  background: surfaceColor,
                  onSurface: textColor,
                },
                roundness: 8,
              }}
            />

            {/* Comprimento */}
            <TextInput
              label="Comprimento"
              value={length}
              onChangeText={setLength}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
              dense={false}
              theme={{
                colors: {
                  primary: primaryColor,
                  background: surfaceColor,
                  onSurface: textColor,
                },
                roundness: 8,
              }}
            />

            {/* Opções */}
            <View style={styles.option}>
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionText, { color: textColor }]}>Letras Maiúsculas (A-Z)</Text>
              </View>
              <Switch
                value={includeUppercase}
                onValueChange={setIncludeUppercase}
              />
            </View>

            <View style={styles.option}>
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionText, { color: textColor }]}>Números (0-9)</Text>
              </View>
              <Switch
                value={includeNumbers}
                onValueChange={setIncludeNumbers}
              />
            </View>

            <View style={styles.option}>
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionText, { color: textColor }]}>Símbolos (!@#$%)</Text>
              </View>
              <Switch
                value={includeSymbols}
                onValueChange={setIncludeSymbols}
              />
            </View>

          </Card.Content>

          <Card.Actions>
            <Button 
              mode="contained" 
              onPress={generatePassword}
              style={styles.button}
            >
              Gerar Senha
            </Button>
          </Card.Actions>
        </Card>

        {/* HISTÓRICO DE SENHAS - CORRIGIDO */}
        {passwordHistory.length > 0 && (
          <Card style={[styles.card, styles.historyCard, { backgroundColor: surfaceColor }]}>
            <Card.Content>
              <View style={styles.historyTitleContainer}>
                <Text style={[styles.historyTitle, { color: textColor }]}>📜 Histórico de Senhas</Text>
              </View>
              {passwordHistory.map((pwd, index) => (
                <View key={index} style={[styles.historyItem, { borderBottomColor: borderColor }]}> {/* CORRIGIDO: borderColor definida */}
                  <View style={styles.historyPasswordContainer}>
                    <Text style={[styles.historyPassword, { color: textColor }]} numberOfLines={1}>
                      {pwd}
                    </Text>
                  </View>
                  <Button 
                    compact 
                    icon="content-copy"
                    onPress={() => copyToClipboard(pwd)}
                    style={styles.copyButton}
                  >
                    Copiar
                  </Button>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}
      </ScrollView>

      {/* RODAPÉ */}
      <View style={[styles.footer, { backgroundColor: primaryColor }]}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>
            &copy; 2025 SafeShield Mobile. Todos os direitos reservados.
          </Text>
        </View>
        <View style={styles.footerSubtextContainer}>
          <Text style={styles.footerSubtext}>
            Desenvolvido por Manoela H para sua segurança
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: width > 768 ? 32 : 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
    maxWidth: width > 768 ? 800 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
    paddingVertical: 10,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
  },
  logoEmoji: {
    fontSize: 40,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  passwordInput: {
    marginBottom: 32,
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    borderRadius: 5,
  },
  historyCard: {
    marginTop: 0,
  },
  historyTitleContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  historyPasswordContainer: {
    flex: 1,
  },
  historyPassword: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  copyButton: {
    marginLeft: 8,
  },
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin:10,
    borderRadius: 5,
  },
  footerTextContainer: {
    marginBottom: 4,
  },
  footerSubtextContainer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});