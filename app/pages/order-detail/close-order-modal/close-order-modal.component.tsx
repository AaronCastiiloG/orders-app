import {
    Modal,
    View,
    Text,
    TextInput,
} from 'react-native';
import Checkbox from 'expo-checkbox';

import { Button } from '../../../components/button';
import { ButtonColor } from '../../../enums/button.enum';
import { CloseOrderModalProps } from '../../../interfaces/components-props.interface';
import { styles } from './close-order-modal.styles';
import { UseCloseOrderModal } from './close-order-modal';

export function CloseOrderModal(params: CloseOrderModalProps) {
  const useCloseOrderModal = UseCloseOrderModal(params);

  return (
    <Modal
      visible={params.isVisible}
      transparent
      animationType="fade"
      onRequestClose={() => params.onClose(useCloseOrderModal.response)}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Cerrar Pedido</Text>

          <Text style={styles.subtitle}>
            Seleccione si el pedido fue entregado
          </Text>

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={useCloseOrderModal.isDelivered}
              onValueChange={useCloseOrderModal.toggleDelivered}
            />
            <Text style={styles.checkboxText}>
                Pedido entregado
            </Text>
          </View>

          {!useCloseOrderModal.isDelivered && (
            <>
              <Text style={styles.label}>Motivo</Text>

              <TextInput
                placeholder="Escribe el motivo del no entregado..."
                value={useCloseOrderModal.reason}
                onChangeText={useCloseOrderModal.setReason}
                style={styles.input}
                multiline
              />
            </>
          )}
          <View style={styles.buttons}>
            <Button
              buttonText='Atras'
              onClick={useCloseOrderModal.onCloseModal}
              customWidth={50}
              background={ButtonColor.danger}/>
            <Button
              buttonText='Guardar'
              onClick={useCloseOrderModal.onDeliverOrder}
              customWidth={50}
              disabled={!useCloseOrderModal.isCloseOrderButtonEnabled()}
              background={ButtonColor.success}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}
