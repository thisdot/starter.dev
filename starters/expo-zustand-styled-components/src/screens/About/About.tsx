import { View, Text, Image } from 'react-native';
import React from 'react';
import { SafeAreaViewStyled, TitleStyled } from './About.styles';

const About = () => {
  return (
    <SafeAreaViewStyled>
      <Image source={require('../../../assets/starter-logo.png')} />
      <TitleStyled>Expo Starter kit</TitleStyled>
    </SafeAreaViewStyled>
  );
};

export default About;
