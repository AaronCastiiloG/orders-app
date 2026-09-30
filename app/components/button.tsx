import { Pressable, Text } from 'react-native';

import { MAIN_STYLES } from '../MainStyles';
import { ButtonProps } from '../interfaces/components-props.interface';

export function Button(params: ButtonProps) {
  const { buttonText, customWidth, disabled, background } = params;

  return(
    <Pressable
      style={({ pressed }) =>[
        MAIN_STYLES.button,
        { width: customWidth ? `${customWidth}%` : '100%' },
        { backgroundColor: background ? background : '#2563EB' },
        pressed && { opacity: 0.7 },
        disabled && { opacity: 0.5 }
      ]}
      disabled={disabled}
      onPress={params.onClick}>
      <Text style={MAIN_STYLES.buttonText}>{buttonText}</Text>
    </Pressable>
  );
}