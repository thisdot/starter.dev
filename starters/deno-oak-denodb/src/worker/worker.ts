import { generateThumbnails } from './generate_thumbnails.ts';

self.onmessage = async (event) => {
	console.log('Image processing worker received a new message', event.data)
  const { imageUrl } = event.data;
	await generateThumbnails(imageUrl);
	self.close();
}
