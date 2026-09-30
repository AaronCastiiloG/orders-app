import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import OrderView from './pages/order-view/order-view.component';

export function Main() {
  const insets = useSafeAreaInsets();

  return(
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, width: '100%', height: '100%' }}>
      <OrderView />
    </View>
  );
}
