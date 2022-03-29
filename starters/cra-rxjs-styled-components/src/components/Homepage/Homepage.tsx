import {
  HeaderContainer,
  Header,
  ExampleLink,
  ButtonLinkDiv,
} from './Homepage.styles';
export function Homepage() {
  return (
    <HeaderContainer>
      <Header>Create React App, RxJS and styled-components Starter kit</Header>
      <ButtonLinkDiv>
        <ExampleLink to="/button-example">
          See Button example component
        </ExampleLink>
        <ExampleLink to="/rxjs-example">See RxJS example component</ExampleLink>
      </ButtonLinkDiv>
    </HeaderContainer>
  );
}
