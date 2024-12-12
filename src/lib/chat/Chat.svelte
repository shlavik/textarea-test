<script lang="ts">
	import Avatar from "$lib/chat/Avatar.svelte";
	import Messages from "$lib/chat/MessageLog.svelte";
	import ModeSelector from "$lib/chat/ModeSelector.svelte";
	import PromptArea from "$lib/chat/PromptArea.svelte";
	import { chatStore, stop, submit } from "$lib/stores.svelte";
	import Button from "$lib/ui/Button.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	import { scrollToBottom } from "$lib/utils";

	let promptAreaHeight: number = $state(0);

	$effect(() => {
		promptAreaHeight;
		scrollToBottom();
	});

	$effect(() => {
		if (chatStore.isProcessing || chatStore.isResponding) {
			scrollToBottom({ behavior: "smooth", threshold: 0 });
		}
	});
</script>

<div class="flex flex-grow flex-col pl-4 pr-4">
	<div
		class="flex-1 flex-grow space-y-4 pl-12 pr-4 pt-16"
		style:padding-bottom="calc({promptAreaHeight}px + 5rem)"
	>
		<Messages />
	</div>

	<div
		class="pointer-events-none fixed bottom-0 left-0 right-2 mx-auto flex size-0 h-svh w-auto max-w-5xl flex-shrink-0 items-end gap-5 p-4 pr-14 shadow-overlay"
	>
		<div class="hidden us:block">
			<Avatar />
		</div>

		<PromptArea bind:height={promptAreaHeight}>
			<ModeSelector />

			{#snippet send()}
				<Button
					disabled={!chatStore.isProcessing && !chatStore.canSubmit}
					onclick={chatStore.isProcessing ? stop : submit}
				>
					<Icon name={chatStore.isProcessing ? "stop" : "arrow"} />
				</Button>
			{/snippet}
		</PromptArea>
	</div>
</div>
