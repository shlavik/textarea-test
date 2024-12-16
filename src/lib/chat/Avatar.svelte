<script lang="ts">
	import aiFallback from "$lib/images/ai.png";
	import ai from "$lib/images/ai.webp";
	import userFallback from "$lib/images/user.png";
	import user from "$lib/images/user.webp";

	interface AvatarProps {
		role?: "user" | "ai";
		processing?: boolean;
		key?: string | number;
	}

	let { role = "ai", processing = false, key }: AvatarProps = $props();

	let isAI = $derived(role === "ai");
</script>

{#key key}
	<div
		class="pointer-events-auto flex w-16 rounded-full hover:mix-blend-color-dodge hover:backdrop-contrast-50"
		class:animate-flicker={processing}
		class:animate-flicker-once={key}
	>
		<picture
			class="overflow-hidden rounded-full"
			class:scale-[2]={isAI}
			class:shadow-user={!isAI}
		>
			<source srcset={isAI ? ai : user} type="image/webp" />
			<img src={isAI ? aiFallback : userFallback} alt="AI avatar" />
		</picture>
	</div>
{/key}
