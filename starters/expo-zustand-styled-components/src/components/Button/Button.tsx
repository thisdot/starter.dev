import React from 'react';
import { TouchableOpacityStyled, TextStyled } from './Button.styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacityStyled onPress={onPress}>
      <TextStyled>{title}</TextStyled>
    </TouchableOpacityStyled>
  );
};

export default Button;
