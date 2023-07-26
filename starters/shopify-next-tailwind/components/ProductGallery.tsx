import cn from 'clsx';
import Image from 'next/image';

const ProductGallery = ({
	media,
	className,
}: {
	media: any['node'][];
	className?: string;
}) => {
	if (!media.length) {
		return null;
	}

	return (
		<div
			className={`swimlane md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 ${className}`}
		>
			{media.map((med, i) => {
				const isFirst = i === 0;
				const isFourth = i === 3;
				const isFullWidth = i % 3 === 0;

				const data = {
					...med,
					image: {
						...med.image,
						altText: med.alt || 'Product image',
					},
				};

				const style = [
					isFullWidth ? 'md:col-span-2' : 'md:col-span-1',
					isFirst || isFourth ? '' : 'md:aspect-[4/5]',
					'aspect-square snap-center card-image bg-white dark:bg-contrast/10 w-mobileGallery md:w-full',
				].join(' ');

				return (
					<div className={style} key={med.id || med.image.id}>
						{med.image && (
							<Image
								alt={med.alt}
								loading={i === 0 ? 'eager' : 'lazy'}
								src={data.image.url!}
								width={data.image.width}
								height={data.image.height}
								sizes={
									isFirst || isFourth
										? '(min-width: 48em) 60vw, 90vw'
										: '(min-width: 48em) 30vw, 90vw'
								}
								className={cn(
									'object-cover w-full h-full aspect-square fadeIn',
									{ 'aspect-[4/5]': !isFirst && !isFourth }
								)}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default ProductGallery;
