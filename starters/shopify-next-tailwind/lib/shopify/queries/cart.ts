import { cartFragment } from './fragments';

export const getCartQuery = `#graphql
  ${cartFragment}
  query CartQuery($cartId: ID!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
`;
