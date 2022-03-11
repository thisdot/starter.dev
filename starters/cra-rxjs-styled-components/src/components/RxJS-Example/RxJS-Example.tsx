import {
  RxJSExampleContainer,
  HomeLinkDiv,
  ReturnHomeLink,
} from './RxJS-Example.styles';

export const RxJSExample = () => {
  return (
    <RxJSExampleContainer>
      <h1>RxJS Fetch Data from API</h1>
      <HomeLinkDiv>
        <ReturnHomeLink to="/">Return Home</ReturnHomeLink>
      </HomeLinkDiv>
    </RxJSExampleContainer>
  );
};
