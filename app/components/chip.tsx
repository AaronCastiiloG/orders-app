import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, Text } from 'react-native';

import { ChipProps } from '../interfaces/components-props.interface';

export function Chip(props: ChipProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: props.background,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        gap: 4,
      }}
    >
      {props.icon && (
        <MaterialIcons
          name={props.icon}
          size={14}
          color={props.color}
        />
      )}

      <Text
        style={{
          color: props.color,
          fontSize: 12,
          fontWeight: '600'
        }}
      >
        {props.label}
      </Text>
    </View>
  );
}