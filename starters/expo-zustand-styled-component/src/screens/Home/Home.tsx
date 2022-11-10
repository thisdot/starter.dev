import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaViewStyled, RawStyled, TitleStyled, CountStyled } from './Home.styles';
import Button from '../../components/Button';
import { useCounter } from './useCounter';

const Home = ({ navigation }: { navigation: any }) => {
  const count = useCounter((state) => state.count);
  const increment = useCounter((state) => state.increment);
  const decrement = useCounter((state) => state.decrement);
  const reset = useCounter((state) => state.reset);

  return (
    <SafeAreaViewStyled>
      <RawStyled>
        <TouchableOpacity onPress={() => navigation.navigate('about')}>
          <Image source={require('../../../assets/about-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={reset}>
          <Image source={require('../../../assets/reload-icon.png')} />
        </TouchableOpacity>
      </RawStyled>
      <TitleStyled>Counter</TitleStyled>
      <CountStyled>{count}</CountStyled>
      <RawStyled>
        <Button title="-" onPress={decrement} />
        <Button title="+" onPress={increment} />
      </RawStyled>
    </SafeAreaViewStyled>
  );
};

export default Home;
