export function truncate(str: string, num = 155): string {
	if (typeof str !== 'string') return '';
	if (str.length <= num) {
		return str;
	}
	return str.slice(0, num - 3) + '...';
}
