import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
  },

  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20
  },

  label: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },

  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  customerName: {
    fontSize: 16,
    marginBottom: 6
  },

  phone: {
    fontSize: 14,
    marginBottom: 10
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});