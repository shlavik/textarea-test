import { createMachine, createActor, assign, fromPromise } from "xstate";
import { chatAPI } from "$lib/api";

export type ChatPhase = "idle" | "processing" | "responding";
export type ChatMode = "text" | "image";
export type MessageFrom = "user" | "ai";

export interface ChatMessage {
	id: string;
	from: MessageFrom;
	kind: ChatMode;
	content: string;
	timestamp: number;
}

export interface ChatContext {
	prompt: string;
	mode: ChatMode | null;
	messages: ChatMessage[];
	abortController: AbortController | null;
}

export type ChatEvents =
	| { type: "SET_PROMPT"; prompt: string }
	| { type: "SET_MODE"; mode: ChatMode }
	| { type: "SUBMIT" }
	| { type: "STOP" }
	| { type: "RESET" };

const chatMachine = createMachine(
	{
		id: "chat",
		types: {
			context: {} as ChatContext,
			events: {} as ChatEvents,
		},
		initial: "idle",
		context: {
			prompt: "",
			mode: null,
			messages: [],
			abortController: null,
		},
		states: {
			idle: {
				entry: assign({
					abortController: () => null,
				}),
				on: {
					SET_PROMPT: {
						actions: assign({
							prompt: ({ event }) => event?.prompt || "",
						}),
					},
					SET_MODE: {
						actions: assign({
							mode: ({ event }) => event?.mode || "text",
						}),
					},
					SUBMIT: {
						guard: ({ context }) => context.prompt.trim().length > 0,
						target: "processing",
						actions: assign({
							messages: ({ context }) => [
								...context.messages,
								{
									id: crypto.randomUUID(),
									from: "user" as MessageFrom,
									kind: context.mode || "text",
									content: context.prompt,
									timestamp: Date.now(),
								},
							],
							prompt: () => "",
							abortController: () => new AbortController(),
						}),
					},
					RESET: {
						actions: assign({
							prompt: () => "",
							messages: () => [],
						}),
					},
				},
			},
			processing: {
				entry: assign({
					messages: ({ context }) => [
						...context.messages,
						{
							id: "placeholder",
							from: "ai" as MessageFrom,
							kind: context.mode || "text",
							content: "...",
							timestamp: Date.now(),
						},
					],
				}),
				invoke: {
					src: fromPromise(
						async ({ input }: { input: { context: ChatContext } }) => {
							const { context } = input;
							const lastUserMessage = context.messages
								.filter((msg) => msg.from === "user")
								.at(-1) as ChatMessage;
							return chatAPI.generateResponse(
								lastUserMessage.content,
								context.mode || "text",
								context.abortController!.signal,
							);
						},
					),
					input: ({ context }) => ({ context }),
					onDone: {
						target: "responding",
						actions: assign({
							messages: ({ context, event }) => [
								...context.messages.filter((msg) => msg.id !== "placeholder"),
								{
									id: crypto.randomUUID(),
									from: "ai" as MessageFrom,
									kind: context.mode || "text",
									content: event.output,
									timestamp: Date.now(),
								},
							],
						}),
					},
					onError: {
						target: "idle",
						actions: [
							({ event }) => {
								const error = event.error;
								if (error instanceof Error && error.name !== "AbortError") {
									console.error("Error generating response:", error);
								}
							},
							assign({
								messages: ({ context }) =>
									context.messages.filter((msg) => msg.id !== "placeholder"),
							}),
						],
					},
				},
				on: {
					SET_PROMPT: {
						actions: assign({
							prompt: ({ event }) => {
								if (!event) return "";
								return "prompt" in event ? event.prompt : "";
							},
						}),
					},
					SET_MODE: {
						actions: assign({
							mode: ({ event }) => {
								if (!event) return "text";
								return "mode" in event ? event.mode : "text";
							},
						}),
					},
					STOP: {
						target: "idle",
						actions: [
							({ context }) => {
								context.abortController?.abort();
							},
							assign(({ context }) => {
								const messages = context.messages.filter(
									(msg) => msg.id !== "placeholder",
								);
								const lastMessage = messages.at(-1);
								return {
									prompt: lastMessage?.content || "",
									messages: messages.slice(0, -1),
								};
							}),
						],
					},
				},
			},
			responding: {
				on: {
					SET_PROMPT: {
						actions: assign({
							prompt: ({ event }) => {
								if (!event) return "";
								return "prompt" in event ? event.prompt : "";
							},
						}),
					},
					SET_MODE: {
						actions: assign({
							mode: ({ event }) => {
								if (!event) return "text";
								return "mode" in event ? event.mode : "text";
							},
						}),
					},
				},
				after: {
					RESPONDING_DELAY: "idle",
				},
			},
		},
	},
	{
		delays: {
			RESPONDING_DELAY: 1000,
		},
	},
);

const actor = createActor(chatMachine).start();

export const chatStore = $state({
	current: actor.getSnapshot().value as ChatPhase,
	prompt: actor.getSnapshot().context.prompt,
	mode: actor.getSnapshot().context.mode,
	messages: actor.getSnapshot().context.messages,
	canSubmit: false,
	canStop: false,
	isProcessing: false,
	isResponding: false,
});

actor.subscribe((snapshot) => {
	chatStore.current = snapshot.value as ChatPhase;
	chatStore.prompt = snapshot.context.prompt;
	chatStore.mode = snapshot.context.mode;
	chatStore.messages = snapshot.context.messages;
	chatStore.canSubmit =
		snapshot.can({ type: "SUBMIT" }) &&
		snapshot.context.prompt.trim().length > 0;
	chatStore.canStop = snapshot.can({ type: "STOP" });
	chatStore.isProcessing = snapshot.value === "processing";
	chatStore.isResponding = snapshot.value === "responding";
});

const send = (event: ChatEvents) => actor.send(event);

export const setPrompt = (prompt: string) =>
	send({ type: "SET_PROMPT", prompt });
export const setMode = (mode: ChatMode) => send({ type: "SET_MODE", mode });
export const submit = () => send({ type: "SUBMIT" });
export const stop = () => send({ type: "STOP" });
export const reset = () => send({ type: "RESET" });
