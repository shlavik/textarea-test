<script module>
	import type { Snippet } from "svelte";

	export interface SpinnerProps {
		children?: Snippet;
	}
</script>

<script lang="ts">
	let { children }: SpinnerProps = $props();
</script>

<div class="relative flex h-14 w-14 items-center justify-center text-secondary">
	<svg
		class="absolute inset-0 m-auto"
		width="58"
		height="58"
		viewBox="0 0 58 58"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="29"
			cy="29"
			r="28.25"
			stroke="white"
			stroke-opacity="0.15"
			stroke-width="1.5"
		/>
		<path
			d="M29 0.75C32.7098 0.75 36.3834 1.48071 39.8108 2.9004C43.2383 4.3201 46.3525 6.40098 48.9758 9.02423C51.599 11.6475 53.6799 14.7617 55.0996 18.1892C56.5193 21.6166 57.25 25.2902 57.25 29"
			stroke="white"
			stroke-width="1.5"
		/>
	</svg>

	<div class="flex items-center justify-center">
		{@render children?.()}
	</div>
</div>

<style>
	svg {
		animation: spinner 1s linear infinite;
	}
	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
