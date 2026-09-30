import { Modal, Text, TextInput, View} from 'react-native';

import { AddProductModalProps } from '../../../interfaces/components-props.interface';
import { Button } from '../../../components/button';
import { ButtonColor } from '../../../enums/button.enum';
import { Loader } from '../../../components/loader';
import { MAIN_STYLES } from '../../../MainStyles';
import { styles } from './add-product-modal.styles';
import { UseAddProductModal } from './add-product-modal';

export function AddProductModal(params: AddProductModalProps) {
  const useAddProductModal = UseAddProductModal(params);
  return (
    <Modal
    style={{ width: '80%' }}
      animationType="slide"
      transparent={true}
      visible={params.isVisible}
      onRequestClose={() => {
        params.onClose(useAddProductModal.response);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Agregar nuevo producto</Text>
          <View style={styles.inputSecction}>
            <Text style={MAIN_STYLES.boldText}>Nombre:</Text>
            <TextInput
              value={useAddProductModal.name}
              onChangeText={useAddProductModal.setName}
              style={MAIN_STYLES.simpleInput}
              editable={!useAddProductModal.isEditProduct}
            />
            <Text style={MAIN_STYLES.boldText}>Cantidad:</Text>
            <TextInput
              value={useAddProductModal.quantity}
              onChangeText={useAddProductModal.setQuantity}
              style={MAIN_STYLES.simpleInput}
              inputMode='numeric'
            />
            <Text style={MAIN_STYLES.boldText}>Precio unitario:</Text>
            <TextInput
              value={useAddProductModal.unitPrice}
              onChangeText={useAddProductModal.setPrice}
              style={MAIN_STYLES.simpleInput}
              inputMode='decimal'
              editable={!useAddProductModal.isEditProduct}
            />
          </View>
          <View style={styles.buttonsSection}>
            <Button
              buttonText='Cancelar'
              onClick={useAddProductModal.onCloseModal}
              customWidth={50}
              background={ButtonColor.danger}/>
            <Button
              buttonText='Guardar'
              onClick={useAddProductModal.onAddProduct}
              customWidth={50}
              disabled={!useAddProductModal.isSaveButtonEnabled}
              background={ButtonColor.success}/>
          </View>
        </View>
      </View>
      { useAddProductModal.isLoading && <Loader /> }
    </Modal>
  );
}
