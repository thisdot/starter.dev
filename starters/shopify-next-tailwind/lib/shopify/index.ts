import {
	HIDDEN_PRODUCT_TAG,
	SHOPIFY_GRAPHQL_API_ENDPOINT,
} from '@/lib/constants';
import { isShopifyError } from '@/lib/type-guards';
import { LAYOUT_QUERY } from './queries/layout';
import { ALL_PRODUCTS_QUERY } from './queries/product';
import {
	COLLECTIONS_QUERY,
	COLLECTION_QUERY,
	SORTED_AND_FILTERED_PRODUCTS_QUERY,
} from './queries/collection';
import {
	Cart,
	Blog,
	CollectionConnection,
	Connection,
	ProductConnection,
	ShopifyAddToCartOperation,
	ShopifyCart,
	ShopifyCartOperation,
	ShopifyCreateCartOperation,
	ShopifyCollectionProducts,
	ShopifyFeaturedCollectionOperation,
	ShopifyFeaturedProductOperation,
	ShopifyHeroOperation,
	ShopifyHomePageSeoOperation,
	ShopifyLayoutOperation,
	ShopifyRemoveFromCartOperation,
	ShopifyUpdateCartOperation,
	CustomerCreatePayload,
	Product,
	ShopifyProduct,
	ShopifyProductOperation,
	ShopifyProductRecommendationsOperation,
	ProductSortKeys,
	CustomerAccessTokenCreatePayload,
	CustomerRecoverPayload,
	CustomerResetPayload,
	Customer,
	MailingAddress,
	MailingAddressInput,
	CustomerUpdatePayload,
	CustomerUpdateInput,
	Order,
	ShopPolicy,
} from './types';
import {
	HOMEPAGE_FEATURED_PRODUCTS_QUERY,
	COLLECTION_HERO_QUERY,
	FEATURED_COLLECTIONS_QUERY,
} from './queries/homepage';
import { SEARCH_QUERY } from './queries/search';
import {
	createCartMutation,
	addToCartMutation,
	removeFromCartMutation,
	editCartItemsMutation,
	applyDiscountCode,
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import { ARTICLE_QUERY, BLOGS_QUERY } from './queries/blog';
import { FiltersQueryParams } from '@/app/collections/[collectionHandle]/page';
import {
	CUSTOMER_CREATE_MUTATION,
	CUSTOMER_RECOVER_MUTATION,
	CUSTOMER_RESET_MUTATION,
	LOGIN_MUTATION,
} from './mutations/auth';
import { PRODUCT_QUERY, RECOMMENDED_PRODUCTS_QUERY } from './queries/fragments';
import { CUSTOMER_QUERY } from './queries/user';
import {
	ADD_ADDRESS,
	REMOVE_ADDRESS,
	UPDATE_ADDRESS,
	UPDATE_DEFAULT_ADDRESS_MUTATION,
} from './mutations/address';
import { CUSTOMER_UPDATE_MUTATION } from './mutations/customer';
import { CUSTOMER_ORDER_QUERY } from './queries/orders';
import { POLICIES_QUERY, POLICY_CONTENT_QUERY } from './queries/policies';

const domain = `https://${process.env.PUBLIC_STORE_DOMAIN!}`;
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.PUBLIC_STOREFRONT_API_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
	? T['variables']
	: never;

const removeEdgesAndNodes = (array: Connection<any>) => {
	return array.edges.map(edge => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
	if (!cart.cost?.totalTaxAmount) {
		cart.cost.totalTaxAmount = {
			amount: '0.0',
			currencyCode: 'USD',
		};
	}

	return {
		...cart,
		lines: removeEdgesAndNodes(cart.lines),
	};
};

const reshapeProduct = (
	product: ShopifyProduct,
	filterHiddenProducts: boolean = true
) => {
	if (
		!product ||
		(filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
	) {
		return undefined;
	}

	const { images, variants, ...rest } = product;

	return {
		...rest,
		images: removeEdgesAndNodes(images),
		variants: removeEdgesAndNodes(variants),
	};
};

const reshapeProducts = (products: ShopifyProduct[]) => {
	const reshapedProducts = [];

	for (const product of products) {
		if (product) {
			const reshapedProduct = reshapeProduct(product);

			if (reshapedProduct) {
				reshapedProducts.push(reshapedProduct);
			}
		}
	}

	return reshapedProducts;
};

export async function shopifyFetch<T>({
	query,
	variables,
	headers,
	cache = 'force-cache',
}: {
	query: string;
	variables?: ExtractVariables<T>;
	headers?: HeadersInit;
	cache?: RequestCache;
}): Promise<{ status: number; body: T }> {
	try {
		const result = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': key,
				...headers,
			},
			body: JSON.stringify({
				...(query && { query }),
				...(variables && { variables }),
			}),
			cache,
			next: cache === 'only-if-cached' ? { revalidate: 900 } : undefined, // 15 minutes
		});

		const body = await result.json();

		if (body.errors) {
			throw body.errors[0];
		}

		return {
			status: result.status,
			body,
		};
	} catch (e) {
		if (isShopifyError(e)) {
			throw {
				status: e.status || 500,
				message: e.message,
				query,
			};
		}

		throw {
			error: e,
			query,
		};
	}
}

export async function getLayoutData() {
	const data = await shopifyFetch<ShopifyLayoutOperation>({
		query: LAYOUT_QUERY,
		variables: {
			headerMenuHandle: 'main-menu',
			footerMenuHandle: 'footer',
		},
	});
	return data;
}

export async function getAllProducts({
	variables,
}: {
	variables: {
		last?: number;
		startCursor?: string;
		first?: number;
		endCursor?: string;
	};
}) {
	const data = await shopifyFetch<{
		data: {
			products: ProductConnection;
		};
		variables: {
			last?: number;
			startCursor?: string;
			first?: number;
			endCursor?: string;
		};
	}>({
		query: ALL_PRODUCTS_QUERY,
		variables: {
			...variables,
		},
	});
	return data;
}

export async function getAllCollections({
	variables,
}: {
	variables: {
		last?: number;
		startCursor?: string;
		first?: number;
		endCursor?: string;
	};
}) {
	const data = await shopifyFetch<{
		data: {
			collections: CollectionConnection;
		};
		variables: {
			last?: number;
			startCursor?: string;
			first?: number;
			endCursor?: string;
		};
	}>({
		query: COLLECTIONS_QUERY,
		variables: {
			...variables,
		},
	});
	return data;
}

export async function getHomepageSeo() {
	const data = await shopifyFetch<ShopifyHomePageSeoOperation>({
		query: COLLECTION_HERO_QUERY,
		variables: {
			handle: 'hydrogen',
		},
	});
	return data;
}

export async function getFeaturedProducts() {
	const data = await shopifyFetch<ShopifyFeaturedProductOperation>({
		query: HOMEPAGE_FEATURED_PRODUCTS_QUERY,
	});
	return data;
}

export async function getSecondaryHero() {
	const data = await shopifyFetch<ShopifyHeroOperation>({
		query: COLLECTION_HERO_QUERY,
		variables: {
			handle: 'automated-collection',
		},
	});
	return data;
}

export async function getFeaturedCollections() {
	const data = await shopifyFetch<ShopifyFeaturedCollectionOperation>({
		query: FEATURED_COLLECTIONS_QUERY,
	});
	return data;
}

export async function getTertiaryHero() {
	const data = await shopifyFetch<ShopifyHeroOperation>({
		query: COLLECTION_HERO_QUERY,
		variables: {
			handle: 'frontpage',
		},
	});
	return data;
}

export async function createCart(): Promise<Cart> {
	const res = await shopifyFetch<ShopifyCreateCartOperation>({
		query: createCartMutation,
		cache: 'no-store',
	});

	return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
	cartId: string,
	lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyAddToCartOperation>({
		query: addToCartMutation,
		variables: {
			cartId,
			lines,
		},
		cache: 'no-store',
	});
	return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
	cartId: string,
	lineIds: string[]
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
		query: removeFromCartMutation,
		variables: {
			cartId,
			lineIds,
		},
		cache: 'no-store',
	});

	return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
	cartId: string,
	lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
	const res = await shopifyFetch<ShopifyUpdateCartOperation>({
		query: editCartItemsMutation,
		variables: {
			cartId,
			lines,
		},
		cache: 'no-store',
	});

	return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
	const res = await shopifyFetch<ShopifyCartOperation>({
		query: getCartQuery,
		variables: { cartId },
		cache: 'no-store',
	});

	if (!res.body.data.cart) {
		return null;
	}

	return reshapeCart(res.body.data.cart);
}

export async function applyDiscountToCart({
	cartId,
	discountCodes,
}: {
	cartId: string;
	discountCodes?: string[];
}): Promise<Cart | null> {
	const res = await shopifyFetch<
		Omit<ShopifyCartOperation, 'variables'> & {
			data: {
				cartDiscountCodesUpdate: {
					cart: ShopifyCart;
				};
			};
			variables: {
				cartId: string;
				discountCodes?: string[];
			};
		}
	>({
		query: applyDiscountCode,
		variables: { cartId, discountCodes },
		cache: 'no-store',
	});

	if (!res.body.data.cartDiscountCodesUpdate.cart) {
		return null;
	}

	return reshapeCart(res.body.data.cartDiscountCodesUpdate.cart);
}

export async function getAllPosts({
	variables,
}: {
	variables: {
		cursor?: string;
		pageBy?: number;
		blogHandle: string;
	};
}) {
	const data = await shopifyFetch<{
		data: {
			blog: Blog;
		};
		variables: {
			cursor?: string;
			pageBy?: number;
			blogHandle: string;
		};
	}>({
		query: BLOGS_QUERY,
		variables: {
			...variables,
		},
	});
	return data;
}

export async function getArticleByHandle({
	variables,
}: {
	variables: {
		articleHandle: string;
		blogHandle: string;
	};
}) {
	const data = await shopifyFetch<{
		data: {
			blog: Blog;
		};
		variables: {
			articleHandle: string;
			blogHandle: string;
		};
	}>({
		query: ARTICLE_QUERY,
		variables: {
			...variables,
		},
	});
	return data;
}

export async function getSearchedProducts({
	variables,
}: {
	variables: {
		last?: number;
		startCursor?: string;
		first?: number;
		searchTerm?: string;
		endCursor?: string;
	};
}) {
	const data = await shopifyFetch<{
		data: {
			products: ProductConnection;
		};
		variables: {
			last?: number;
			startCursor?: string;
			first?: number;
			endCursor?: string;
			searchTerm?: string;
		};
	}>({
		query: SEARCH_QUERY,
		variables: {
			...variables,
		},
	});
	return data;
}

export async function getCollectionProducts({
	variables,
}: {
	variables: {
		handle: string;
		pageBy: number;
		cursor: string | null;
		filters: FiltersQueryParams;
		sortKey: string;
		reverse?: boolean;
	};
}) {
	const data = await shopifyFetch<ShopifyCollectionProducts>({
		query: COLLECTION_QUERY,
		variables,
	});
	return data;
}

export async function createCustomer({
	variables,
}: {
	variables: {
		input: {
			email: string;
			password: string;
		};
	};
}) {
	const data = await shopifyFetch<{
		data: {
			customerCreate: CustomerCreatePayload;
		};
		variables: {
			input: {
				email: string;
				password: string;
			};
		};
	}>({
		query: CUSTOMER_CREATE_MUTATION,
		variables,
	});
	return data;
}

export async function loginCustomer({
	variables,
}: {
	variables: {
		input: {
			email: string;
			password: string;
		};
	};
}) {
	const data = await shopifyFetch<{
		data: {
			customerAccessTokenCreate: CustomerAccessTokenCreatePayload;
		};
		variables: {
			input: {
				email: string;
				password: string;
			};
		};
	}>({
		query: LOGIN_MUTATION,
		variables,
	});
	return data;
}

export async function recoverCustomersPassword({
	variables,
}: {
	variables: {
		email: string;
	};
}) {
	const data = await shopifyFetch<{
		data: {
			customerRecover: CustomerRecoverPayload;
		};
		variables: {
			email: string;
		};
	}>({
		query: CUSTOMER_RECOVER_MUTATION,
		variables,
	});
	return data;
}

export async function resetCustomersPassword({
	variables,
}: {
	variables: {
		id: string;
		input: {
			password: string;
			resetToken: string;
		};
	};
}) {
	const data = await shopifyFetch<{
		data: {
			customerReset: CustomerResetPayload;
		};
		variables: {
			id: string;
			input: {
				password: string;
				resetToken: string;
			};
		};
	}>({
		query: CUSTOMER_RESET_MUTATION,
		variables,
	});
	return data;
}

export async function getCustomer(
	customerAccessToken: string
): Promise<Customer> {
	const res = await shopifyFetch<{
		data: { customer: Customer };
		variables: {
			customerAccessToken: string;
		};
	}>({
		query: CUSTOMER_QUERY,
		variables: {
			customerAccessToken,
		},
	});

	/**
	 * If the customer failed to load, we assume their access token is invalid.
	 */
	if (!res?.body.data.customer) {
		// log out customer
	}

	return res.body.data.customer;
}

export async function getProduct(
	handle: string,
	selectedOptions: any[]
): Promise<Product | any | undefined> {
	const res = await shopifyFetch<ShopifyProductOperation>({
		query: PRODUCT_QUERY,
		variables: {
			handle,
			selectedOptions,
		},
	});

	return {
		product: res.body.data.product,
		shop: res.body.data.shop,
	};
}

export async function getProductRecommendations(
	productId: string
): Promise<Product[] | any> {
	const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
		query: RECOMMENDED_PRODUCTS_QUERY,
		variables: {
			productId,
			count: 12,
		},
	});

	const products = res.body.data;

	const mergedProducts = products.recommended
		.concat(products.additional.nodes)
		.filter(
			(value, index, array) =>
				array.findIndex(value2 => value2.id === value.id) === index
		);

	const originalProduct = mergedProducts
		.map((item: any) => item.id)
		.indexOf(productId);

	mergedProducts.splice(originalProduct, 1);

	return mergedProducts;
}

export async function getFilteredAndSortedProducts({
	variables,
}: {
	variables: {
		query: string;
		reverse: boolean;
		sortKey: ProductSortKeys;
		count: number;
	};
}) {
	const data = await shopifyFetch<{
		data: { products: ProductConnection };
		variables: {
			query: string;
			reverse: boolean;
			sortKey: ProductSortKeys;
			count: number;
		};
	}>({
		query: SORTED_AND_FILTERED_PRODUCTS_QUERY,
		variables,
	});

	return data;
}

export async function deleteAddress({
	variables,
}: {
	variables: { customerAccessToken: string; id: string };
}) {
	const data = await shopifyFetch<{
		data: {
			customerAddressDelete: {
				customerUserErrors: {
					code: string;
					field: string[];
					message: string;
				}[];
			};
			deletedCustomerAddressId: string;
		};
		variables: {
			customerAccessToken: string;
			id: string;
		};
	}>({
		query: REMOVE_ADDRESS,
		variables,
	});

	return data;
}

export async function addAddress({
	variables,
}: {
	variables: { address: MailingAddressInput; customerAccessToken: string };
}) {
	const data = await shopifyFetch<{
		data: {
			customerAddressCreate: {
				customerAddress: MailingAddress;
				customerUserErrors: {
					code: string;
					field: string[];
					message: string;
				}[];
			};
		};
		variables: {
			address: MailingAddressInput;
			customerAccessToken: string;
		};
	}>({
		query: ADD_ADDRESS,
		variables,
	});

	return data;
}

export async function updateAddress({
	variables,
}: {
	variables: {
		address: MailingAddressInput;
		customerAccessToken: string;
		id: string;
	};
}) {
	const data = await shopifyFetch<{
		data: {
			customerAddressUpdate: {
				customerAddress: MailingAddress;
				customerUserErrors: {
					code: string;
					field: string[];
					message: string;
				}[];
			};
		};
		variables: {
			address: MailingAddressInput;
			customerAccessToken: string;
			id: string;
		};
	}>({
		query: UPDATE_ADDRESS,
		variables,
	});

	return data;
}

export async function updateDefaultAddress({
	variables,
}: {
	variables: { addressId: string; customerAccessToken: string };
}) {
	const data = await shopifyFetch<{
		data: {
			customerDefaultAddressUpdate: {
				customerUserErrors: {
					code: string;
					field: string[];
					message: string;
				}[];
			};
		};
		variables: {
			addressId: string;
			customerAccessToken: string;
		};
	}>({
		query: UPDATE_DEFAULT_ADDRESS_MUTATION,
		variables,
	});

	return data;
}

export async function updateAccount({
	variables,
}: {
	variables: { customer: CustomerUpdateInput; customerAccessToken: string };
}) {
	const data = await shopifyFetch<{
		data: {
			customerUpdate: CustomerUpdatePayload;
		};
		variables: {
			customerAccessToken: string;
			customer: CustomerUpdateInput;
		};
	}>({
		query: CUSTOMER_UPDATE_MUTATION,
		variables,
	});

	return data;
}

export async function getCustomerOrder(orderId: string) {
	const data = await shopifyFetch<{
		data: {
			node: Order;
		};
		variables: { orderId: string };
	}>({
		query: CUSTOMER_ORDER_QUERY,
		variables: { orderId },
	});

	return data;
}

export async function getPolicies() {
	const data = await shopifyFetch<{
		data: {
			shop: Record<string, ShopPolicy>;
		};
	}>({
		query: POLICIES_QUERY,
	});

	return data;
}

export async function getPolicyContent(variables: { policyName: string }) {
	const data = await shopifyFetch<{
		data: {
			shop: Record<string, ShopPolicy>;
		};
		variables: {
			privacyPolicy: false;
			shippingPolicy: false;
			termsOfService: false;
			refundPolicy: false;
			[policyName: string]: boolean;
		};
	}>({
		query: POLICY_CONTENT_QUERY,
		variables: {
			privacyPolicy: false,
			shippingPolicy: false,
			termsOfService: false,
			refundPolicy: false,
			[variables.policyName]: true,
		},
	});

	return data;
}
