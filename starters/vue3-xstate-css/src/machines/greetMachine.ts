import { createMachine, assign, type DoneInvokeEvent } from 'xstate';
import { fetchGreeting } from '../utils/fetchGreeting';

interface GreetContext {
	query: string;
	message: string;
	error: string;
}

export const greetMachine = (query: string) => {
	return createMachine(
		{
			id: 'greet',
			predictableActionArguments: true,
			schema: {
				context: {} as GreetContext,
				services: {} as {
					callFetchMessage: {
						data: { result: string };
					};
				},
			},
			initial: 'loading',
			context: {
				query,
				message: '',
				error: '',
			},
			states: {
				loading: {
					// Though having the invoke call here is set up exactly how the docs show, TypeScript insists on having an issue with it. The machine works as expected. I've made a copy of the machine exactly as is and set the XState and TS versions to match this kit in this Code Sandbox and the error does not appear, so my best guess is VS Code does not want to play nice: https://codesandbox.io/s/eager-hill-6wgmtx?file=/src/index.ts
					// @ts-expect-error
					invoke: {
						src: 'callFetchMessage',
						onDone: {
							target: 'complete',
							actions: assign<GreetContext, DoneInvokeEvent<string>>({
								message: (context, event) => event.data,
							}),
						},
						onError: {
							target: 'failure',
							actions: assign({
								error: (context, event) => event.data.message,
							}),
						},
					},
				},
				complete: {
					type: 'final',
				},
				failure: {
					type: 'final',
				},
			},
		},
		{
			services: {
				callFetchMessage: (context) => fetchGreeting(context.query),
			},
		}
	);
};
