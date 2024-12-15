import { HTMLTextareaAttributes } from "svelte/elements";

declare module "svelte/elements" {
	export interface HTMLTextareaAttributes {
		onscrollheight?: (e: { detail: { scrollHeight: number } }) => {};
	}
}

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
