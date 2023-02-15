import React from 'react';
import { TouchableOpacity } from 'react-native';

import Button from '../../components/Button';
import {
  SafeAreaViewStyled,
  RowStyled,
  TitleStyled,
  CountStyled,
  ImageStyled,
} from './Home.styles';
import { useCounter } from './useCounter';

const Home = ({ navigation }: { navigation: any }) => {
  const count = useCounter((state) => state.count);
  const increment = useCounter((state) => state.increment);
  const decrement = useCounter((state) => state.decrement);
  const reset = useCounter((state) => state.reset);

  return (
    <SafeAreaViewStyled>
      <RowStyled>
        <TouchableOpacity onPress={() => navigation.navigate('about')}>
          <ImageStyled source={require('../../../assets/about-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={reset}>
          <ImageStyled source={require('../../../assets/reload-icon.png')} />
        </TouchableOpacity>
      </RowStyled>
      <TitleStyled>Counter</TitleStyled>
      <CountStyled>{count}</CountStyled>
      <RowStyled>
        <Button title="-" onPress={decrement} />
        <Button title="+" onPress={increment} />
      </RowStyled>
    </SafeAreaViewStyled>
  );
};

export default Home;
