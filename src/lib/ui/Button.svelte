<script module>
	import type { Snippet } from "svelte";

	export type ButtonVariant = "light" | "dark" | "transparent";
	export type ButtonSize = "icon" | "text";

	export interface ButtonProps {
		variant?: ButtonVariant;
		text?: string;
		size?: ButtonSize;
		title?: string;
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import clsx from "clsx";

	let {
		variant = "light",
		text,
		size,
		title,
		disabled = false,
		onclick,
		children,
	}: ButtonProps = $props();

	const BASE_CLASSES =
		"flex items-center justify-center text-pretty rounded-full text-sm transition-colors duration-200";

	const VARIANT_CLASSES = {
		light: "bg-button-light text-darkness hover:bg-secondary/80",
		dark: "bg-button text-secondary hover:bg-secondary/20",
		transparent: "bg-transparent text-secondary hover:bg-button-dark",
	} as const;

	const SIZE_CLASSES = {
		icon: "w-10 h-10 p-2",
		text: "h-10 px-3 py-2",
	} as const;

	function handleClick(event: MouseEvent) {
		if (!disabled) onclick?.(event);
	}

	let sizeKey = $derived<ButtonSize>(size || text ? "text" : "icon");
</script>

<button
	class={clsx(
		BASE_CLASSES,
		VARIANT_CLASSES[variant],
		SIZE_CLASSES[sizeKey],
		disabled && "cursor-not-allowed opacity-50",
	)}
	{title}
	{disabled}
	onclick={handleClick}
>
	{@render children?.()}

	{#if text}
		<span class={clsx("text-nowrap", children && "pl-2")}>{text}</span>
	{/if}
</button>
