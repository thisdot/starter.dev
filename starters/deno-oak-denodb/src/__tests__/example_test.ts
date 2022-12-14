import { assertEquals } from '../../dev_deps.ts';

Deno.test('url test', () => {
	const url = new URL('./foo.js', 'https://deno.land/');
	assertEquals(url.href, 'https://deno.land/foo.js');
});
