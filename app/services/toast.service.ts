import Toast from 'react-native-toast-message';

class ToastService {
  showSuccess(message: string): void {
    console.log('Mostrando toast');
    Toast.show({
      type: 'success',
      text1: 'Éxito',
      text2: message,
    });
  }

  showError(message: string): void {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
    });
  }

  showWarning(message: string): void {
    Toast.show({
      type: 'warning',
      text1: 'Info',
      text2: message,
    });
  }
}

export const toastService = new ToastService();
