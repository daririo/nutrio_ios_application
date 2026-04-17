import React from 'react';
import { Text, TextProps, TextStyle, StyleProp } from 'react-native';

const baseStyle: StyleProp<TextStyle> = {
  fontSize: 11,
  fontWeight: 'regular',
  lineHeight: 20,
  color: '#fff',
};

const AppText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text {...props} style={[baseStyle, style]} />;
};

export default AppText;
