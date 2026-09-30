import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';

import { ToolbarProps } from '../interfaces/components-props.interface';
import { GoBackIcon } from '../utils/icons';

export function Toolbar(params: ToolbarProps) {
  return(
    <View style={styles.topBar}>
      {params.isBackButtonVisible && (
        <Link asChild href={params.backButtonRoute || '/'}>
          <View>
            <GoBackIcon/>
          </View>
        </Link>
      )}
      <Text style={styles.topBarText}>{params.title}</Text>    
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#1E293B',
    width: '100%',
    alignItems: 'center',
  },
  topBarText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
    margin: 5,
    color: '#fff'
  }
});