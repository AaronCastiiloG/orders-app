import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Main } from './Main';
import { MAIN_STYLES } from './MainStyles';

export default function Index() {
  return (
    <View style={MAIN_STYLES.main_container}>
      <StatusBar style="light" />
      <Main />
    </View>
  );
}

