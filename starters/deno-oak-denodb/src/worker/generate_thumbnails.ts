import { resize } from 'https://deno.land/x/deno_image@v0.0.2/index.ts';
import { createHash } from 'https://deno.land/std@0.104.0/hash/mod.ts';

export async function generateThumbnails(imageUrl: string): Promise<void> {
	const imageResponse = await fetch(imageUrl);
	const imageBufferArray = new Uint8Array(await imageResponse.arrayBuffer())

	for (const size of [75, 100, 125, 150, 200]) {
		const img = await resize(imageBufferArray, {
			width: size,
			height: size,
		});

		const imageUrlHash = createHash("sha1").update(imageUrl).toString();

		Deno.writeFileSync(`./public/images/${imageUrlHash}-${size}x${size}.png`, img);
	}
}
