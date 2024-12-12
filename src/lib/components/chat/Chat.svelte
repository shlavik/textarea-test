<script lang="ts">
	import Avatar from "$lib/components/chat/Avatar.svelte";
	import Log from "$lib/components/chat/Log.svelte";
	import PromptArea from "$lib/components/chat/PromptArea.svelte";
	import Button from "$lib/components/ui/Button.svelte";
	import Icon from "$lib/components/ui/Icon.svelte";
	import { prompt, pushPrompt } from "$lib/stores";

	let promptAreaHeight: number = $state(0);
	let promptAreaInstance = $state<ReturnType<typeof PromptArea>>();

	let processing = false;

	function onkeydown(event: KeyboardEvent) {
		if (event.key !== "Enter" || event.shiftKey) return;
		event.preventDefault();
		if (!$prompt) return;
		pushPrompt();
		promptAreaInstance?.clear();
	}

	function onclick() {
		pushPrompt();
		promptAreaInstance?.clear();
	}
</script>

<div class="flex flex-grow flex-col pl-4 pr-4">
	<div
		class="flex-1 flex-grow space-y-4 pl-12 pr-4 pt-8"
		style:padding-bottom="calc({promptAreaHeight}px + 5rem)"
	>
		<Log />
	</div>

	<div
		class="pointer-events-none fixed bottom-0 left-0 right-2 mx-auto flex size-0 h-svh w-auto max-w-5xl flex-shrink-0 items-end gap-5 from-primary to-transparent p-4 pr-14 shadow-overlay"
	>
		<div class="us:block hidden">
			<Avatar />
		</div>

		<PromptArea
			{onkeydown}
			bind:height={promptAreaHeight}
			bind:this={promptAreaInstance}
		>
			<Button onclick={() => {}}><Icon name="text" /></Button>
			<Button onclick={() => {}}><Icon name="picture" /></Button>
			<Button onclick={() => {}}><Icon name="stop" /></Button>
			<Icon color="red" name="text" />
			<Icon color="red" name="picture" />
			<Icon color="red" name="picture-alt" />
			<Icon color="red" name="arrow" />
			<Icon color="red" name="stop" />

			{#snippet send()}
				<Button disabled={!$prompt} {onclick}>
					<Icon name="arrow" />
				</Button>
			{/snippet}
		</PromptArea>
	</div>
</div>
