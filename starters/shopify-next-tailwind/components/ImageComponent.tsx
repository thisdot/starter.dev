import * as React from 'react';
import type { PartialDeep } from 'type-fest';
import type { Image as ImageType } from '@/lib/shopify/types';
type SrcSetOptions = {
	intervals: number;
	startingWidth: number;
	incrementSize: number;
	placeholderWidth: number;
};
type HtmlImageProps = React.DetailedHTMLProps<
	React.ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;
export type LoaderParams = {
	/** The base URL of the image */
	src?: ImageType['url'];
	/** The URL param that controls width */
	width?: number;
	/** The URL param that controls height */
	height?: number;
	/** The URL param that controls the cropping region */
	crop?: Crop;
};
export type Loader = (params: LoaderParams) => string;
/** Legacy type for backwards compatibility *
 * @deprecated Use `crop`, `width`, `height`, and `src` props, and/or `data` prop. Or pass a custom `loader` with `LoaderParams` */
export type ShopifyLoaderOptions = {
	/** The base URL of the image */
	src?: ImageType['url'];
	/** The URL param that controls width */
	width?: HtmlImageProps['width'] | ImageType['width'];
	/** The URL param that controls height */
	height?: HtmlImageProps['height'] | ImageType['height'];
	/** The URL param that controls the cropping region */
	crop?: Crop;
};
type Crop = 'center' | 'top' | 'bottom' | 'left' | 'right';
export type HydrogenImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
	/** The aspect ratio of the image, in the format of `width/height`.
	 *
	 * @example
	 * ```
	 * <Image data={productImage} aspectRatio="4/5" />
	 * ```
	 */
	aspectRatio?: string;
	/** The crop position of the image.
	 *
	 * @remarks
	 * In the event that AspectRatio is set, without specifying a crop,
	 * the Shopify CDN won't return the expected image.
	 *
	 * @defaultValue `center`
	 */
	crop?: Crop;
	/** Data mapping to the Storefront API `Image` object. Must be an Image object.
	 * Optionally, import the `IMAGE_FRAGMENT` to use in your GraphQL queries.
	 *
	 * @example
	 * ```
	 * import {IMAGE_FRAGMENT, Image} from '@shopify/hydrogen';
	 *
	 * export const IMAGE_QUERY = `#graphql
	 * ${IMAGE_FRAGMENT}
	 * query {
	 *   product {
	 *     featuredImage {
	 *       ...Image
	 *     }
	 *   }
	 * }`
	 *
	 * <Image
	 *   data={productImage}
	 *   sizes="(min-width: 45em) 50vw, 100vw"
	 *   aspectRatio="4/5"
	 * />
	 * ```
	 *
	 * Image: {@link https://shopify.dev/api/storefront/reference/common-objects/image}
	 */
	data?: PartialDeep<
		ImageType,
		{
			recurseIntoArrays: true;
		}
	>;
	key?: React.Key;
	/** A function that returns a URL string for an image.
	 *
	 * @remarks
	 * By default, this uses Shopify’s CDN {@link https://cdn.shopify.com/} but you can provide
	 * your own function to use a another provider, as long as they support URL based image transformations.
	 */
	loader?: Loader;
	/** An optional prop you can use to change the default srcSet generation behaviour */
	srcSetOptions?: SrcSetOptions;
	/** @deprecated Autocalculated, use only `width` prop, or srcSetOptions */
	widths?: (HtmlImageProps['width'] | ImageType['width'])[];
};
/**
 * A Storefront API GraphQL fragment that can be used to query for an image.
 */
export declare const IMAGE_FRAGMENT =
	'#graphql\n  fragment Image on Image {\n    altText\n    url\n    width\n    height\n  }\n';
/**
 * Hydrogen’s Image component is a wrapper around the HTML image element.
 * It supports the same props as the HTML `img` element, but automatically
 * generates the srcSet and sizes attributes for you. For most use cases,
 * you’ll want to set the `aspectRatio` prop to ensure the image is sized
 * correctly.
 *
 * @remarks
 * - `decoding` is set to `async` by default.
 * - `loading` is set to `lazy` by default.
 * - `alt` will automatically be set to the `altText` from the Storefront API if passed in the `data` prop
 * - `src` will automatically be set to the `url` from the Storefront API if passed in the `data` prop
 *
 * @example
 * A responsive image with a 4:5 aspect ratio:
 * ```
 * <Image
 *   data={product.featuredImage}
 *   aspectRatio="4/5"
 *   sizes="(min-width: 45em) 40vw, 100vw"
 * />
 * ```
 * @example
 * A fixed size image:
 * ```
 * <Image
 *   data={product.featuredImage}
 *   width={100}
 *   height={100}
 * />
 * ```
 *
 * {@link https://shopify.dev/docs/api/hydrogen-react/components/image}
 */
export declare const Image: React.ForwardRefExoticComponent<
	React.ImgHTMLAttributes<HTMLImageElement> & {
		/** The aspect ratio of the image, in the format of `width/height`.
		 *
		 * @example
		 * ```
		 * <Image data={productImage} aspectRatio="4/5" />
		 * ```
		 */
		aspectRatio?: string;
		/** The crop position of the image.
		 *
		 * @remarks
		 * In the event that AspectRatio is set, without specifying a crop,
		 * the Shopify CDN won't return the expected image.
		 *
		 * @defaultValue `center`
		 */
		crop?: Crop;
		/** Data mapping to the Storefront API `Image` object. Must be an Image object.
		 * Optionally, import the `IMAGE_FRAGMENT` to use in your GraphQL queries.
		 *
		 * @example
		 * ```
		 * import {IMAGE_FRAGMENT, Image} from '@shopify/hydrogen';
		 *
		 * export const IMAGE_QUERY = `#graphql
		 * ${IMAGE_FRAGMENT}
		 * query {
		 *   product {
		 *     featuredImage {
		 *       ...Image
		 *     }
		 *   }
		 * }`
		 *
		 * <Image
		 *   data={productImage}
		 *   sizes="(min-width: 45em) 50vw, 100vw"
		 *   aspectRatio="4/5"
		 * />
		 * ```
		 *
		 * Image: {@link https://shopify.dev/api/storefront/reference/common-objects/image}
		 */
		data?:
			| import('type-fest/source/partial-deep.js').PartialObjectDeep<
					ImageType,
					{
						recurseIntoArrays: true;
					}
			  >;
		key?: React.Key;
		/** A function that returns a URL string for an image.
		 *
		 * @remarks
		 * By default, this uses Shopify’s CDN {@link https://cdn.shopify.com/} but you can provide
		 * your own function to use a another provider, as long as they support URL based image transformations.
		 */
		loader?: Loader;
		/** An optional prop you can use to change the default srcSet generation behaviour */
		srcSetOptions?: SrcSetOptions;
		/** @deprecated Autocalculated, use only `width` prop, or srcSetOptions */
		widths?: (string | undefined)[];
	} & React.RefAttributes<HTMLImageElement>
>;
/**
 * The shopifyLoader function is a simple utility function that takes a src, width,
 * height, and crop and returns a string that can be used as the src for an image.
 * It can be used with the Hydrogen Image component or with the next/image component.
 * (or any others that accept equivalent configuration)
 * @param src - The source URL of the image, e.g. `https://cdn.shopify.com/static/sample-images/garnished.jpeg`
 * @param width - The width of the image, e.g. `100`
 * @param height - The height of the image, e.g. `100`
 * @param crop - The crop of the image, e.g. `center`
 * @returns A Shopify image URL with the correct query parameters, e.g. `https://cdn.shopify.com/static/sample-images/garnished.jpeg?width=100&height=100&crop=center`
 *
 * @example
 * ```
 * shopifyLoader({
 *   src: 'https://cdn.shopify.com/static/sample-images/garnished.jpeg',
 *   width: 100,
 *   height: 100,
 *   crop: 'center',
 * })
 * ```
 */
export declare function shopifyLoader({
	src,
	width,
	height,
	crop,
}: LoaderParams): string;
/**
 * This function generates a srcSet for Shopify images.
 * @param src - The source URL of the image, e.g. https://cdn.shopify.com/static/sample-images/garnished.jpeg
 * @param sizesArray - An array of objects containing the `width`, `height`, and `crop` of the image, e.g. [\{width: 200, height: 200, crop: 'center'\}, \{width: 400, height: 400, crop: 'center'\}]
 * @param loader - A function that takes a Shopify image URL and returns a Shopify image URL with the correct query parameters
 * @returns A srcSet for Shopify images, e.g. 'https://cdn.shopify.com/static/sample-images/garnished.jpeg?width=200&height=200&crop=center 200w, https://cdn.shopify.com/static/sample-images/garnished.jpeg?width=400&height=400&crop=center 400w'
 */
export declare function generateSrcSet(
	src?: string,
	sizesArray?: Array<{
		width?: number;
		height?: number;
		crop?: Crop;
	}>,
	loader?: Loader
): string;
/**
 * This function generates an array of sizes for Shopify images, for both fixed and responsive images.
 * @param width - The CSS width of the image
 * @param intervals - The number of intervals to generate
 * @param startingWidth - The starting width of the image
 * @param incrementSize - The size of each interval
 * @returns An array of widths
 */
export declare function generateImageWidths(
	width: string | number | undefined,
	intervals: number,
	startingWidth: number,
	incrementSize: number
): number[];
/**
 * Simple utility function to convert an aspect ratio CSS string to a decimal, currently only supports values like `1/1`, not `0.5`, or `auto`
 * @param aspectRatio - The aspect ratio of the image, e.g. `1/1`
 * @returns The aspect ratio as a number, e.g. `0.5`
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio}
 */
export declare function parseAspectRatio(
	aspectRatio?: string
): number | undefined;
export declare function generateSizes(
	imageWidths?: number[],
	aspectRatio?: string,
	crop?: Crop
):
	| {
			width: number;
			height: number | undefined;
			crop: Crop;
	  }[]
	| undefined;
export {};
