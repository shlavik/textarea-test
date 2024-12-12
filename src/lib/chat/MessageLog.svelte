<script lang="ts">
	import { chatStore } from "$lib/stores.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	import Spinner from "$lib/ui/Spinner.svelte";
	import { text } from "@sveltejs/kit";
	import clsx from "clsx";

	$inspect(chatStore.isProcessing, chatStore.isResponding);
</script>

{#each chatStore.messages as { id, from, kind, content }, index (id)}
	{@const isUser = from === "user"}
	{@const isAI = from === "ai"}
	{@const isText = kind === "text"}
	{@const isImage = kind === "image"}
	{@const isLast = index === chatStore.messages.length - 1}
	{@const isLoading = isLast && from === "ai" && chatStore.isProcessing}
	<div class={isUser ? "text-right" : "text-left"}>
		<div
			class={clsx(
				"inline-block max-w-fit whitespace-pre-wrap rounded-lg p-2",
				isUser
					? "bg-secondary/80 text-darkness"
					: "bg-input-inactive text-secondary",
				isAI &&
					isImage &&
					"flex h-96 w-96 min-w-96 items-center justify-center",
			)}
		>
			{#if isLoading}
				{#if isText}
					<span>{content}</span>
				{:else if isImage}
					<Spinner>
						<Icon name={kind} />
					</Spinner>
				{/if}
			{:else if isText}
				<span>{content}</span>
			{:else if isImage}
				{#if isUser}
					<span>{content}</span>
				{:else if isAI}
					<picture class="">
						<img src={content} alt="" />
					</picture>
				{/if}
			{/if}
		</div>
	</div>
{/each}
