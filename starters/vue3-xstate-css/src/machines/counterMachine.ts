import { createMachine, assign } from 'xstate';

export const counterMachine = createMachine(
	{
		id: 'Counter',
		predictableActionArguments: true,
		schema: {
			context: {} as { count: number },
			events: {} as { type: 'INC' } | { type: 'DEC' } | { type: 'RESET' },
		},
		initial: 'active',
		context: {
			count: 0,
		},
		states: {
			active: {
				on: {
					INC: { actions: 'increment' },
					DEC: { actions: 'decrement' },
					RESET: { actions: 'reset' },
				},
			},
		},
	},
	{
		actions: {
			increment: assign({ count: (context) => context.count + 1 }),
			decrement: assign({ count: (context) => context.count - 1 }),
			reset: assign({ count: (context) => (context.count = 0) }),
		},
	}
);
