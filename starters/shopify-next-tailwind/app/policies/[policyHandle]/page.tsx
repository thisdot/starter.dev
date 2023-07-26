import { Button } from '@/components/Button';
import { Section, PageHeader } from '@/components/Text';
import { getPolicyContent } from '@/lib/shopify';

export default async function Policy({
	params,
}: {
	params: { policyHandle: string };
}) {
	const handle = params.policyHandle;

	const policyName = handle.replace(/-([a-z])/g, (_: unknown, m1: string) =>
		m1.toUpperCase()
	);

	const data = await getPolicyContent({ policyName });
	const policy = data.body.data.shop?.[policyName];

	return (
		<Section
			padding="all"
			display="flex"
			className="flex-col items-baseline w-full gap-8 md:flex-row"
		>
			<PageHeader
				heading={policy?.title}
				className="grid items-start flex-grow gap-4 md:sticky top-36 md:w-5/12"
			>
				<Button
					className="justify-self-start"
					variant="inline"
					to={'/policies'}
				>
					&larr; Back to Policies
				</Button>
			</PageHeader>
			<div className="flex-grow w-full md:w-7/12">
				<div
					dangerouslySetInnerHTML={{ __html: policy?.body || '' }}
					className="prose dark:prose-invert"
				/>
			</div>
		</Section>
	);
}
