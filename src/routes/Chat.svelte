<script lang="ts">
	import Avatar from "$lib/chat/Avatar.svelte";
	import Messages from "$lib/chat/MessageLog.svelte";
	import ModeSelector from "$lib/chat/ModeSelector.svelte";
	import PromptArea from "$lib/chat/PromptArea.svelte";
	import { chatStore, stop, submit } from "$lib/stores.svelte";
	import Button from "$lib/ui/Button.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	import { scrollToBottom } from "$lib/utils";

	let promptAreaBlockHeight: number = $state(0);
	let promptAreaScrollHeight: number = $state(0);

	$effect(() => {
		scrollToBottom({ threshold: promptAreaBlockHeight });
	});

	$effect(() => {
		if (!chatStore.isProcessing) return;
		scrollToBottom({
			behavior: "smooth",
			threshold: promptAreaBlockHeight + promptAreaScrollHeight + 400,
		});
	});
</script>

<div class="flex flex-grow flex-col pl-4 pr-4">
	<div style:padding-bottom="calc({promptAreaBlockHeight}px + 3rem)">
		<Messages />
	</div>

	<div
		class="pointer-events-none fixed bottom-0 left-2 right-0 m-auto flex h-svh max-w-5xl items-end gap-5 p-8 pb-4 shadow-overlay"
	>
		<div class="hidden us:block">
			<Avatar role="ai" />
		</div>

		<PromptArea
			bind:blockHeight={promptAreaBlockHeight}
			bind:scrollHeight={promptAreaScrollHeight}
		>
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

		<div class="hidden us:block">
			<Avatar role="user" />
		</div>
	</div>
</div>
