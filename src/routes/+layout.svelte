<script lang="ts">
	import { log } from "$lib/stores";
	import type { Snippet } from "svelte";
	import "../app.css";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let mainElement: HTMLElement;

	$effect(() => {
		$log;
		mainElement?.scrollTo({
			top: mainElement.scrollHeight,
			behavior: "smooth",
		});
	});
</script>

<main
	class="flex min-h-screen items-center justify-center overflow-x-hidden overflow-y-scroll pl-2"
	bind:this={mainElement}
>
	{@render children()}
</main>
