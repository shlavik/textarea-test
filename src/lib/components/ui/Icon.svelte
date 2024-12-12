<script lang="ts">
	export type IconName = "arrow" | "stop" | "text" | "picture" | "picture-alt";

	interface IconProps {
		name: IconName;
		size?: string | number;
		color?: string;
	}

	let { name, size, color = "currentColor" }: IconProps = $props();

	const icons: Record<IconName, string> = {
		arrow: `<path d="M9.99976 4.1665L9.99976 16.6665" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.83325 7.50001L9.41066 3.9226C9.68844 3.64482 9.82733 3.50593 9.99992 3.50593C10.1725 3.50593 10.3114 3.64482 10.5892 3.9226L14.1666 7.50001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
		stop: `<rect x="3" y="3" width="14" height="14" rx="2.8" fill="currentColor"/>`,
		text: `<path d="M3 4.16667L13 4.16667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10L16.33 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 15.8333L9.67 15.8333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
		picture: `<circle cx="6.25" cy="6.25128" r="1.25" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.08337 10.0013C2.08337 6.26934 2.08337 4.40336 3.24274 3.24399C4.40211 2.08463 6.26809 2.08463 10 2.08463C13.732 2.08463 15.598 2.08463 16.7573 3.24399C17.9167 4.40336 17.9167 6.26934 17.9167 10.0013C17.9167 13.7332 17.9167 15.5992 16.7573 16.7586C15.598 17.918 13.732 17.918 10 17.918C6.26809 17.918 4.40211 17.918 3.24274 16.7586C2.08337 15.5992 2.08337 13.7332 2.08337 10.0013Z" stroke="currentColor" stroke-width="1.25"/><path d="M4.16675 17.5012C7.81046 13.1471 11.8951 7.40462 17.9146 11.2866" stroke="currentColor" stroke-width="1.25"/>`,
		"picture-alt": `<path d="M2.08 10C2.08 6.27 2.08 4.4 3.24 3.24C4.4 2.08 6.27 2.08 10 2.08C13.73 2.08 15.6 2.08 16.76 3.24C17.92 4.4 17.92 6.27 17.92 10C17.92 13.73 17.92 15.6 16.76 16.76C15.6 17.92 13.73 17.92 10 17.92C6.27 17.92 4.4 17.92 3.24 16.76C2.08 15.6 2.08 13.73 2.08 10Z" stroke="currentColor" stroke-width="1.25"/><circle cx="13.75" cy="6.25" r="1.25" stroke="currentColor" stroke-width="1.25"/><path d="M13.33 18.33C12.82 16.48 11.61 14.82 9.9 13.61C8.05 12.31 5.73 11.62 3.35 11.67C3.06 11.67 2.78 11.68 2.5 11.7" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/><path d="M10.83 15C12.25 13.89 13.78 13.33 15.32 13.33C16.2 13.33 17.07 13.52 17.92 13.88" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"/>`,
	} as const;

	const sizes = {
		xs: 16,
		sm: 20,
		md: 24,
		lg: 32,
		xl: 40,
	} as const;

	let computedSize = $derived(sizes[size as keyof typeof sizes] || size || 20);
</script>

<svg
	{color}
	width={computedSize}
	height={computedSize}
	viewBox="0 0 20 20"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	{@html icons[name]}
</svg>
