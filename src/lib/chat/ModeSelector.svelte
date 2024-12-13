<script lang="ts">
	import type { ChatMode } from "$lib/stores.svelte";
	import Button, { type ButtonProps } from "$lib/ui/Button.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	import { chatStore, setMode } from "$lib/stores.svelte";

	function getButtonProps(
		mode: ChatMode,
		text: string = "",
	): Partial<ButtonProps> {
		return {
			title: text,
			disabled: chatStore.isProcessing,
			...(chatStore.mode === mode
				? {
						variant: "dark",
						text,
					}
				: {
						variant: "transparent",
						text: "",
					}),
			onclick: () => setMode(mode),
		};
	}
</script>

<Button {...getButtonProps("text", "Create text")}>
	<Icon name="text" />
</Button>

<Button {...getButtonProps("image", "Create image")}>
	<Icon name="image" />
</Button>
