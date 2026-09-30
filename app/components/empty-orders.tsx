import { View, Text, StyleSheet } from 'react-native';

export function EmptyOrders() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📋</Text>

      <Text style={styles.title}>
        Sin información
      </Text>

      <Text style={styles.subtitle}>
        No existen pedidos con los critertios de búsqueda ingresados.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
  },

  icon: {
    fontSize: 50,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});