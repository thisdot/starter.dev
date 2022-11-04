import styled from 'styled-components/native';

export const SafeAreaViewStyled = styled.SafeAreaView`
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const RawStyled = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 80%;
`;

export const NavButtonStyled = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
`;

export const TitleStyled = styled.Text`
  font-size: 50px;
  font-weight: 300;
  text-align: center;
`;

export const CountStyled = styled.Text`
  font-size: 150px;
`;
