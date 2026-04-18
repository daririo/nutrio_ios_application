import React from 'react';
import { Text, TextProps, TextStyle, StyleProp } from 'react-native';

const baseStyle: StyleProp<TextStyle> = {
  fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 26,
    color: '#fff',
};

const AppTitle: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text {...props} style={[baseStyle, style]} />;
};

export default AppTitle;
