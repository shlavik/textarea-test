<script>
	import ai from "$lib/images/ai.png";
	import aiFallback from "$lib/images/ai.png";
</script>

<div
	class="pointer-events-auto flex w-16 rounded-full hover:mix-blend-color-dodge"
>
	<picture class="scale-[2]">
		<source srcset={ai} type="image/webp" />
		<img src={aiFallback} alt="AI avatar" />
	</picture>
</div>
