import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Main } from './app/Main';
import { MAIN_STYLES } from './app/MainStyles';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={MAIN_STYLES.main_container}>
        <StatusBar style="light" />
        <Main />
      </View>
    </SafeAreaProvider>
  );
}
