type ConnectionEdges = {
	edges: {
		node: Array<unknown>;
	}[];
};
type ConnectionNodes = {
	nodes: Array<unknown>;
};
export function flattenConnection<T>(
	connection: ConnectionEdges | ConnectionNodes
) {
	if (!connection) {
		return [] as any;
	}
	if ('edges' in connection) {
		return connection.edges.map(edge => edge.node);
	} else if ('nodes' in connection) {
		return connection.nodes;
	} else {
		throw new Error('Invalid connection object');
	}
}
