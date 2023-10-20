import { FiltersQueryParams } from '@/app/collections/[collectionHandle]/page';
import { CollectionHero } from '@/components/Hero';
import { LanguageCode } from '@shopify/hydrogen-react/storefront-api-types';

export type Shop = {
	id: string;
	name: string;
	description: string | null;
	currencyCode: CurrencyCode;
	primaryDomain: {
		url: string;
	};
	brand: {
		logo?: {
			image: {
				url: string;
			};
		};
	};
};

export type ShopifyHeaderMenu = {
	id: string;
	items: Array<{
		id: string;
		resourceId: string | null;
		tags: Array<string>;
		title: string;
		type: string;
		url: string;
		items: Array<{
			id: string;
			resourceId: string | null;
			tags: Array<string>;
			title: string;
			type: string;
			url: string;
		}>;
	}>;
};

export type ShopifyFooterMenu = {
	id: string;
	items: Array<{
		id: string;
		resourceId: string | null;
		tags: Array<string>;
		title: string;
		type: string;
		url: string;
		items?: Array<{
			id: string;
			resourceId: string | null;
			tags: Array<string>;
			title: string;
			type: string;
			url: string;
		}>;
	}>;
};

export type ShopifyFooterItem = {
	id: string;
	resourceId: string | null;
	tags: Array<string>;
	title: string;
	type: string;
	url: string;
	items?: Array<{
		id: string;
		resourceId: string | null;
		tags: Array<string>;
		title: string;
		type: string;
		url: string;
	}>;
};

export type ShopifyLayoutOperation = {
	data: {
		shop: Shop;
		shopLocales: {
			locale: LanguageCode;
		}[];
		headerMenu: ShopifyHeaderMenu;
		footerMenu: ShopifyFooterMenu;
	};
	variables: {
		headerMenuHandle: string;
		footerMenuHandle: string;
	};
};

export type Maybe<T> = T | null;

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
	images: Image[];
	media: {
		nodes: MediaImage[];
	};
	variants: {
		nodes: ProductVariant[];
		edges: {
			node: ProductVariant;
		}[];
	};
};

export type MediaImage = Media &
	Node & {
		__typename?: 'MediaImage';
		/** A word or phrase to share the nature or contents of a media. */
		alt?: Maybe<Scalars['String']>;
		/** A globally-unique identifier. */
		id: Scalars['ID'];
		/** The image for the media. */
		image?: Maybe<Image>;
		/** The media content type. */
		mediaContentType: MediaContentType;
		/** The presentation for a media. */
		presentation?: Maybe<MediaPresentation>;
		/** The preview image for the media. */
		previewImage?: Maybe<Image>;
	};

export type ProductVariant = {
	id: string;
	title: string;
	availableForSale: boolean;
	selectedOptions: {
		name: string;
		value: string;
	}[];
	price: Money;
	image: Image;
	compareAtPrice: Money;
	sku: string | null;
};

export type ShopifyProduct = {
	id: string;
	handle: string;
	availableForSale: boolean;
	title: string;
	description: string;
	descriptionHtml: string;
	options: ProductOption[];
	priceRange: {
		maxVariantPrice: Money;
		minVariantPrice: Money;
	};
	variants: Connection<ProductVariant>;
	featuredImage: Image;
	images: Connection<Image>;
	seo: SEO;
	tags: string[];
	updatedAt: string;
	vendor: string;
	productType: string;
	publishedAt: string;
};

export type ProductOption = {
	id: string;
	name: string;
	values: string[];
};

export type Money = {
	amount: string;
	currencyCode: string;
};

export type Image = {
	url: string;
	altText: string;
	width: number;
	height: number;
};

export type Connection<T> = {
	edges: Array<Edge<T>>;
};

export type Edge<T> = {
	node: T;
};

export type SEO = {
	title: string;
	description: string;
};

export type ShopifyAnalyticsProduct = {
	/** Product id in the form of `gid://shopify/Product/<id>`. */
	productGid: Product['id'];
	/** Variant id in the form of `gid://shopify/ProductVariant/<id>`. */
	variantGid?: ProductVariant['id'];
	/** Product name. */
	name: Product['title'];
	/** Variant name. */
	variantName?: ProductVariant['title'];
	/** Product brand or vendor. */
	brand: Product['vendor'];
	/** Product category or type. */
	category?: Product['productType'];
	/** Product price. */
	price: ProductVariant['price']['amount'];
	/** Product sku. */
	sku?: ProductVariant['sku'];
	/** Quantity of the product in this event. */
	quantity?: number;
};

export type ProductVariantConnection = {
	__typename?: 'ProductVariantConnection';
	/** A list of edges. */
	edges: Array<ProductVariantEdge>;
	/** A list of the nodes contained in ProductVariantEdge. */
	nodes: Array<ProductVariant>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one ProductVariant and a cursor during pagination.
 *
 */
export type ProductVariantEdge = {
	__typename?: 'ProductVariantEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of ProductVariantEdge. */
	node: ProductVariant;
};

export type PageInfo = {
	__typename?: 'PageInfo';
	/** The cursor corresponding to the last node in edges. */
	endCursor?: string | null;
	/** Whether there are more pages to fetch following the current page. */
	hasNextPage: boolean | null;
	/** Whether there are any pages prior to the current page. */
	hasPreviousPage: boolean | null;
	/** The cursor corresponding to the first node in edges. */
	startCursor?: string | null;
};

export type Collection = HasMetafields &
	Node &
	OnlineStorePublishable & {
		__typename?: 'Collection';
		/** Stripped description of the collection, single line with HTML tags removed. */
		description: string;
		/** The description of the collection, complete with HTML formatting. */
		descriptionHtml: string;
		/**
		 * A human-friendly unique string for the collection automatically generated from its title.
		 * Limit of 255 characters.
		 *
		 */
		handle: string;
		/** A globally-unique identifier. */
		id: string;
		/** Image associated with the collection. */
		image?: Maybe<Image>;
		/** Returns a metafield found by namespace and key. */
		metafield?: Maybe<Metafield>;
		/**
		 * The metafields associated with the resource matching the supplied list of namespaces and keys.
		 *
		 */
		metafields: Array<Maybe<Metafield>>;
		/** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
		onlineStoreUrl?: Maybe<string>;
		/** List of products in the collection. */
		products: ProductConnection;
		/** The collection's SEO information. */
		seo: Seo;
		/** The collection’s name. Limit of 255 characters. */
		title: string;
		/** The date and time when the collection was last modified. */
		updatedAt: string;
	};

export type ProductConnection = {
	__typename?: 'ProductConnection';
	/** A list of edges. */
	edges: Array<ProductEdge>;
	/** A list of available filters. */
	filters: Array<Filter>;
	/** A list of the nodes contained in ProductEdge. */
	nodes: Array<Product>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type ProductEdge = {
	__typename?: 'ProductEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of ProductEdge. */
	node: Product;
};

export type Filter = {
	__typename?: 'Filter';
	/** A unique identifier. */
	id: string;
	/** A human-friendly string for this filter. */
	label: string;
	/** An enumeration that denotes the type of data this filter represents. */
	type: FilterType;
	/** The list of values for this filter. */
	values: Array<FilterValue>;
};

export type FilterType =
	/** A boolean value. */
	| 'BOOLEAN'
	/** A list of selectable values. */
	| 'LIST'
	/** A range of prices. */
	| 'PRICE_RANGE';

export type FilterValue = {
	__typename?: 'FilterValue';
	/** The number of results that match this filter value. */
	count: number;
	/** A unique identifier. */
	id: string;
	/**
	 * An input object that can be used to filter by this value on the parent field.
	 *
	 * The value is provided as a helper for building dynamic filtering UI. For example, if you have a list of selected `FilterValue` objects, you can combine their respective `input` values to use in a subsequent query.
	 *
	 */
	input: unknown;
	/** A human-friendly string for this filter value. */
	label: string;
};

export type HasMetafields = {
	/** Returns a metafield found by namespace and key. */
	metafield?: Maybe<Metafield>;
	/**
	 * The metafields associated with the resource matching the supplied list of namespaces and keys.
	 *
	 */
	metafields: Array<Maybe<Metafield>>;
};

export type Metafield = Node & {
	__typename?: 'Metafield';
	/** The date and time when the storefront metafield was created. */
	createdAt: string;
	/** The description of a metafield. */
	description?: Maybe<string>;
	/** A globally-unique identifier. */
	id: string;
	/** The key name for a metafield. */
	key: string;
	/** The namespace for a metafield. */
	namespace: string;
	/** The parent object that the metafield belongs to. */
	parentResource: MetafieldParentResource;
	/** Returns a reference object if the metafield definition's type is a resource reference. */
	reference?: Maybe<MetafieldReference>;
	/** A list of reference objects if the metafield's type is a resource reference list. */
	references?: Maybe<MetafieldReferenceConnection>;
	/**
	 * The type name of the metafield.
	 * See the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
	 *
	 */
	type: string;
	/** The date and time when the storefront metafield was updated. */
	updatedAt: string;
	/** The value of a metafield. */
	value: string;
};

export type Node = {
	/** A globally-unique identifier. */
	id: string;
};

export type MetafieldParentResource =
	| Article
	| Blog
	// | Cart
	| Collection
	// | Customer
	| Location
	// | Market
	// | Order
	// | Page
	| Product
	| ProductVariant;
// | Shop;

export type MetafieldReference =
	| Collection
	// | GenericFile
	| MediaImage
	// | Metaobject
	// | Page
	| Product
	| ProductVariant;
// | Video;

export type MetafieldReferenceConnection = {
	__typename?: 'MetafieldReferenceConnection';
	/** A list of edges. */
	edges: Array<MetafieldReferenceEdge>;
	/** A list of the nodes contained in MetafieldReferenceEdge. */
	nodes: Array<MetafieldReference>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type MetafieldReferenceEdge = {
	__typename?: 'MetafieldReferenceEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of MetafieldReferenceEdge. */
	node: MetafieldReference;
};

export type Article = HasMetafields &
	Node &
	OnlineStorePublishable & {
		__typename?: 'Article';
		/**
		 * The article's author.
		 * @deprecated Use `authorV2` instead.
		 */
		author: ArticleAuthor;
		/** The article's author. */
		authorV2?: Maybe<ArticleAuthor>;
		/** The blog that the article belongs to. */
		blog: Blog;
		/** List of comments posted on the article. */
		comments: CommentConnection;
		/** Stripped content of the article, single line with HTML tags removed. */
		content: string;
		/** The content of the article, complete with HTML formatting. */
		contentHtml: string;
		/** Stripped excerpt of the article, single line with HTML tags removed. */
		excerpt?: Maybe<string>;
		/** The excerpt of the article, complete with HTML formatting. */
		excerptHtml?: Maybe<string>;
		/**
		 * A human-friendly unique string for the Article automatically generated from its title.
		 *
		 */
		handle: string;
		/** A globally-unique identifier. */
		id: string;
		/** The image associated with the article. */
		image?: Maybe<Image>;
		/** Returns a metafield found by namespace and key. */
		metafield?: Maybe<Metafield>;
		/**
		 * The metafields associated with the resource matching the supplied list of namespaces and keys.
		 *
		 */
		metafields: Array<Maybe<Metafield>>;
		/** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
		onlineStoreUrl?: Maybe<string>;
		/** The date and time when the article was published. */
		publishedAt: string;
		/** The article’s SEO information. */
		seo?: Maybe<Seo>;
		/** A categorization that a article can be tagged with. */
		tags: Array<string>;
		/** The article’s name. */
		title: string;
	};

export type OnlineStorePublishable = {
	/** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
	onlineStoreUrl?: Maybe<string>;
};

export type ArticleAuthor = {
	__typename?: 'ArticleAuthor';
	/** The author's bio. */
	bio?: Maybe<string>;
	/** The author’s email. */
	email: string;
	/** The author's first name. */
	firstName: string;
	/** The author's last name. */
	lastName: string;
	/** The author's full name. */
	name: string;
};

export type Blog = HasMetafields &
	Node &
	OnlineStorePublishable & {
		__typename?: 'Blog';
		/** Find an article by its handle. */
		articleByHandle?: Maybe<Article>;
		/** List of the blog's articles. */
		articles: ArticleConnection;
		/** The authors who have contributed to the blog. */
		authors: Array<ArticleAuthor>;
		/**
		 * A human-friendly unique string for the Blog automatically generated from its title.
		 *
		 */
		handle: string;
		/** A globally-unique identifier. */
		id: string;
		/** Returns a metafield found by namespace and key. */
		metafield?: Maybe<Metafield>;
		/**
		 * The metafields associated with the resource matching the supplied list of namespaces and keys.
		 *
		 */
		metafields: Array<Maybe<Metafield>>;
		/** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
		onlineStoreUrl?: Maybe<string>;
		/** The blog's SEO information. */
		seo?: Maybe<Seo>;
		/** The blogs’s title. */
		title: string;
	};

export type ArticleConnection = {
	__typename?: 'ArticleConnection';
	/** A list of edges. */
	edges: Array<ArticleEdge>;
	/** A list of the nodes contained in ArticleEdge. */
	nodes: Array<Article>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type ArticleEdge = {
	__typename?: 'ArticleEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of ArticleEdge. */
	node: Article;
};

export type CommentConnection = {
	__typename?: 'CommentConnection';
	/** A list of edges. */
	edges: Array<CommentEdge>;
	/** A list of the nodes contained in CommentEdge. */
	nodes: Array<Comment>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type CommentEdge = {
	__typename?: 'CommentEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of CommentEdge. */
	node: Comment;
};

export type Seo = {
	__typename?: 'SEO';
	/** The meta description. */
	description?: Maybe<string>;
	/** The SEO title. */
	title?: Maybe<string>;
};

export type Media = {
	/** A word or phrase to share the nature or contents of a media. */
	alt?: Maybe<string>;
	/** The media content type. */
	mediaContentType: MediaContentType;
	/** The presentation for a media. */
	presentation?: Maybe<MediaPresentation>;
	/** The preview image for the media. */
	previewImage?: Maybe<Image>;
};

export type MediaContentType =
	/** An externally hosted video. */
	| 'EXTERNAL_VIDEO'
	/** A Shopify hosted image. */
	| 'IMAGE'
	/** A 3d model. */
	| 'MODEL_3D'
	/** A Shopify hosted video. */
	| 'VIDEO';

export type MediaPresentation = Node & {
	__typename?: 'MediaPresentation';
	/** A JSON object representing a presentation view. */
	asJson?: Maybe<unknown>;
	/** A globally-unique identifier. */
	id: string;
};

export type Video = Media &
	Node & {
		__typename?: 'Video';
		/** A word or phrase to share the nature or contents of a media. */
		alt?: Maybe<string>;
		/** A globally-unique identifier. */
		id: string;
		/** The media content type. */
		mediaContentType: MediaContentType;
		/** The presentation for a media. */
		presentation?: Maybe<MediaPresentation>;
		/** The preview image for the media. */
		previewImage?: Maybe<Image>;
		/** The sources for a video. */
		sources: Array<VideoSource>;
	};

export type VideoSource = {
	__typename?: 'VideoSource';
	/** The format of the video source. */
	format: string;
	/** The height of the video. */
	height: number;
	/** The video MIME type. */
	mimeType: string;
	/** The URL of the video. */
	url: string;
	/** The width of the video. */
	width: number;
};

export type CollectionConnection = {
	__typename?: 'CollectionConnection';
	/** A list of edges. */
	edges: Array<CollectionEdge>;
	/** A list of the nodes contained in CollectionEdge. */
	nodes: Array<Collection>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type CollectionEdge = {
	__typename?: 'CollectionEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of CollectionEdge. */
	node: Collection;
};

export type ShopifyHomePageSeoOperation = {
	data: {
		shop: HomeSeoData;
		hero: CollectionHero;
	};
	variables: {
		handle: string;
		country?: string;
		language?: string;
	};
};

export interface HomeSeoData {
	shop: {
		name: string;
		description: string;
	};
}

export type ShopifyFeaturedProductOperation = {
	data: {
		products: ProductConnection;
	};
	variables: {
		country?: string;
		language?: string;
	};
};

export type ShopifyFeaturedCollectionOperation = {
	data: {
		collections: CollectionConnection;
	};
	variables: {
		country?: string;
		language?: string;
	};
};

export type ShopifyHeroOperation = {
	data: {
		hero: CollectionHero;
	};
	variables: {
		handle: string;
		country?: string;
		language?: string;
	};
};

export type ShopifyCartOperation = {
	data: {
		cart: ShopifyCart;
	};
	variables: {
		cartId: string;
	};
};

export type ShopifyCreateCartOperation = {
	data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
	data: {
		cartLinesAdd: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lines: {
			merchandiseId: string;
			quantity: number;
		}[];
	};
};

export type ShopifyRemoveFromCartOperation = {
	data: {
		cartLinesRemove: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lineIds: string[];
	};
};

export type ShopifyUpdateCartOperation = {
	data: {
		cartLinesUpdate: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lines: {
			id: string;
			merchandiseId: string;
			quantity: number;
		}[];
	};
};

export type ShopifyCart = {
	id: string;
	checkoutUrl: string;
	cost: {
		subtotalAmount: Money;
		totalAmount: Money;
		totalTaxAmount: Money;
	};
	lines: Connection<CartItem>;
	totalQuantity: number;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
	lines: CartLine[];
};

export type CartItem = {
	id: string;
	quantity: number;
	cost: {
		totalAmount: Money;
	};
	merchandise: {
		id: string;
		title: string;
		selectedOptions: {
			name: string;
			value: string;
		}[];
		product: Product;
	};
};

export type ShopifyCollectionProducts = {
	data: {
		collections: CollectionConnection;
		collection: Collection;
	};
	variables: {
		handle: string;
		pageBy: number;
		cursor: string | null;
		filters: FiltersQueryParams;
		sortKey: string;
		reverse?: boolean;
	};
};
export type InputMaybe<T> = Maybe<T>;

export type AttributeInput = {
	/** Key or name of the attribute. */
	key: string;
	/** Value of the attribute. */
	value: string;
};

export type CartLineInput = {
	/** An array of key-value pairs that contains additional information about the merchandise line. */
	attributes?: InputMaybe<Array<AttributeInput>>;
	/** The identifier of the merchandise that the buyer intends to purchase. */
	merchandiseId: string;
	/** The quantity of the merchandise. */
	quantity?: InputMaybe<number>;
	/** The identifier of the selling plan that the merchandise is being purchased with. */
	sellingPlanId?: InputMaybe<string>;
};

export type MoneyV2 = {
	__typename?: 'MoneyV2';
	/** Decimal money amount. */
	amount: Scalars['Decimal'];
	/** Currency of the money. */
	currencyCode: CurrencyCode;
};

/** Return type for `customerCreate` mutation. */
export type CustomerCreatePayload = {
	__typename?: 'CustomerCreatePayload';
	/** The created customer object. */
	customer?: Maybe<Customer>;
	/** The list of errors that occurred from executing the mutation. */
	customerUserErrors: Array<CustomerUserError>;
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
	userErrors: Array<UserError>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Color: string;
	DateTime: string;
	Decimal: string;
	HTML: string;
	JSON: unknown;
	URL: string;
	UnsignedInt64: string;
};

/** Represents an error that happens during execution of a customer mutation. */
export type CustomerUserError = DisplayableError & {
	__typename?: 'CustomerUserError';
	/** The error code. */
	code?: Maybe<CustomerErrorCode>;
	/** The path to the input field that caused the error. */
	field?: Maybe<Array<Scalars['String']>>;
	/** The error message. */
	message: Scalars['String'];
};

/** Represents an error in the input of a mutation. */
export type UserError = DisplayableError & {
	__typename?: 'UserError';
	/** The path to the input field that caused the error. */
	field?: Maybe<Array<Scalars['String']>>;
	/** The error message. */
	message: Scalars['String'];
};

/** A filter used to view a subset of products in a collection matching a specific variant option. */
export type VariantOptionFilter = {
	/** The name of the variant option to filter on. */
	name: Scalars['String'];
	/** The value of the variant option to filter on. */
	value: Scalars['String'];
};

/** A single line item in the checkout, grouped by variant and attributes. */
export type CheckoutLineItem = Node & {
	__typename?: 'CheckoutLineItem';
	/** Extra information in the form of an array of Key-Value pairs about the line item. */
	customAttributes: Array<Attribute>;
	/** The discounts that have been allocated onto the checkout line item by discount applications. */
	discountAllocations: Array<DiscountAllocation>;
	/** A globally-unique identifier. */
	id: Scalars['ID'];
	/** The quantity of the line item. */
	quantity: Scalars['Int'];
	/** Title of the line item. Defaults to the product's title. */
	title: Scalars['String'];
	/** Unit price of the line item. */
	unitPrice?: Maybe<MoneyV2>;
	/** Product variant of the line item. */
	variant?: Maybe<ProductVariant>;
};

/**
 * An auto-generated type for paginating through multiple CheckoutLineItems.
 *
 */
export type CheckoutLineItemConnection = {
	__typename?: 'CheckoutLineItemConnection';
	/** A list of edges. */
	edges: Array<CheckoutLineItemEdge>;
	/** A list of the nodes contained in CheckoutLineItemEdge. */
	nodes: Array<CheckoutLineItem>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one CheckoutLineItem and a cursor during pagination.
 *
 */
export type CheckoutLineItemEdge = {
	__typename?: 'CheckoutLineItemEdge';
	/** A cursor for use in pagination. */
	cursor: Scalars['String'];
	/** The item at the end of CheckoutLineItemEdge. */
	node: CheckoutLineItem;
};

/** The value of the percentage pricing object. */
export type PricingPercentageValue = {
	__typename?: 'PricingPercentageValue';
	/** The percentage value of the object. */
	percentage: Scalars['Float'];
};

/** The price value (fixed or percentage) for a discount application. */
export type PricingValue = MoneyV2 | PricingPercentageValue;

/**
 * Automatic discount applications capture the intentions of a discount that was automatically applied.
 *
 */
export type AutomaticDiscountApplication = DiscountApplication & {
	__typename?: 'AutomaticDiscountApplication';
	/** The method by which the discount's value is allocated to its entitled items. */
	allocationMethod: DiscountApplicationAllocationMethod;
	/** Which lines of targetType that the discount is allocated over. */
	targetSelection: DiscountApplicationTargetSelection;
	/** The type of line that the discount is applicable towards. */
	targetType: DiscountApplicationTargetType;
	/** The title of the application. */
	title: Scalars['String'];
	/** The value of the discount application. */
	value: PricingValue;
};

/**
 * Manual discount applications capture the intentions of a discount that was manually created.
 *
 */
export type ManualDiscountApplication = DiscountApplication & {
	__typename?: 'ManualDiscountApplication';
	/** The method by which the discount's value is allocated to its entitled items. */
	allocationMethod: DiscountApplicationAllocationMethod;
	/** The description of the application. */
	description?: Maybe<Scalars['String']>;
	/** Which lines of targetType that the discount is allocated over. */
	targetSelection: DiscountApplicationTargetSelection;
	/** The type of line that the discount is applicable towards. */
	targetType: DiscountApplicationTargetType;
	/** The title of the application. */
	title: Scalars['String'];
	/** The value of the discount application. */
	value: PricingValue;
};

/**
 * Script discount applications capture the intentions of a discount that
 * was created by a Shopify Script.
 *
 */
export type ScriptDiscountApplication = DiscountApplication & {
	__typename?: 'ScriptDiscountApplication';
	/** The method by which the discount's value is allocated to its entitled items. */
	allocationMethod: DiscountApplicationAllocationMethod;
	/** Which lines of targetType that the discount is allocated over. */
	targetSelection: DiscountApplicationTargetSelection;
	/** The type of line that the discount is applicable towards. */
	targetType: DiscountApplicationTargetType;
	/** The title of the application as defined by the Script. */
	title: Scalars['String'];
	/** The value of the discount application. */
	value: PricingValue;
};

/**
 * An amount discounting the line that has been allocated by a discount.
 *
 */
export type DiscountAllocation = {
	__typename?: 'DiscountAllocation';
	/** Amount of discount allocated. */
	allocatedAmount: MoneyV2;
	/** The discount this allocated amount originated from. */
	discountApplication:
		| AutomaticDiscountApplication
		| DiscountCodeApplication
		| ManualDiscountApplication
		| ScriptDiscountApplication;
};

/**
 * Discount applications capture the intentions of a discount source at
 * the time of application.
 *
 */
export type DiscountApplication = {
	/** The method by which the discount's value is allocated to its entitled items. */
	allocationMethod: DiscountApplicationAllocationMethod;
	/** Which lines of targetType that the discount is allocated over. */
	targetSelection: DiscountApplicationTargetSelection;
	/** The type of line that the discount is applicable towards. */
	targetType: DiscountApplicationTargetType;
	/** The value of the discount application. */
	value: PricingValue;
};

/** The method by which the discount's value is allocated onto its entitled lines. */
export type DiscountApplicationAllocationMethod =
	/** The value is spread across all entitled lines. */
	| 'ACROSS'
	/** The value is applied onto every entitled line. */
	| 'EACH'
	/** The value is specifically applied onto a particular line. */
	| 'ONE';

/**
 * An auto-generated type which holds one DiscountApplication and a cursor during pagination.
 *
 */
export type DiscountApplicationEdge = {
	__typename?: 'DiscountApplicationEdge';
	/** A cursor for use in pagination. */
	cursor: Scalars['String'];
	/** The item at the end of DiscountApplicationEdge. */
	node:
		| AutomaticDiscountApplication
		| DiscountCodeApplication
		| ManualDiscountApplication
		| ScriptDiscountApplication;
};

/**
 * The lines on the order to which the discount is applied, of the type defined by
 * the discount application's `targetType`. For example, the value `ENTITLED`, combined with a `targetType` of
 * `LINE_ITEM`, applies the discount on all line items that are entitled to the discount.
 * The value `ALL`, combined with a `targetType` of `SHIPPING_LINE`, applies the discount on all shipping lines.
 *
 */
export type DiscountApplicationTargetSelection =
	/** The discount is allocated onto all the lines. */
	| 'ALL'
	/** The discount is allocated onto only the lines that it's entitled for. */
	| 'ENTITLED'
	/** The discount is allocated onto explicitly chosen lines. */
	| 'EXPLICIT';

/**
 * The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.
 *
 */
export type DiscountApplicationTargetType =
	/** The discount applies onto line items. */
	| 'LINE_ITEM'
	/** The discount applies onto shipping lines. */
	| 'SHIPPING_LINE';

/**
 * Discount code applications capture the intentions of a discount code at
 * the time that it is applied.
 *
 */
export type DiscountCodeApplication = DiscountApplication & {
	__typename?: 'DiscountCodeApplication';
	/** The method by which the discount's value is allocated to its entitled items. */
	allocationMethod: DiscountApplicationAllocationMethod;
	/** Specifies whether the discount code was applied successfully. */
	applicable: Scalars['Boolean'];
	/** The string identifying the discount code that was used at the time of application. */
	code: Scalars['String'];
	/** Which lines of targetType that the discount is allocated over. */
	targetSelection: DiscountApplicationTargetSelection;
	/** The type of line that the discount is applicable towards. */
	targetType: DiscountApplicationTargetType;
	/** The value of the discount application. */
	value: PricingValue;
};

/** Represents the reason for the order's cancellation. */
export type OrderCancelReason =
	/** The customer wanted to cancel the order. */
	| 'CUSTOMER'
	/** Payment was declined. */
	| 'DECLINED'
	/** The order was fraudulent. */
	| 'FRAUD'
	/** There was insufficient inventory. */
	| 'INVENTORY'
	/** The order was canceled for an unlisted reason. */
	| 'OTHER';

/** Represents the order's current financial status. */
export type OrderFinancialStatus =
	/** Displayed as **Authorized**. */
	| 'AUTHORIZED'
	/** Displayed as **Paid**. */
	| 'PAID'
	/** Displayed as **Partially paid**. */
	| 'PARTIALLY_PAID'
	/** Displayed as **Partially refunded**. */
	| 'PARTIALLY_REFUNDED'
	/** Displayed as **Pending**. */
	| 'PENDING'
	/** Displayed as **Refunded**. */
	| 'REFUNDED'
	/** Displayed as **Voided**. */
	| 'VOIDED';

/** Represents the order's aggregated fulfillment status for display purposes. */
export type OrderFulfillmentStatus =
	/** Displayed as **Fulfilled**. All of the items in the order have been fulfilled. */
	| 'FULFILLED'
	/** Displayed as **In progress**. Some of the items in the order have been fulfilled, or a request for fulfillment has been sent to the fulfillment service. */
	| 'IN_PROGRESS'
	/** Displayed as **On hold**. All of the unfulfilled items in this order are on hold. */
	| 'ON_HOLD'
	/** Displayed as **Open**. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status. */
	| 'OPEN'
	/** Displayed as **Partially fulfilled**. Some of the items in the order have been fulfilled. */
	| 'PARTIALLY_FULFILLED'
	/** Displayed as **Pending fulfillment**. A request for fulfillment of some items awaits a response from the fulfillment service. Replaced by "IN_PROGRESS" status. */
	| 'PENDING_FULFILLMENT'
	/** Displayed as **Restocked**. All of the items in the order have been restocked. Replaced by "UNFULFILLED" status. */
	| 'RESTOCKED'
	/** Displayed as **Scheduled**. All of the unfulfilled items in this order are scheduled for fulfillment at later time. */
	| 'SCHEDULED'
	/** Displayed as **Unfulfilled**. None of the items in the order have been fulfilled. */
	| 'UNFULFILLED';

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type Order = HasMetafields &
	Node & {
		__typename?: 'Order';
		/** The address associated with the payment method. */
		billingAddress?: Maybe<MailingAddress>;
		/** The reason for the order's cancellation. Returns `null` if the order wasn't canceled. */
		cancelReason?: Maybe<OrderCancelReason>;
		/** The date and time when the order was canceled. Returns null if the order wasn't canceled. */
		canceledAt?: Maybe<Scalars['DateTime']>;
		/** The code of the currency used for the payment. */
		currencyCode: CurrencyCode;
		/** The subtotal of line items and their discounts, excluding line items that have been removed. Does not contain order-level discounts, duties, shipping costs, or shipping discounts. Taxes are not included unless the order is a taxes-included order. */
		currentSubtotalPrice: MoneyV2;
		/** The total cost of duties for the order, including refunds. */
		currentTotalDuties?: Maybe<MoneyV2>;
		/** The total amount of the order, including duties, taxes and discounts, minus amounts for line items that have been removed. */
		currentTotalPrice: MoneyV2;
		/** The total of all taxes applied to the order, excluding taxes for returned line items. */
		currentTotalTax: MoneyV2;
		/** A list of the custom attributes added to the order. */
		customAttributes: Array<Attribute>;
		/** The locale code in which this specific order happened. */
		customerLocale?: Maybe<Scalars['String']>;
		/** The unique URL that the customer can use to access the order. */
		customerUrl?: Maybe<Scalars['URL']>;
		/** Discounts that have been applied on the order. */
		discountApplications: DiscountApplicationConnection;
		/** Whether the order has had any edits applied or not. */
		edited: Scalars['Boolean'];
		/** The customer's email address. */
		email?: Maybe<Scalars['String']>;
		/** The financial status of the order. */
		financialStatus?: Maybe<OrderFinancialStatus>;
		/** The fulfillment status for the order. */
		fulfillmentStatus: OrderFulfillmentStatus;
		/** A globally-unique identifier. */
		id: Scalars['ID'];
		/** List of the order’s line items. */
		lineItems: OrderLineItemConnection;
		/** Returns a metafield found by namespace and key. */
		metafield?: Maybe<Metafield>;
		/**
		 * The metafields associated with the resource matching the supplied list of namespaces and keys.
		 *
		 */
		metafields: Array<Maybe<Metafield>>;
		/**
		 * Unique identifier for the order that appears on the order.
		 * For example, _#1000_ or _Store1001.
		 *
		 */
		name: Scalars['String'];
		/** A unique numeric identifier for the order for use by shop owner and customer. */
		orderNumber: Scalars['Int'];
		/** The total cost of duties charged at checkout. */
		originalTotalDuties?: Maybe<MoneyV2>;
		/** The total price of the order before any applied edits. */
		originalTotalPrice: MoneyV2;
		/** The customer's phone number for receiving SMS notifications. */
		phone?: Maybe<Scalars['String']>;
		/**
		 * The date and time when the order was imported.
		 * This value can be set to dates in the past when importing from other systems.
		 * If no value is provided, it will be auto-generated based on current date and time.
		 *
		 */
		processedAt: Scalars['DateTime'];
		/** The address to where the order will be shipped. */
		shippingAddress?: Maybe<MailingAddress>;
		/**
		 * The discounts that have been allocated onto the shipping line by discount applications.
		 *
		 */
		shippingDiscountAllocations: Array<DiscountAllocation>;
		/** The unique URL for the order's status page. */
		statusUrl: Scalars['URL'];
		/** Price of the order before shipping and taxes. */
		subtotalPrice?: Maybe<MoneyV2>;
		/**
		 * Price of the order before duties, shipping and taxes.
		 * @deprecated Use `subtotalPrice` instead.
		 */
		subtotalPriceV2?: Maybe<MoneyV2>;
		/** List of the order’s successful fulfillments. */
		successfulFulfillments?: Maybe<Array<Fulfillment>>;
		/** The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive). */
		totalPrice: MoneyV2;
		/**
		 * The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive).
		 * @deprecated Use `totalPrice` instead.
		 */
		totalPriceV2: MoneyV2;
		/** The total amount that has been refunded. */
		totalRefunded: MoneyV2;
		/**
		 * The total amount that has been refunded.
		 * @deprecated Use `totalRefunded` instead.
		 */
		totalRefundedV2: MoneyV2;
		/** The total cost of shipping. */
		totalShippingPrice: MoneyV2;
		/**
		 * The total cost of shipping.
		 * @deprecated Use `totalShippingPrice` instead.
		 */
		totalShippingPriceV2: MoneyV2;
		/** The total cost of taxes. */
		totalTax?: Maybe<MoneyV2>;
		/**
		 * The total cost of taxes.
		 * @deprecated Use `totalTax` instead.
		 */
		totalTaxV2?: Maybe<MoneyV2>;
	};

/** Represents an error in the input of a mutation. */
export type DisplayableError = {
	/** The path to the input field that caused the error. */
	field?: Maybe<Array<Scalars['String']>>;
	/** The error message. */
	message: Scalars['String'];
};

/** Represents a web address. */
export type Domain = {
	__typename?: 'Domain';
	/** The host name of the domain (eg: `example.com`). */
	host: Scalars['String'];
	/** Whether SSL is enabled or not. */
	sslEnabled: Scalars['Boolean'];
	/** The URL of the domain (eg: `https://example.com`). */
	url: Scalars['URL'];
};

/** Possible error codes that can be returned by `CustomerUserError`. */
export type CustomerErrorCode =
	/** Customer already enabled. */
	| 'ALREADY_ENABLED'
	/** Input email contains an invalid domain name. */
	| 'BAD_DOMAIN'
	/** The input value is blank. */
	| 'BLANK'
	/** Input contains HTML tags. */
	| 'CONTAINS_HTML_TAGS'
	/** Input contains URL. */
	| 'CONTAINS_URL'
	/** Customer is disabled. */
	| 'CUSTOMER_DISABLED'
	/** The input value is invalid. */
	| 'INVALID'
	/** Multipass token is not valid. */
	| 'INVALID_MULTIPASS_REQUEST'
	/** Address does not exist. */
	| 'NOT_FOUND'
	/** Input password starts or ends with whitespace. */
	| 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE'
	/** The input value is already taken. */
	| 'TAKEN'
	/** Invalid activation token. */
	| 'TOKEN_INVALID'
	/** The input value is too long. */
	| 'TOO_LONG'
	/** The input value is too short. */
	| 'TOO_SHORT'
	/** Unidentified customer. */
	| 'UNIDENTIFIED_CUSTOMER';

export type CountryCode =
	/** Ascension Island. */
	| 'AC'
	/** Andorra. */
	| 'AD'
	/** United Arab Emirates. */
	| 'AE'
	/** Afghanistan. */
	| 'AF'
	/** Antigua & Barbuda. */
	| 'AG'
	/** Anguilla. */
	| 'AI'
	/** Albania. */
	| 'AL'
	/** Armenia. */
	| 'AM'
	/** Netherlands Antilles. */
	| 'AN'
	/** Angola. */
	| 'AO'
	/** Argentina. */
	| 'AR'
	/** Austria. */
	| 'AT'
	/** Australia. */
	| 'AU'
	/** Aruba. */
	| 'AW'
	/** Åland Islands. */
	| 'AX'
	/** Azerbaijan. */
	| 'AZ'
	/** Bosnia & Herzegovina. */
	| 'BA'
	/** Barbados. */
	| 'BB'
	/** Bangladesh. */
	| 'BD'
	/** Belgium. */
	| 'BE'
	/** Burkina Faso. */
	| 'BF'
	/** Bulgaria. */
	| 'BG'
	/** Bahrain. */
	| 'BH'
	/** Burundi. */
	| 'BI'
	/** Benin. */
	| 'BJ'
	/** St. Barthélemy. */
	| 'BL'
	/** Bermuda. */
	| 'BM'
	/** Brunei. */
	| 'BN'
	/** Bolivia. */
	| 'BO'
	/** Caribbean Netherlands. */
	| 'BQ'
	/** Brazil. */
	| 'BR'
	/** Bahamas. */
	| 'BS'
	/** Bhutan. */
	| 'BT'
	/** Bouvet Island. */
	| 'BV'
	/** Botswana. */
	| 'BW'
	/** Belarus. */
	| 'BY'
	/** Belize. */
	| 'BZ'
	/** Canada. */
	| 'CA'
	/** Cocos (Keeling) Islands. */
	| 'CC'
	/** Congo - Kinshasa. */
	| 'CD'
	/** Central African Republic. */
	| 'CF'
	/** Congo - Brazzaville. */
	| 'CG'
	/** Switzerland. */
	| 'CH'
	/** Côte d’Ivoire. */
	| 'CI'
	/** Cook Islands. */
	| 'CK'
	/** Chile. */
	| 'CL'
	/** Cameroon. */
	| 'CM'
	/** China. */
	| 'CN'
	/** Colombia. */
	| 'CO'
	/** Costa Rica. */
	| 'CR'
	/** Cuba. */
	| 'CU'
	/** Cape Verde. */
	| 'CV'
	/** Curaçao. */
	| 'CW'
	/** Christmas Island. */
	| 'CX'
	/** Cyprus. */
	| 'CY'
	/** Czechia. */
	| 'CZ'
	/** Germany. */
	| 'DE'
	/** Djibouti. */
	| 'DJ'
	/** Denmark. */
	| 'DK'
	/** Dominica. */
	| 'DM'
	/** Dominican Republic. */
	| 'DO'
	/** Algeria. */
	| 'DZ'
	/** Ecuador. */
	| 'EC'
	/** Estonia. */
	| 'EE'
	/** Egypt. */
	| 'EG'
	/** Western Sahara. */
	| 'EH'
	/** Eritrea. */
	| 'ER'
	/** Spain. */
	| 'ES'
	/** Ethiopia. */
	| 'ET'
	/** Finland. */
	| 'FI'
	/** Fiji. */
	| 'FJ'
	/** Falkland Islands. */
	| 'FK'
	/** Faroe Islands. */
	| 'FO'
	/** France. */
	| 'FR'
	/** Gabon. */
	| 'GA'
	/** United Kingdom. */
	| 'GB'
	/** Grenada. */
	| 'GD'
	/** Georgia. */
	| 'GE'
	/** French Guiana. */
	| 'GF'
	/** Guernsey. */
	| 'GG'
	/** Ghana. */
	| 'GH'
	/** Gibraltar. */
	| 'GI'
	/** Greenland. */
	| 'GL'
	/** Gambia. */
	| 'GM'
	/** Guinea. */
	| 'GN'
	/** Guadeloupe. */
	| 'GP'
	/** Equatorial Guinea. */
	| 'GQ'
	/** Greece. */
	| 'GR'
	/** South Georgia & South Sandwich Islands. */
	| 'GS'
	/** Guatemala. */
	| 'GT'
	/** Guinea-Bissau. */
	| 'GW'
	/** Guyana. */
	| 'GY'
	/** Hong Kong SAR. */
	| 'HK'
	/** Heard & McDonald Islands. */
	| 'HM'
	/** Honduras. */
	| 'HN'
	/** Croatia. */
	| 'HR'
	/** Haiti. */
	| 'HT'
	/** Hungary. */
	| 'HU'
	/** Indonesia. */
	| 'ID'
	/** Ireland. */
	| 'IE'
	/** Israel. */
	| 'IL'
	/** Isle of Man. */
	| 'IM'
	/** India. */
	| 'IN'
	/** British Indian Ocean Territory. */
	| 'IO'
	/** Iraq. */
	| 'IQ'
	/** Iran. */
	| 'IR'
	/** Iceland. */
	| 'IS'
	/** Italy. */
	| 'IT'
	/** Jersey. */
	| 'JE'
	/** Jamaica. */
	| 'JM'
	/** Jordan. */
	| 'JO'
	/** Japan. */
	| 'JP'
	/** Kenya. */
	| 'KE'
	/** Kyrgyzstan. */
	| 'KG'
	/** Cambodia. */
	| 'KH'
	/** Kiribati. */
	| 'KI'
	/** Comoros. */
	| 'KM'
	/** St. Kitts & Nevis. */
	| 'KN'
	/** North Korea. */
	| 'KP'
	/** South Korea. */
	| 'KR'
	/** Kuwait. */
	| 'KW'
	/** Cayman Islands. */
	| 'KY'
	/** Kazakhstan. */
	| 'KZ'
	/** Laos. */
	| 'LA'
	/** Lebanon. */
	| 'LB'
	/** St. Lucia. */
	| 'LC'
	/** Liechtenstein. */
	| 'LI'
	/** Sri Lanka. */
	| 'LK'
	/** Liberia. */
	| 'LR'
	/** Lesotho. */
	| 'LS'
	/** Lithuania. */
	| 'LT'
	/** Luxembourg. */
	| 'LU'
	/** Latvia. */
	| 'LV'
	/** Libya. */
	| 'LY'
	/** Morocco. */
	| 'MA'
	/** Monaco. */
	| 'MC'
	/** Moldova. */
	| 'MD'
	/** Montenegro. */
	| 'ME'
	/** St. Martin. */
	| 'MF'
	/** Madagascar. */
	| 'MG'
	/** North Macedonia. */
	| 'MK'
	/** Mali. */
	| 'ML'
	/** Myanmar (Burma). */
	| 'MM'
	/** Mongolia. */
	| 'MN'
	/** Macao SAR. */
	| 'MO'
	/** Martinique. */
	| 'MQ'
	/** Mauritania. */
	| 'MR'
	/** Montserrat. */
	| 'MS'
	/** Malta. */
	| 'MT'
	/** Mauritius. */
	| 'MU'
	/** Maldives. */
	| 'MV'
	/** Malawi. */
	| 'MW'
	/** Mexico. */
	| 'MX'
	/** Malaysia. */
	| 'MY'
	/** Mozambique. */
	| 'MZ'
	/** Namibia. */
	| 'NA'
	/** New Caledonia. */
	| 'NC'
	/** Niger. */
	| 'NE'
	/** Norfolk Island. */
	| 'NF'
	/** Nigeria. */
	| 'NG'
	/** Nicaragua. */
	| 'NI'
	/** Netherlands. */
	| 'NL'
	/** Norway. */
	| 'NO'
	/** Nepal. */
	| 'NP'
	/** Nauru. */
	| 'NR'
	/** Niue. */
	| 'NU'
	/** New Zealand. */
	| 'NZ'
	/** Oman. */
	| 'OM'
	/** Panama. */
	| 'PA'
	/** Peru. */
	| 'PE'
	/** French Polynesia. */
	| 'PF'
	/** Papua New Guinea. */
	| 'PG'
	/** Philippines. */
	| 'PH'
	/** Pakistan. */
	| 'PK'
	/** Poland. */
	| 'PL'
	/** St. Pierre & Miquelon. */
	| 'PM'
	/** Pitcairn Islands. */
	| 'PN'
	/** Palestinian Territories. */
	| 'PS'
	/** Portugal. */
	| 'PT'
	/** Paraguay. */
	| 'PY'
	/** Qatar. */
	| 'QA'
	/** Réunion. */
	| 'RE'
	/** Romania. */
	| 'RO'
	/** Serbia. */
	| 'RS'
	/** Russia. */
	| 'RU'
	/** Rwanda. */
	| 'RW'
	/** Saudi Arabia. */
	| 'SA'
	/** Solomon Islands. */
	| 'SB'
	/** Seychelles. */
	| 'SC'
	/** Sudan. */
	| 'SD'
	/** Sweden. */
	| 'SE'
	/** Singapore. */
	| 'SG'
	/** St. Helena. */
	| 'SH'
	/** Slovenia. */
	| 'SI'
	/** Svalbard & Jan Mayen. */
	| 'SJ'
	/** Slovakia. */
	| 'SK'
	/** Sierra Leone. */
	| 'SL'
	/** San Marino. */
	| 'SM'
	/** Senegal. */
	| 'SN'
	/** Somalia. */
	| 'SO'
	/** Suriname. */
	| 'SR'
	/** South Sudan. */
	| 'SS'
	/** São Tomé & Príncipe. */
	| 'ST'
	/** El Salvador. */
	| 'SV'
	/** Sint Maarten. */
	| 'SX'
	/** Syria. */
	| 'SY'
	/** Eswatini. */
	| 'SZ'
	/** Tristan da Cunha. */
	| 'TA'
	/** Turks & Caicos Islands. */
	| 'TC'
	/** Chad. */
	| 'TD'
	/** French Southern Territories. */
	| 'TF'
	/** Togo. */
	| 'TG'
	/** Thailand. */
	| 'TH'
	/** Tajikistan. */
	| 'TJ'
	/** Tokelau. */
	| 'TK'
	/** Timor-Leste. */
	| 'TL'
	/** Turkmenistan. */
	| 'TM'
	/** Tunisia. */
	| 'TN'
	/** Tonga. */
	| 'TO'
	/** Turkey. */
	| 'TR'
	/** Trinidad & Tobago. */
	| 'TT'
	/** Tuvalu. */
	| 'TV'
	/** Taiwan. */
	| 'TW'
	/** Tanzania. */
	| 'TZ'
	/** Ukraine. */
	| 'UA'
	/** Uganda. */
	| 'UG'
	/** U.S. Outlying Islands. */
	| 'UM'
	/** United States. */
	| 'US'
	/** Uruguay. */
	| 'UY'
	/** Uzbekistan. */
	| 'UZ'
	/** Vatican City. */
	| 'VA'
	/** St. Vincent & Grenadines. */
	| 'VC'
	/** Venezuela. */
	| 'VE'
	/** British Virgin Islands. */
	| 'VG'
	/** Vietnam. */
	| 'VN'
	/** Vanuatu. */
	| 'VU'
	/** Wallis & Futuna. */
	| 'WF'
	/** Samoa. */
	| 'WS'
	/** Kosovo. */
	| 'XK'
	/** Yemen. */
	| 'YE'
	/** Mayotte. */
	| 'YT'
	/** South Africa. */
	| 'ZA'
	/** Zambia. */
	| 'ZM'
	/** Zimbabwe. */
	| 'ZW'
	/** Unknown Region. */
	| 'ZZ';

export type ShopifyProductOperation = {
	data: { product: ShopifyProduct; shop: Shop };
	variables: {
		handle: string;
		selectedOptions: any[];
	};
};

export type ShopifyProductRecommendationsOperation = {
	data: {
		recommended: Product[];
		additional: ProductConnection;
	};
	variables: {
		productId: string;
		count?: number;
	};
};

export type CartCost = {
	__typename?: 'CartCost';
	/** The estimated amount, before taxes and discounts, for the customer to pay at checkout. The checkout charge amount doesn't include any deferred payments that'll be paid at a later date. If the cart has no deferred payments, then the checkout charge amount is equivalent to `subtotalAmount`. */
	checkoutChargeAmount: Money;
	/** The amount, before taxes and cart-level discounts, for the customer to pay. */
	subtotalAmount: Money;
	/** Whether the subtotal amount is estimated. */
	subtotalAmountEstimated: boolean;
	/** The total amount for the customer to pay. */
	totalAmount: Money;
	/** Whether the total amount is estimated. */
	totalAmountEstimated: boolean;
	/** The duty amount for the customer to pay at checkout. */
	totalDutyAmount?: Maybe<Money>;
	/** Whether the total duty amount is estimated. */
	totalDutyAmountEstimated: boolean;
	/** The tax amount for the customer to pay at checkout. */
	totalTaxAmount?: Maybe<Money>;
	/** Whether the total tax amount is estimated. */
	totalTaxAmountEstimated: boolean;
};

export type CartType = HasMetafields &
	Node & {
		__typename?: 'Cart';
		/** An attribute associated with the cart. */
		attribute?: Maybe<Attribute>;
		/** The attributes associated with the cart. Attributes are represented as key-value pairs. */
		attributes: Array<Attribute>;
		/** Information about the buyer that is interacting with the cart. */
		buyerIdentity: CartBuyerIdentity;
		/** The URL of the checkout for the cart. */
		checkoutUrl: string;
		/** The estimated costs that the buyer will pay at checkout. The costs are subject to change and changes will be reflected at checkout. The `cost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing). */
		cost: CartCost;
		/** The date and time when the cart was created. */
		createdAt: string;
		/**
		 * The delivery groups available for the cart, based on the buyer identity default
		 * delivery address preference or the default address of the logged-in customer.
		 *
		 */
		deliveryGroups: CartDeliveryGroupConnection;
		/** The discounts that have been applied to the entire cart. */
		discountAllocations: Array<
			| CartAutomaticDiscountAllocation
			| CartCodeDiscountAllocation
			| CartCustomDiscountAllocation
		>;
		/**
		 * The case-insensitive discount codes that the customer added at checkout.
		 *
		 */
		discountCodes: Array<CartDiscountCode>;
		/**
		 * The estimated costs that the buyer will pay at checkout.
		 * The estimated costs are subject to change and changes will be reflected at checkout.
		 * The `estimatedCost` field uses the `buyerIdentity` field to determine
		 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
		 *
		 * @deprecated Use `cost` instead.
		 */
		estimatedCost: CartEstimatedCost;
		/** A globally-unique identifier. */
		id: string;
		/** A list of lines containing information about the items the customer intends to purchase. */
		lines: BaseCartLineConnection;
		/** Returns a metafield found by namespace and key. */
		metafield?: Maybe<Metafield>;
		/**
		 * The metafields associated with the resource matching the supplied list of namespaces and keys.
		 *
		 */
		metafields: Array<Maybe<Metafield>>;
		/** A note that is associated with the cart. For example, the note can be a personalized message to the buyer. */
		note?: Maybe<string>;
		/** The total number of items in the cart. */
		totalQuantity: number;
		/** The date and time when the cart was updated. */
		updatedAt: string;
	};

export type CartDiscountCode = {
	__typename?: 'CartDiscountCode';
	/** Whether the discount code is applicable to the cart's current contents. */
	applicable: boolean;
	/** The code for the discount. */
	code: string;
};

export type CartEstimatedCost = {
	__typename?: 'CartEstimatedCost';
	/** The estimated amount, before taxes and discounts, for the customer to pay at checkout. The checkout charge amount doesn't include any deferred payments that'll be paid at a later date. If the cart has no deferred payments, then the checkout charge amount is equivalent to`subtotal_amount`. */
	checkoutChargeAmount: Money;
	/** The estimated amount, before taxes and discounts, for the customer to pay. */
	subtotalAmount: Money;
	/** The estimated total amount for the customer to pay. */
	totalAmount: Money;
	/** The estimated duty amount for the customer to pay at checkout. */
	totalDutyAmount?: Maybe<Money>;
	/** The estimated tax amount for the customer to pay at checkout. */
	totalTaxAmount?: Maybe<Money>;
};

export type CartDeliveryGroupConnection = {
	__typename?: 'CartDeliveryGroupConnection';
	/** A list of edges. */
	edges: Array<CartDeliveryGroupEdge>;
	/** A list of the nodes contained in CartDeliveryGroupEdge. */
	nodes: Array<CartDeliveryGroup>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one CartDeliveryGroup and a cursor during pagination.
 *
 */
export type CartDeliveryGroupEdge = {
	__typename?: 'CartDeliveryGroupEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of CartDeliveryGroupEdge. */
	node: CartDeliveryGroup;
};

export type CartDeliveryGroup = {
	__typename?: 'CartDeliveryGroup';
	/** A list of cart lines for the delivery group. */
	cartLines: BaseCartLineConnection;
	/** The destination address for the delivery group. */
	deliveryAddress: MailingAddress;
	/** The delivery options available for the delivery group. */
	deliveryOptions: Array<CartDeliveryOption>;
	/** The ID for the delivery group. */
	id: string;
	/** The selected delivery option for the delivery group. */
	selectedDeliveryOption?: Maybe<CartDeliveryOption>;
};

export type BaseCartLineConnection = {
	__typename?: 'BaseCartLineConnection';
	/** A list of edges. */
	edges: Array<BaseCartLineEdge>;
	/** A list of the nodes contained in BaseCartLineEdge. */
	nodes: Array<CartLine>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one BaseCartLine and a cursor during pagination.
 *
 */
export type BaseCartLineEdge = {
	__typename?: 'BaseCartLineEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of BaseCartLineEdge. */
	node: CartLine;
};

export type CartLine = BaseCartLine &
	Node & {
		__typename?: 'CartLine';
		/** An attribute associated with the cart line. */
		attribute?: Maybe<Attribute>;
		/** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
		attributes: Array<Attribute>;
		/** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
		cost: CartLineCost;
		/** The discounts that have been applied to the cart line. */
		discountAllocations: Array<
			| CartAutomaticDiscountAllocation
			| CartCodeDiscountAllocation
			| CartCustomDiscountAllocation
		>;
		/**
		 * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
		 * @deprecated Use `cost` instead.
		 */
		estimatedCost: CartLineEstimatedCost;
		/** A globally-unique identifier. */
		id: string;
		/** The merchandise that the buyer intends to purchase. */
		merchandise: ProductVariant;
		/** The quantity of the merchandise that the customer intends to purchase. */
		quantity: number;
		/** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
		sellingPlanAllocation?: Maybe<SellingPlanAllocation>;
	};

export type BaseCartLine = {
	/** An attribute associated with the cart line. */
	attribute?: Maybe<Attribute>;
	/** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
	attributes: Array<Attribute>;
	/** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
	cost: CartLineCost;
	/** The discounts that have been applied to the cart line. */
	discountAllocations: Array<
		| CartAutomaticDiscountAllocation
		| CartCodeDiscountAllocation
		| CartCustomDiscountAllocation
	>;
	/**
	 * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
	 * @deprecated Use `cost` instead.
	 */
	estimatedCost: CartLineEstimatedCost;
	/** A globally-unique identifier. */
	id: string;
	/** The merchandise that the buyer intends to purchase. */
	merchandise: ProductVariant;
	/** The quantity of the merchandise that the customer intends to purchase. */
	quantity: number;
	/** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
	sellingPlanAllocation?: Maybe<SellingPlanAllocation>;
};

export type SellingPlanAllocation = {
	__typename?: 'SellingPlanAllocation';
	/** The checkout charge amount due for the purchase. */
	checkoutChargeAmount: Money;
	/** A list of price adjustments, with a maximum of two. When there are two, the first price adjustment goes into effect at the time of purchase, while the second one starts after a certain number of orders. A price adjustment represents how a selling plan affects pricing when a variant is purchased with a selling plan. Prices display in the customer's currency if the shop is configured for it. */
	priceAdjustments: Array<SellingPlanAllocationPriceAdjustment>;
	/** The remaining balance charge amount due for the purchase. */
	remainingBalanceChargeAmount: Money;
	/** A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'. */
	sellingPlan: SellingPlan;
};

/** The resulting prices for variants when they're purchased with a specific selling plan. */
export type SellingPlanAllocationPriceAdjustment = {
	__typename?: 'SellingPlanAllocationPriceAdjustment';
	/** The price of the variant when it's purchased without a selling plan for the same number of deliveries. For example, if a customer purchases 6 deliveries of $10.00 granola separately, then the price is 6 x $10.00 = $60.00. */
	compareAtPrice: Money;
	/** The effective price for a single delivery. For example, for a prepaid subscription plan that includes 6 deliveries at the price of $48.00, the per delivery price is $8.00. */
	perDeliveryPrice: Money;
	/** The price of the variant when it's purchased with a selling plan For example, for a prepaid subscription plan that includes 6 deliveries of $10.00 granola, where the customer gets 20% off, the price is 6 x $10.00 x 0.80 = $48.00. */
	price: Money;
	/** The resulting price per unit for the variant associated with the selling plan. If the variant isn't sold by quantity or measurement, then this field returns `null`. */
	unitPrice?: Maybe<Money>;
};

export type SellingPlan = {
	__typename?: 'SellingPlan';
	/** The initial payment due for the purchase. */
	checkoutCharge: SellingPlanCheckoutCharge;
	/** The description of the selling plan. */
	description?: Maybe<string>;
	/** A globally-unique identifier. */
	id: string;
	/** The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'. */
	name: string;
	/** The selling plan options available in the drop-down list in the storefront. For example, 'Delivery every week' or 'Delivery every 2 weeks' specifies the delivery frequency options for the product. Individual selling plans contribute their options to the associated selling plan group. For example, a selling plan group might have an option called `option1: Delivery every`. One selling plan in that group could contribute `option1: 2 weeks` with the pricing for that option, and another selling plan could contribute `option1: 4 weeks`, with different pricing. */
	options: Array<SellingPlanOption>;
	/** The price adjustments that a selling plan makes when a variant is purchased with a selling plan. */
	priceAdjustments: Array<SellingPlanPriceAdjustment>;
	/** Whether purchasing the selling plan will result in multiple deliveries. */
	recurringDeliveries: boolean;
};

export type SellingPlanCheckoutCharge = {
	__typename?: 'SellingPlanCheckoutCharge';
	/** The charge type for the checkout charge. */
	type: SellingPlanCheckoutChargeType;
	/** The charge value for the checkout charge. */
	value: SellingPlanCheckoutChargeValue;
};

export type SellingPlanCheckoutChargePercentageValue = {
	__typename?: 'SellingPlanCheckoutChargePercentageValue';
	/** The percentage value of the price used for checkout charge. */
	percentage: number;
};

export type SellingPlanOption = {
	__typename?: 'SellingPlanOption';
	/** The name of the option (ie "Delivery every"). */
	name?: Maybe<string>;
	/** The value of the option (ie "Month"). */
	value?: Maybe<string>;
};

/** The checkout charge when the full amount isn't charged at checkout. */
export type SellingPlanCheckoutChargeType =
	/** The checkout charge is a percentage of the product or variant price. */
	| 'PERCENTAGE'
	/** The checkout charge is a fixed price amount. */
	| 'PRICE';

/** The portion of the price to be charged at checkout. */
export type SellingPlanCheckoutChargeValue =
	| Money
	| SellingPlanCheckoutChargePercentageValue;

export type SellingPlanPercentagePriceAdjustment = {
	__typename?: 'SellingPlanPercentagePriceAdjustment';
	/** The percentage value of the price adjustment. */
	adjustmentPercentage: number;
};

/** Represents by how much the price of a variant associated with a selling plan is adjusted. Each variant can have up to two price adjustments. If a variant has multiple price adjustments, then the first price adjustment applies when the variant is initially purchased. The second price adjustment applies after a certain number of orders (specified by the `orderCount` field) are made. If a selling plan doesn't have any price adjustments, then the unadjusted price of the variant is the effective price. */
export type SellingPlanPriceAdjustment = {
	__typename?: 'SellingPlanPriceAdjustment';
	/** The type of price adjustment. An adjustment value can have one of three types: percentage, amount off, or a new price. */
	adjustmentValue: SellingPlanPriceAdjustmentValue;
	/** The number of orders that the price adjustment applies to. If the price adjustment always applies, then this field is `null`. */
	orderCount?: Maybe<number>;
};

export type SellingPlanPriceAdjustmentValue =
	| SellingPlanFixedAmountPriceAdjustment
	| SellingPlanFixedPriceAdjustment
	| SellingPlanPercentagePriceAdjustment;

export type SellingPlanFixedAmountPriceAdjustment = {
	__typename?: 'SellingPlanFixedAmountPriceAdjustment';
	/** The money value of the price adjustment. */
	adjustmentAmount: Money;
};

/** A fixed price adjustment for a variant that's purchased with a selling plan. */
export type SellingPlanFixedPriceAdjustment = {
	__typename?: 'SellingPlanFixedPriceAdjustment';
	/** A new price of the variant when it's purchased with the selling plan. */
	price: Money;
};

export type CartLineEstimatedCost = {
	__typename?: 'CartLineEstimatedCost';
	/** The amount of the merchandise line. */
	amount: Money;
	/** The compare at amount of the merchandise line. */
	compareAtAmount?: Maybe<Money>;
	/** The estimated cost of the merchandise line before discounts. */
	subtotalAmount: Money;
	/** The estimated total cost of the merchandise line. */
	totalAmount: Money;
};

/** The discounts automatically applied to the cart line based on prerequisites that have been met. */
export type CartCustomDiscountAllocation = CartDiscountAllocation & {
	__typename?: 'CartCustomDiscountAllocation';
	/** The discounted amount that has been applied to the cart line. */
	discountedAmount: Money;
	/** The title of the allocated discount. */
	title: string;
};

export type CartCodeDiscountAllocation = CartDiscountAllocation & {
	__typename?: 'CartCodeDiscountAllocation';
	/** The code used to apply the discount. */
	code: string;
	/** The discounted amount that has been applied to the cart line. */
	discountedAmount: Money;
};

export type CartAutomaticDiscountAllocation = CartDiscountAllocation & {
	__typename?: 'CartAutomaticDiscountAllocation';
	/** The discounted amount that has been applied to the cart line. */
	discountedAmount: Money;
	/** The title of the allocated discount. */
	title: string;
};

export type CartDiscountAllocation = {
	/** The discounted amount that has been applied to the cart line. */
	discountedAmount: Money;
};

export type CartLineCost = {
	__typename?: 'CartLineCost';
	/** The amount of the merchandise line. */
	amountPerQuantity: Money;
	/** The compare at amount of the merchandise line. */
	compareAtAmountPerQuantity?: Maybe<Money>;
	/** The cost of the merchandise line before line-level discounts. */
	subtotalAmount: Money;
	/** The total cost of the merchandise line. */
	totalAmount: Money;
};

export type CartDeliveryOption = {
	__typename?: 'CartDeliveryOption';
	/** The code of the delivery option. */
	code?: Maybe<string>;
	/** The method for the delivery option. */
	deliveryMethodType: DeliveryMethodType;
	/** The description of the delivery option. */
	description?: Maybe<string>;
	/** The estimated cost for the delivery option. */
	estimatedCost: Money;
	/** The unique identifier of the delivery option. */
	handle: string;
	/** The title of the delivery option. */
	title?: Maybe<string>;
};

export type DeliveryMethodType =
	/** Local Delivery. */
	| 'LOCAL'
	/** None. */
	| 'NONE'
	/** Shipping to a Pickup Point. */
	| 'PICKUP_POINT'
	/** Local Pickup. */
	| 'PICK_UP'
	/** Retail. */
	| 'RETAIL'
	/** Shipping. */
	| 'SHIPPING';

export type Attribute = {
	__typename?: 'Attribute';
	/** Key or name of the attribute. */
	key: string;
	/** Value of the attribute. */
	value?: string;
};

export type CartBuyerIdentity = {
	__typename?: 'CartBuyerIdentity';
	/** The country where the buyer is located. */
	countryCode?: Maybe<CountryCode>;
	/** The customer account associated with the cart. */
	customer?: Maybe<Customer>;
	/**
	 * An ordered set of delivery addresses tied to the buyer that is interacting with the cart.
	 * The rank of the preferences is determined by the order of the addresses in the array. Preferences
	 * can be used to populate relevant fields in the checkout flow.
	 *
	 */
	deliveryAddressPreferences: Array<MailingAddress>;
	/** The email address of the buyer that is interacting with the cart. */
	email?: Maybe<string>;
	/** The phone number of the buyer that is interacting with the cart. */
	phone?: Maybe<string>;
	/**
	 * A set of wallet preferences tied to the buyer that is interacting with the cart.
	 * Preferences can be used to populate relevant payment fields in the checkout flow.
	 *
	 */
	walletPreferences: Array<string>;
};

export type Customer = HasMetafields & {
	__typename?: 'Customer';
	/** Indicates whether the customer has consented to be sent marketing material via email. */
	acceptsMarketing: boolean;
	/** A list of addresses for the customer. */
	addresses: MailingAddressConnection;
	/** The date and time when the customer was created. */
	createdAt: string;
	/** The customer’s default address. */
	defaultAddress?: Maybe<MailingAddress>;
	/** The customer’s name, email or phone number. */
	displayName: string;
	/** The customer’s email address. */
	email?: Maybe<string>;
	/** The customer’s first name. */
	firstName?: Maybe<string>;
	/** A unique identifier for the customer. */
	id: string;
	/** The customer's most recently updated, incomplete checkout. */
	lastIncompleteCheckout?: Maybe<Checkout>;
	/** The customer’s last name. */
	lastName?: Maybe<string>;
	/** Returns a metafield found by namespace and key. */
	metafield?: Maybe<Metafield>;
	/**
	 * The metafields associated with the resource matching the supplied list of namespaces and keys.
	 *
	 */
	metafields: Array<Maybe<Metafield>>;
	/** The number of orders that the customer has made at the store in their lifetime. */
	numberOfOrders: string;
	/** The orders associated with the customer. */
	orders: OrderConnection;
	/** The customer’s phone number. */
	phone?: Maybe<string>;
	/**
	 * A comma separated list of tags that have been added to the customer.
	 * Additional access scope required: unauthenticated_read_customer_tags.
	 *
	 */
	tags: Array<string>;
	/** The date and time when the customer information was updated. */
	updatedAt: string;
};

export type OrderConnection = {
	__typename?: 'OrderConnection';
	/** A list of edges. */
	edges: Array<OrderEdge>;
	/** A list of the nodes contained in OrderEdge. */
	nodes: Array<Order>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
	/** The total count of Orders. */
	totalCount: string;
};

export type OrderEdge = {
	__typename?: 'OrderEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of OrderEdge. */
	node: Order;
};

export type MailingAddressConnection = {
	__typename?: 'MailingAddressConnection';
	/** A list of edges. */
	edges: Array<MailingAddressEdge>;
	/** A list of the nodes contained in MailingAddressEdge. */
	nodes: Array<MailingAddress>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one MailingAddress and a cursor during pagination.
 *
 */
export type MailingAddressEdge = {
	__typename?: 'MailingAddressEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of MailingAddressEdge. */
	node: MailingAddress;
};

export type MailingAddress = Node & {
	__typename?: 'MailingAddress';
	/** The first line of the address. Typically the street address or PO Box number. */
	address1?: Maybe<string>;
	/**
	 * The second line of the address. Typically the number of the apartment, suite, or unit.
	 *
	 */
	address2?: Maybe<string>;
	/**
	 * The name of the city, district, village, or town.
	 *
	 */
	city?: Maybe<string>;
	/**
	 * The name of the customer's company or organization.
	 *
	 */
	company?: Maybe<string>;
	/**
	 * The name of the country.
	 *
	 */
	country?: Maybe<string>;
	/**
	 * The two-letter code for the country of the address.
	 *
	 * For example, US.
	 *
	 * @deprecated Use `countryCodeV2` instead.
	 */
	countryCode?: Maybe<string>;
	/**
	 * The two-letter code for the country of the address.
	 *
	 * For example, US.
	 *
	 */
	countryCodeV2?: Maybe<CountryCode>;
	/** The first name of the customer. */
	firstName?: Maybe<string>;
	/** A formatted version of the address, customized by the provided arguments. */
	formatted: Array<string>;
	/** A comma-separated list of the values for city, province, and country. */
	formattedArea?: Maybe<string>;
	/** A globally-unique identifier. */
	id: string;
	/** The last name of the customer. */
	lastName?: Maybe<string>;
	/** The latitude coordinate of the customer address. */
	latitude?: Maybe<number>;
	/** The longitude coordinate of the customer address. */
	longitude?: Maybe<number>;
	/**
	 * The full name of the customer, based on firstName and lastName.
	 *
	 */
	name?: Maybe<string>;
	/**
	 * A unique phone number for the customer.
	 *
	 * Formatted using E.164 standard. For example, _+16135551111_.
	 *
	 */
	phone?: Maybe<string>;
	/** The region of the address, such as the province, state, or district. */
	province?: Maybe<string>;
	/**
	 * The two-letter code for the region.
	 *
	 * For example, ON.
	 *
	 */
	provinceCode?: Maybe<string>;
	/** The zip or postal code of the address. */
	zip?: Maybe<string>;
};

/** Specifies the fields accepted to create or update a mailing address. */
export type MailingAddressInput = {
	/**
	 * The first line of the address. Typically the street address or PO Box number.
	 *
	 */
	address1?: InputMaybe<Scalars['String']>;
	/**
	 * The second line of the address. Typically the number of the apartment, suite, or unit.
	 *
	 */
	address2?: InputMaybe<Scalars['String']>;
	/**
	 * The name of the city, district, village, or town.
	 *
	 */
	city?: InputMaybe<Scalars['String']>;
	/**
	 * The name of the customer's company or organization.
	 *
	 */
	company?: InputMaybe<Scalars['String']>;
	/** The name of the country. */
	country?: InputMaybe<Scalars['String']>;
	/** The first name of the customer. */
	firstName?: InputMaybe<Scalars['String']>;
	/** The last name of the customer. */
	lastName?: InputMaybe<Scalars['String']>;
	/**
	 * A unique phone number for the customer.
	 *
	 * Formatted using E.164 standard. For example, _+16135551111_.
	 *
	 */
	phone?: InputMaybe<Scalars['String']>;
	/** The region of the address, such as the province, state, or district. */
	province?: InputMaybe<Scalars['String']>;
	/** The zip or postal code of the address. */
	zip?: InputMaybe<Scalars['String']>;
};

export type Checkout = Node & {
	__typename?: 'Checkout';
	/** The gift cards used on the checkout. */
	appliedGiftCards: Array<AppliedGiftCard>;
	/**
	 * The available shipping rates for this Checkout.
	 * Should only be used when checkout `requiresShipping` is `true` and
	 * the shipping address is valid.
	 *
	 */
	availableShippingRates?: Maybe<AvailableShippingRates>;
	/** The identity of the customer associated with the checkout. */
	buyerIdentity: CheckoutBuyerIdentity;
	/** The date and time when the checkout was completed. */
	completedAt?: Maybe<string>;
	/** The date and time when the checkout was created. */
	createdAt: string;
	/** The currency code for the checkout. */
	currencyCode: CurrencyCode;
	/** A list of extra information that is added to the checkout. */
	customAttributes: Array<Attribute>;
	/** Discounts that have been applied on the checkout. */
	discountApplications: DiscountApplicationConnection;
	/** The email attached to this checkout. */
	email?: Maybe<string>;
	/** A globally-unique identifier. */
	id: string;
	/** A list of line item objects, each one containing information about an item in the checkout. */
	lineItems: CheckoutLineItemConnection;
	/** The sum of all the prices of all the items in the checkout. Duties, taxes, shipping and discounts excluded. */
	lineItemsSubtotalPrice: Money;
	/** The note associated with the checkout. */
	note?: Maybe<string>;
	/** The resulting order from a paid checkout. */
	order?: Maybe<Order>;
	/** The Order Status Page for this Checkout, null when checkout is not completed. */
	orderStatusUrl?: Maybe<string>;
	/** The amount left to be paid. This is equal to the cost of the line items, taxes, and shipping, minus discounts and gift cards. */
	paymentDue: Money;
	/**
	 * The amount left to be paid. This is equal to the cost of the line items, duties, taxes, and shipping, minus discounts and gift cards.
	 * @deprecated Use `paymentDue` instead.
	 */
	paymentDueV2: Money;
	/**
	 * Whether or not the Checkout is ready and can be completed. Checkouts may
	 * have asynchronous operations that can take time to finish. If you want
	 * to complete a checkout or ensure all the fields are populated and up to
	 * date, polling is required until the value is true.
	 *
	 */
	ready: boolean;
	/** States whether or not the fulfillment requires shipping. */
	requiresShipping: boolean;
	/** The shipping address to where the line items will be shipped. */
	shippingAddress?: Maybe<MailingAddress>;
	/**
	 * The discounts that have been allocated onto the shipping line by discount applications.
	 *
	 */
	shippingDiscountAllocations: Array<DiscountAllocation>;
	/** Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object. */
	shippingLine?: Maybe<ShippingRate>;
	/** The price at checkout before shipping and taxes. */
	subtotalPrice: Money;
	/**
	 * The price at checkout before duties, shipping, and taxes.
	 * @deprecated Use `subtotalPrice` instead.
	 */
	subtotalPriceV2: Money;
	/** Whether the checkout is tax exempt. */
	taxExempt: boolean;
	/** Whether taxes are included in the line item and shipping line prices. */
	taxesIncluded: boolean;
	/** The sum of all the duties applied to the line items in the checkout. */
	totalDuties?: Maybe<Money>;
	/** The sum of all the prices of all the items in the checkout, including taxes and duties. */
	totalPrice: Money;
	/**
	 * The sum of all the prices of all the items in the checkout, including taxes and duties.
	 * @deprecated Use `totalPrice` instead.
	 */
	totalPriceV2: Money;
	/** The sum of all the taxes applied to the line items and shipping lines in the checkout. */
	totalTax: Money;
	/**
	 * The sum of all the taxes applied to the line items and shipping lines in the checkout.
	 * @deprecated Use `totalTax` instead.
	 */
	totalTaxV2: Money;
	/** The date and time when the checkout was last updated. */
	updatedAt: string;
	/** The url pointing to the checkout accessible from the web. */
	webUrl: string;
};

export type AppliedGiftCard = Node & {
	__typename?: 'AppliedGiftCard';
	/** The amount that was taken from the gift card by applying it. */
	amountUsed: Money;
	/**
	 * The amount that was taken from the gift card by applying it.
	 * @deprecated Use `amountUsed` instead.
	 */
	amountUsedV2: Money;
	/** The amount left on the gift card. */
	balance: Money;
	/**
	 * The amount left on the gift card.
	 * @deprecated Use `balance` instead.
	 */
	balanceV2: Money;
	/** A globally-unique identifier. */
	id: string;
	/** The last characters of the gift card. */
	lastCharacters: string;
	/** The amount that was applied to the checkout in its currency. */
	presentmentAmountUsed: Money;
};

export type AvailableShippingRates = {
	__typename?: 'AvailableShippingRates';
	/**
	 * Whether or not the shipping rates are ready.
	 * The `shippingRates` field is `null` when this value is `false`.
	 * This field should be polled until its value becomes `true`.
	 *
	 */
	ready: boolean;
	/** The fetched shipping rates. `null` until the `ready` field is `true`. */
	shippingRates?: Maybe<Array<ShippingRate>>;
};

export type ShippingRate = {
	__typename?: 'ShippingRate';
	/** Human-readable unique identifier for this shipping rate. */
	handle: string;
	/** Price of this shipping rate. */
	price: Money;
	/**
	 * Price of this shipping rate.
	 * @deprecated Use `price` instead.
	 */
	priceV2: Money;
	/** Title of this shipping rate. */
	title: string;
};

export type CheckoutBuyerIdentity = {
	__typename?: 'CheckoutBuyerIdentity';
	/** The country code for the checkout. For example, `CA`. */
	countryCode?: Maybe<CountryCode>;
};

export type CurrencyCode =
	/** United Arab Emirates Dirham (AED). */
	| 'AED'
	/** Afghan Afghani (AFN). */
	| 'AFN'
	/** Albanian Lek (ALL). */
	| 'ALL'
	/** Armenian Dram (AMD). */
	| 'AMD'
	/** Netherlands Antillean Guilder. */
	| 'ANG'
	/** Angolan Kwanza (AOA). */
	| 'AOA'
	/** Argentine Pesos (ARS). */
	| 'ARS'
	/** Australian Dollars (AUD). */
	| 'AUD'
	/** Aruban Florin (AWG). */
	| 'AWG'
	/** Azerbaijani Manat (AZN). */
	| 'AZN'
	/** Bosnia and Herzegovina Convertible Mark (BAM). */
	| 'BAM'
	/** Barbadian Dollar (BBD). */
	| 'BBD'
	/** Bangladesh Taka (BDT). */
	| 'BDT'
	/** Bulgarian Lev (BGN). */
	| 'BGN'
	/** Bahraini Dinar (BHD). */
	| 'BHD'
	/** Burundian Franc (BIF). */
	| 'BIF'
	/** Bermudian Dollar (BMD). */
	| 'BMD'
	/** Brunei Dollar (BND). */
	| 'BND'
	/** Bolivian Boliviano (BOB). */
	| 'BOB'
	/** Brazilian Real (BRL). */
	| 'BRL'
	/** Bahamian Dollar (BSD). */
	| 'BSD'
	/** Bhutanese Ngultrum (BTN). */
	| 'BTN'
	/** Botswana Pula (BWP). */
	| 'BWP'
	/** Belarusian Ruble (BYN). */
	| 'BYN'
	/** Belarusian Ruble (BYR). */
	| 'BYR'
	/** Belize Dollar (BZD). */
	| 'BZD'
	/** Canadian Dollars (CAD). */
	| 'CAD'
	/** Congolese franc (CDF). */
	| 'CDF'
	/** Swiss Francs (CHF). */
	| 'CHF'
	/** Chilean Peso (CLP). */
	| 'CLP'
	/** Chinese Yuan Renminbi (CNY). */
	| 'CNY'
	/** Colombian Peso (COP). */
	| 'COP'
	/** Costa Rican Colones (CRC). */
	| 'CRC'
	/** Cape Verdean escudo (CVE). */
	| 'CVE'
	/** Czech Koruny (CZK). */
	| 'CZK'
	/** Djiboutian Franc (DJF). */
	| 'DJF'
	/** Danish Kroner (DKK). */
	| 'DKK'
	/** Dominican Peso (DOP). */
	| 'DOP'
	/** Algerian Dinar (DZD). */
	| 'DZD'
	/** Egyptian Pound (EGP). */
	| 'EGP'
	/** Eritrean Nakfa (ERN). */
	| 'ERN'
	/** Ethiopian Birr (ETB). */
	| 'ETB'
	/** Euro (EUR). */
	| 'EUR'
	/** Fijian Dollars (FJD). */
	| 'FJD'
	/** Falkland Islands Pounds (FKP). */
	| 'FKP'
	/** United Kingdom Pounds (GBP). */
	| 'GBP'
	/** Georgian Lari (GEL). */
	| 'GEL'
	/** Ghanaian Cedi (GHS). */
	| 'GHS'
	/** Gibraltar Pounds (GIP). */
	| 'GIP'
	/** Gambian Dalasi (GMD). */
	| 'GMD'
	/** Guinean Franc (GNF). */
	| 'GNF'
	/** Guatemalan Quetzal (GTQ). */
	| 'GTQ'
	/** Guyanese Dollar (GYD). */
	| 'GYD'
	/** Hong Kong Dollars (HKD). */
	| 'HKD'
	/** Honduran Lempira (HNL). */
	| 'HNL'
	/** Croatian Kuna (HRK). */
	| 'HRK'
	/** Haitian Gourde (HTG). */
	| 'HTG'
	/** Hungarian Forint (HUF). */
	| 'HUF'
	/** Indonesian Rupiah (IDR). */
	| 'IDR'
	/** Israeli New Shekel (NIS). */
	| 'ILS'
	/** Indian Rupees (INR). */
	| 'INR'
	/** Iraqi Dinar (IQD). */
	| 'IQD'
	/** Iranian Rial (IRR). */
	| 'IRR'
	/** Icelandic Kronur (ISK). */
	| 'ISK'
	/** Jersey Pound. */
	| 'JEP'
	/** Jamaican Dollars (JMD). */
	| 'JMD'
	/** Jordanian Dinar (JOD). */
	| 'JOD'
	/** Japanese Yen (JPY). */
	| 'JPY'
	/** Kenyan Shilling (KES). */
	| 'KES'
	/** Kyrgyzstani Som (KGS). */
	| 'KGS'
	/** Cambodian Riel. */
	| 'KHR'
	/** Kiribati Dollar (KID). */
	| 'KID'
	/** Comorian Franc (KMF). */
	| 'KMF'
	/** South Korean Won (KRW). */
	| 'KRW'
	/** Kuwaiti Dinar (KWD). */
	| 'KWD'
	/** Cayman Dollars (KYD). */
	| 'KYD'
	/** Kazakhstani Tenge (KZT). */
	| 'KZT'
	/** Laotian Kip (LAK). */
	| 'LAK'
	/** Lebanese Pounds (LBP). */
	| 'LBP'
	/** Sri Lankan Rupees (LKR). */
	| 'LKR'
	/** Liberian Dollar (LRD). */
	| 'LRD'
	/** Lesotho Loti (LSL). */
	| 'LSL'
	/** Lithuanian Litai (LTL). */
	| 'LTL'
	/** Latvian Lati (LVL). */
	| 'LVL'
	/** Libyan Dinar (LYD). */
	| 'LYD'
	/** Moroccan Dirham. */
	| 'MAD'
	/** Moldovan Leu (MDL). */
	| 'MDL'
	/** Malagasy Ariary (MGA). */
	| 'MGA'
	/** Macedonia Denar (MKD). */
	| 'MKD'
	/** Burmese Kyat (MMK). */
	| 'MMK'
	/** Mongolian Tugrik. */
	| 'MNT'
	/** Macanese Pataca (MOP). */
	| 'MOP'
	/** Mauritanian Ouguiya (MRU). */
	| 'MRU'
	/** Mauritian Rupee (MUR). */
	| 'MUR'
	/** Maldivian Rufiyaa (MVR). */
	| 'MVR'
	/** Malawian Kwacha (MWK). */
	| 'MWK'
	/** Mexican Pesos (MXN). */
	| 'MXN'
	/** Malaysian Ringgits (MYR). */
	| 'MYR'
	/** Mozambican Metical. */
	| 'MZN'
	/** Namibian Dollar. */
	| 'NAD'
	/** Nigerian Naira (NGN). */
	| 'NGN'
	/** Nicaraguan Córdoba (NIO). */
	| 'NIO'
	/** Norwegian Kroner (NOK). */
	| 'NOK'
	/** Nepalese Rupee (NPR). */
	| 'NPR'
	/** New Zealand Dollars (NZD). */
	| 'NZD'
	/** Omani Rial (OMR). */
	| 'OMR'
	/** Panamian Balboa (PAB). */
	| 'PAB'
	/** Peruvian Nuevo Sol (PEN). */
	| 'PEN'
	/** Papua New Guinean Kina (PGK). */
	| 'PGK'
	/** Philippine Peso (PHP). */
	| 'PHP'
	/** Pakistani Rupee (PKR). */
	| 'PKR'
	/** Polish Zlotych (PLN). */
	| 'PLN'
	/** Paraguayan Guarani (PYG). */
	| 'PYG'
	/** Qatari Rial (QAR). */
	| 'QAR'
	/** Romanian Lei (RON). */
	| 'RON'
	/** Serbian dinar (RSD). */
	| 'RSD'
	/** Russian Rubles (RUB). */
	| 'RUB'
	/** Rwandan Franc (RWF). */
	| 'RWF'
	/** Saudi Riyal (SAR). */
	| 'SAR'
	/** Solomon Islands Dollar (SBD). */
	| 'SBD'
	/** Seychellois Rupee (SCR). */
	| 'SCR'
	/** Sudanese Pound (SDG). */
	| 'SDG'
	/** Swedish Kronor (SEK). */
	| 'SEK'
	/** Singapore Dollars (SGD). */
	| 'SGD'
	/** Saint Helena Pounds (SHP). */
	| 'SHP'
	/** Sierra Leonean Leone (SLL). */
	| 'SLL'
	/** Somali Shilling (SOS). */
	| 'SOS'
	/** Surinamese Dollar (SRD). */
	| 'SRD'
	/** South Sudanese Pound (SSP). */
	| 'SSP'
	/** Sao Tome And Principe Dobra (STD). */
	| 'STD'
	/** Sao Tome And Principe Dobra (STN). */
	| 'STN'
	/** Syrian Pound (SYP). */
	| 'SYP'
	/** Swazi Lilangeni (SZL). */
	| 'SZL'
	/** Thai baht (THB). */
	| 'THB'
	/** Tajikistani Somoni (TJS). */
	| 'TJS'
	/** Turkmenistani Manat (TMT). */
	| 'TMT'
	/** Tunisian Dinar (TND). */
	| 'TND'
	/** Tongan Pa'anga (TOP). */
	| 'TOP'
	/** Turkish Lira (TRY). */
	| 'TRY'
	/** Trinidad and Tobago Dollars (TTD). */
	| 'TTD'
	/** Taiwan Dollars (TWD). */
	| 'TWD'
	/** Tanzanian Shilling (TZS). */
	| 'TZS'
	/** Ukrainian Hryvnia (UAH). */
	| 'UAH'
	/** Ugandan Shilling (UGX). */
	| 'UGX'
	/** United States Dollars (USD). */
	| 'USD'
	/** Uruguayan Pesos (UYU). */
	| 'UYU'
	/** Uzbekistan som (UZS). */
	| 'UZS'
	/** Venezuelan Bolivares (VED). */
	| 'VED'
	/** Venezuelan Bolivares (VEF). */
	| 'VEF'
	/** Venezuelan Bolivares (VES). */
	| 'VES'
	/** Vietnamese đồng (VND). */
	| 'VND'
	/** Vanuatu Vatu (VUV). */
	| 'VUV'
	/** Samoan Tala (WST). */
	| 'WST'
	/** Central African CFA Franc (XAF). */
	| 'XAF'
	/** East Caribbean Dollar (XCD). */
	| 'XCD'
	/** West African CFA franc (XOF). */
	| 'XOF'
	/** CFP Franc (XPF). */
	| 'XPF'
	/** Unrecognized currency. */
	| 'XXX'
	/** Yemeni Rial (YER). */
	| 'YER'
	/** South African Rand (ZAR). */
	| 'ZAR'
	/** Zambian Kwacha (ZMW). */
	| 'ZMW';

export type DiscountApplicationConnection = {
	__typename?: 'DiscountApplicationConnection';
	/** A list of edges. */
	edges: Array<DiscountApplicationEdge>;
	/** A list of the nodes contained in DiscountApplicationEdge. */
	nodes: Array<
		| AutomaticDiscountApplication
		| DiscountCodeApplication
		| ManualDiscountApplication
		| ScriptDiscountApplication
	>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

export type OrderLineItem = {
	__typename?: 'OrderLineItem';
	/** The number of entries associated to the line item minus the items that have been removed. */
	currentQuantity: number;
	/** List of custom attributes associated to the line item. */
	customAttributes: Array<Attribute>;
	/** The discounts that have been allocated onto the order line item by discount applications. */
	discountAllocations: Array<DiscountAllocation>;
	/** The total price of the line item, including discounts, and displayed in the presentment currency. */
	discountedTotalPrice: Money;
	/** The total price of the line item, not including any discounts. The total price is calculated using the original unit price multiplied by the quantity, and it is displayed in the presentment currency. */
	originalTotalPrice: Money;
	/** The number of products variants associated to the line item. */
	quantity: number;
	/** The title of the product combined with title of the variant. */
	title: string;
	/** The product variant object associated to the line item. */
	variant?: Maybe<ProductVariant & { product: Product }>;
};

/**
 * An auto-generated type for paginating through multiple OrderLineItems.
 *
 */
export type OrderLineItemConnection = {
	__typename?: 'OrderLineItemConnection';
	/** A list of edges. */
	edges: Array<OrderLineItemEdge>;
	/** A list of the nodes contained in OrderLineItemEdge. */
	nodes: Array<OrderLineItem>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one OrderLineItem and a cursor during pagination.
 *
 */
export type OrderLineItemEdge = {
	__typename?: 'OrderLineItemEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of OrderLineItemEdge. */
	node: OrderLineItem;
};

export type Fulfillment = {
	__typename?: 'Fulfillment';
	/** List of the fulfillment's line items. */
	fulfillmentLineItems: FulfillmentLineItemConnection;
	/** The name of the tracking company. */
	trackingCompany?: Maybe<string>;
	/**
	 * Tracking information associated with the fulfillment,
	 * such as the tracking number and tracking URL.
	 *
	 */
	trackingInfo: Array<FulfillmentTrackingInfo>;
};

export type FulfillmentLineItem = {
	__typename?: 'FulfillmentLineItem';
	/** The associated order's line item. */
	lineItem: OrderLineItem;
	/** The amount fulfilled in this fulfillment. */
	quantity: number;
};

/**
 * An auto-generated type for paginating through multiple FulfillmentLineItems.
 *
 */
export type FulfillmentLineItemConnection = {
	__typename?: 'FulfillmentLineItemConnection';
	/** A list of edges. */
	edges: Array<FulfillmentLineItemEdge>;
	/** A list of the nodes contained in FulfillmentLineItemEdge. */
	nodes: Array<FulfillmentLineItem>;
	/** Information to aid in pagination. */
	pageInfo: PageInfo;
};

/**
 * An auto-generated type which holds one FulfillmentLineItem and a cursor during pagination.
 *
 */
export type FulfillmentLineItemEdge = {
	__typename?: 'FulfillmentLineItemEdge';
	/** A cursor for use in pagination. */
	cursor: string;
	/** The item at the end of FulfillmentLineItemEdge. */
	node: FulfillmentLineItem;
};

export type FulfillmentTrackingInfo = {
	__typename?: 'FulfillmentTrackingInfo';
	/** The tracking number of the fulfillment. */
	number?: Maybe<string>;
	/** The URL to track the fulfillment. */
	url?: Maybe<string>;
};

export type ProductSortKeys =
	/** Sort by the `best_selling` value. */
	| 'BEST_SELLING'
	/** Sort by the `created_at` value. */
	| 'CREATED_AT'
	/** Sort by the `id` value. */
	| 'ID'
	/** Sort by the `price` value. */
	| 'PRICE'
	/** Sort by the `product_type` value. */
	| 'PRODUCT_TYPE'
	/**
	 * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
	 * Don't use this sort key when no search query is specified.
	 *
	 */
	| 'RELEVANCE'
	/** Sort by the `title` value. */
	| 'TITLE'
	/** Sort by the `updated_at` value. */
	| 'UPDATED_AT'
	/** Sort by the `vendor` value. */
	| 'VENDOR';

/** A CustomerAccessToken represents the unique token required to make modifications to the customer object. */
export type CustomerAccessToken = {
	__typename?: 'CustomerAccessToken';
	/** The customer’s access token. */
	accessToken: Scalars['String'];
	/** The date and time when the customer access token expires. */
	expiresAt: Scalars['DateTime'];
};

/** Return type for `customerRecover` mutation. */
export type CustomerRecoverPayload = {
	__typename?: 'CustomerRecoverPayload';
	/** The list of errors that occurred from executing the mutation. */
	customerUserErrors: Array<CustomerUserError>;
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
	userErrors: Array<UserError>;
};

/** Return type for `customerReset` mutation. */
export type CustomerResetPayload = {
	__typename?: 'CustomerResetPayload';
	/** The customer object which was reset. */
	customer?: Maybe<Customer>;
	/** A newly created customer access token object for the customer. */
	customerAccessToken?: Maybe<CustomerAccessToken>;
	/** The list of errors that occurred from executing the mutation. */
	customerUserErrors: Array<CustomerUserError>;
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
	userErrors: Array<UserError>;
};

/** Return type for `customerAccessTokenCreate` mutation. */
export type CustomerAccessTokenCreatePayload = {
	__typename?: 'CustomerAccessTokenCreatePayload';
	/** The newly created customer access token object. */
	customerAccessToken?: Maybe<CustomerAccessToken>;
	/** The list of errors that occurred from executing the mutation. */
	customerUserErrors: Array<CustomerUserError>;
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
	userErrors: Array<UserError>;
};

export type ShopType = HasMetafields &
	Node & {
		__typename?: 'Shop';
		/** The shop's branding configuration. */
		brand?: Maybe<Brand>;
		/** A description of the shop. */
		description?: Maybe<Scalars['String']>;
		/** A globally-unique identifier. */
		id: Scalars['ID'];
		/** Returns a metafield found by namespace and key. */
		metafield?: Maybe<Metafield>;
		/**
		 * The metafields associated with the resource matching the supplied list of namespaces and keys.
		 *
		 */
		metafields: Array<Maybe<Metafield>>;
		/** A string representing the way currency is formatted when the currency isn’t specified. */
		moneyFormat: Scalars['String'];
		/** The shop’s name. */
		name: Scalars['String'];
		/** Settings related to payments. */
		paymentSettings: PaymentSettings;
		/** The primary domain of the shop’s Online Store. */
		primaryDomain: Domain;
		/** The shop’s privacy policy. */
		privacyPolicy?: Maybe<ShopPolicy>;
		/** The shop’s refund policy. */
		refundPolicy?: Maybe<ShopPolicy>;
		/** The shop’s shipping policy. */
		shippingPolicy?: Maybe<ShopPolicy>;
		/** Countries that the shop ships to. */
		shipsToCountries: Array<CountryCode>;
		/** The shop’s subscription policy. */
		subscriptionPolicy?: Maybe<ShopPolicyWithDefault>;
		/** The shop’s terms of service. */
		termsOfService?: Maybe<ShopPolicy>;
	};

export type Brand = {
	__typename?: 'Brand';
	/** The colors of the store's brand. */
	colors: BrandColors;
	/** The store's cover image. */
	coverImage?: Maybe<MediaImage>;
	/** The store's default logo. */
	logo?: Maybe<MediaImage>;
	/** The store's short description. */
	shortDescription?: Maybe<Scalars['String']>;
	/** The store's slogan. */
	slogan?: Maybe<Scalars['String']>;
	/** The store's preferred logo for square UI elements. */
	squareLogo?: Maybe<MediaImage>;
};

export type ShopPolicy = Node & {
	__typename?: 'ShopPolicy';
	/** Policy text, maximum size of 64kb. */
	body: Scalars['String'];
	/** Policy’s handle. */
	handle: Scalars['String'];
	/** A globally-unique identifier. */
	id: Scalars['ID'];
	/** Policy’s title. */
	title: Scalars['String'];
	/** Public URL to the policy. */
	url: Scalars['URL'];
};

export type ShopPolicyWithDefault = {
	__typename?: 'ShopPolicyWithDefault';
	/** The text of the policy. Maximum size: 64KB. */
	body: Scalars['String'];
	/** The handle of the policy. */
	handle: Scalars['String'];
	/** The unique identifier of the policy. A default policy doesn't have an ID. */
	id?: Maybe<Scalars['ID']>;
	/** The title of the policy. */
	title: Scalars['String'];
	/** Public URL to the policy. */
	url: Scalars['URL'];
};

export type PaymentSettings = {
	__typename?: 'PaymentSettings';
	/** List of the card brands which the shop accepts. */
	acceptedCardBrands: Array<CardBrand>;
	/** The url pointing to the endpoint to vault credit cards. */
	cardVaultUrl: Scalars['URL'];
	/** The country where the shop is located. */
	countryCode: CountryCode;
	/** The three-letter code for the shop's primary currency. */
	currencyCode: CurrencyCode;
	/** A list of enabled currencies (ISO 4217 format) that the shop accepts. Merchants can enable currencies from their Shopify Payments settings in the Shopify admin. */
	enabledPresentmentCurrencies: Array<CurrencyCode>;
	/** The shop’s Shopify Payments account id. */
	shopifyPaymentsAccountId?: Maybe<Scalars['String']>;
	/** List of the digital wallets which the shop supports. */
	supportedDigitalWallets: Array<DigitalWallet>;
};

export type BrandColors = {
	__typename?: 'BrandColors';
	/** The shop's primary brand colors. */
	primary: Array<BrandColorGroup>;
	/** The shop's secondary brand colors. */
	secondary: Array<BrandColorGroup>;
};

/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export type CardBrand =
	/** American Express. */
	| 'AMERICAN_EXPRESS'
	/** Diners Club. */
	| 'DINERS_CLUB'
	/** Discover. */
	| 'DISCOVER'
	/** JCB. */
	| 'JCB'
	/** Mastercard. */
	| 'MASTERCARD'
	/** Visa. */
	| 'VISA';

export type BrandColorGroup = {
	__typename?: 'BrandColorGroup';
	/** The background color. */
	background?: Maybe<Scalars['Color']>;
	/** The foreground color. */
	foreground?: Maybe<Scalars['Color']>;
};

export type DigitalWallet =
	/** Android Pay. */
	| 'ANDROID_PAY'
	/** Apple Pay. */
	| 'APPLE_PAY'
	/** Google Pay. */
	| 'GOOGLE_PAY'
	/** Shopify Pay. */
	| 'SHOPIFY_PAY';

export type CustomerUpdatePayload = {
	__typename?: 'CustomerUpdatePayload';
	/** The updated customer object. */
	customer?: Maybe<Customer>;
	/**
	 * The newly created customer access token. If the customer's password is updated, all previous access tokens
	 * (including the one used to perform this mutation) become invalid, and a new token is generated.
	 *
	 */
	customerAccessToken?: Maybe<CustomerAccessToken>;
	/** The list of errors that occurred from executing the mutation. */
	customerUserErrors: Array<CustomerUserError>;
	/**
	 * The list of errors that occurred from executing the mutation.
	 * @deprecated Use `customerUserErrors` instead.
	 */
	userErrors: Array<UserError>;
};

export type CustomerUpdateInput = {
	/** Indicates whether the customer has consented to be sent marketing material via email. */
	acceptsMarketing?: InputMaybe<Scalars['Boolean']>;
	/** The customer’s email. */
	email?: InputMaybe<Scalars['String']>;
	/** The customer’s first name. */
	firstName?: InputMaybe<Scalars['String']>;
	/** The customer’s last name. */
	lastName?: InputMaybe<Scalars['String']>;
	/** The login password used by the customer. */
	password?: InputMaybe<Scalars['String']>;
	/**
	 * A unique phone number for the customer.
	 *
	 * Formatted using E.164 standard. For example, _+16135551111_. To remove the phone number, specify `null`.
	 *
	 */
	phone?: InputMaybe<Scalars['String']>;
};
