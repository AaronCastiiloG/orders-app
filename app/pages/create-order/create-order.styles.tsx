import { StyleSheet } from 'react-native';

export const CreateOrderStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F8FAFC',
    padding: 20
  },
  inputSecction: {
    gap: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  formContainer: {
    width: '100%',
    height: '90%',
    gap: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10
  },
  totalContainer: {
    width: '100%'
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    borderWidth: 1,
  },
  totalOrderText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  }
});