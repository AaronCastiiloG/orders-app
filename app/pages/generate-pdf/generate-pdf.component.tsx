import { ScrollView, Text, View } from 'react-native';
import { Stack } from 'expo-router';

import { Button } from '../../components/button';
import { UseGeneratePdf } from './generate-pdf';
import { Order } from '../../interfaces/order.interface';
import { styles } from './generate-pdf.styles';

export default function GeneratePdf() {
  const useGeneratePdf = UseGeneratePdf();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerTitle: "Generar PDF"
      }} />

      <Text style={styles.title}>
        Vista previa de etiquetas
      </Text>

      <ScrollView contentContainerStyle={styles.previewContainer}>
        {
          useGeneratePdf.orders.map((order: Order) => (
            <View
              key={order.id}
              style={styles.label}
            >
              <Text style={styles.orderNumber}>
                Pedido #{order.identifier}
              </Text>

              <Text style={styles.customerName}>
                {order.personName}
              </Text>

              <Text style={styles.phone}>
                {order.personNumber}
              </Text>

              <Text style={styles.total}>
                Total: ${order.totalPrice}
              </Text>
            </View>
          ))
        }
      </ScrollView>

      <Button
        buttonText="Generar PDF"
        onClick={useGeneratePdf.generatePdf}
      />

    </View>
  );
}