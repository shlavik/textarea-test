import type { ChatMode } from "$lib/stores.svelte";

const TEXT_RESPONSES = [
	"That's an interesting question! Let's analyze...",
	"In my opinion...",
	"If we look at this in more detail...",
	"I can say the following...",
	"Based on the available data...",
];

const IMAGE_URLS = [
	"/images/gen1.jpg",
	"/images/gen2.jpg",
	"/images/gen3.jpg",
	"/images/gen4.jpg",
];

const getRandomItem = <T>(arr: T[]): T => {
	return arr[Math.floor(Math.random() * arr.length)];
};

interface ChatAPI {
	generateResponse(
		prompt: string,
		mode: ChatMode,
		signal?: AbortSignal,
	): Promise<string>;
}

class MockChatAPI implements ChatAPI {
	async generateResponse(
		prompt: string,
		mode: ChatMode,
		signal?: AbortSignal,
	): Promise<string> {
		const delay = mode === "text" ? 400 : 4000;

		await new Promise((resolve, reject) => {
			const timeout = setTimeout(resolve, delay);

			if (!signal) return;

			signal.addEventListener("abort", () => {
				clearTimeout(timeout);
				reject(new DOMException("Aborted", "AbortError"));
			});
		});

		if (mode === "image") {
			return getRandomItem(IMAGE_URLS);
		} else {
			return getRandomItem(TEXT_RESPONSES);
		}
	}
}

export const chatAPI = new MockChatAPI();
