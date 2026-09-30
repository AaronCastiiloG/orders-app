import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { PaperProvider } from 'react-native-paper';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#22C55E',
        backgroundColor: '#22C55E'
      }}
      text1Style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        color: '#fff',
        fontSize: 14,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#DC2626',
        backgroundColor: '#DC2626'
      }}
      text1Style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        color: '#fff',
        fontSize: 14,
      }}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#F59E0B',
        backgroundColor: '#F59E0B'
      }}
      text1Style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        color: '#fff',
        fontSize: 14,
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      borderLeftColor="#2563EB"
      style={{
        borderLeftColor: '#2563EB',
        backgroundColor: '#2563EB'
      }}
      text1Style={{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      }}
      text2Style={{
        color: '#fff',
        fontSize: 14,
      }}
    />
  ),
};

export default function Layout() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#1E293B' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontSize: 20 },
              headerTitleAlign: 'center',
            }}
          />
        </SafeAreaView>

        <Toast config={toastConfig}/>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
