import { addressFragment } from '../queries/fragments';

export const REMOVE_ADDRESS = `#graphql
mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
  customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
    customerUserErrors {
        code
        field
        message
      }
    deletedCustomerAddressId
  }
}
`;

export const UPDATE_ADDRESS = `#graphql
	${addressFragment}
	mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
  customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
    customerAddress {
      ...mailingAddress
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}

`;

export const ADD_ADDRESS = `#graphql
	${addressFragment}
	mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
  customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
    customerAddress {
      ...mailingAddress
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`;

export const UPDATE_DEFAULT_ADDRESS_MUTATION = `#graphql
  mutation customerDefaultAddressUpdate(
    $addressId: ID!
    $customerAccessToken: String!
  ) {
    customerDefaultAddressUpdate(
      addressId: $addressId
      customerAccessToken: $customerAccessToken
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
