import { writable, get } from "svelte/store";

interface Message {
	text: string;
}

export let prompt = writable<string>("");
export let log = writable<Message[]>([{ text: "abc" }]);

export function pushPrompt() {
	log.update(($log) => [...$log, { text: get(prompt) }]);
	prompt.set("");
}
