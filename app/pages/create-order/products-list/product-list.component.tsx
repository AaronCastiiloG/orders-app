import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Chip } from '../../../components/chip';
import { ChipProps, ProductListProps } from '../../../interfaces/components-props.interface';
import { PRODUCT_CONSTANTS } from '../../../constants/product.constants';
import { ProductStatus } from '../../../enums/product.enum';


export function ProductList(params: ProductListProps) {
  function getChiProps(status: ProductStatus): ChipProps {
    const chipProps = {
      ...PRODUCT_CONSTANTS.statusChipPros[status],
      label: PRODUCT_CONSTANTS.statusLabel[status],
    };

    return chipProps;
  }

  function isEditButtonDisabled(status: ProductStatus): boolean {
    return false;
  }

  function isDeleteButtonDisabled(status: ProductStatus): boolean {
    return false;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Nombre</Text>
        <Text style={styles.headerCell}>Cantidad</Text>
        <Text style={styles.headerCell}>Estatus</Text>
        <Text style={styles.headerCell}>Acción</Text>
      </View>

      <FlatList
        data={params.products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Text style={styles.cell}><Chip { ...getChiProps(item.purchaseStatus) }/></Text>
            <View style={styles.actionsCell}>
              <TouchableOpacity
                disabled={isEditButtonDisabled(item.purchaseStatus)}
                style={[
                  styles.editButton,
                  {
                    opacity: isEditButtonDisabled(item.purchaseStatus) ? 0.5 : 1,
                  }
                ]}
                onPress={() => params.onEditProduct(item)}>
                <Feather
                  name="edit-2"
                  size={18}
                  color="white"/>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isDeleteButtonDisabled(item.purchaseStatus)}
                style={[
                  styles.deleteButton,
                  {
                    opacity: isDeleteButtonDisabled(item.purchaseStatus) ? 0.5 : 1,
                  }
                ]}
                onPress={() => params.onDeleteProduct(item.id)}>
                <Feather
                  name="trash-2"
                  size={18}
                  color="white"/>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  actionsCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
