import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { PaperProvider, adaptNavigationTheme, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// TEMA CLARO AMARELO
const yellowLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#ffc107',
    primaryContainer: '#fff3c4',
    secondary: '#ffa000',
    secondaryContainer: '#ffecb3',
    tertiary: '#ffd54f',
    surface: '#ffffff',
    surfaceVariant: '#f5f5f5',
    background: '#ffffff',
    error: '#f44336',
    outline: '#e0e0e0',
  },
};

// TEMA ESCURO AMARELO
const yellowDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#ffc107',
    primaryContainer: '#423600',
    secondary: '#ffa000',
    secondaryContainer: '#674600',
    tertiary: '#ffd54f',
    surface: '#121212',
    surfaceVariant: '#1e1e1e',
    background: '#121212',
    error: '#f44336',
    outline: '#333333',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? yellowDarkTheme : yellowLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={colorScheme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </PaperProvider>
  );
}