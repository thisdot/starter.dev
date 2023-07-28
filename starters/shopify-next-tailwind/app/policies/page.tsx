import { Link } from '@/components/Link';
import { PageHeader, Section, Heading } from '@/components/Text';
import { getPolicies } from '@/lib/shopify';

export default async function Policies() {
	const data = await getPolicies();
	const policies = Object.values(data.body.data.shop || {});

	return (
		<>
			<PageHeader heading="Policies" />
			<Section padding="x" className="mb-24">
				{policies.map(policy => {
					return (
						policy && (
							<Heading className="font-normal text-heading" key={policy.id}>
								<Link href={`/policies/${policy.handle}`}>{policy.title}</Link>
							</Heading>
						)
					);
				})}
			</Section>
		</>
	);
}
