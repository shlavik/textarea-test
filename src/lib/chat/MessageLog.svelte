<script lang="ts">
	import { chatStore } from "$lib/stores.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	import Spinner from "$lib/ui/Spinner.svelte";
	import clsx from "clsx";
</script>

<div class="flex-1 flex-grow space-y-3">
	{#each chatStore.messages as { id, from, kind, content }, index (id)}
		{@const isUser = from === "user"}
		{@const isAI = from === "ai"}
		{@const isText = kind === "text"}
		{@const isImage = kind === "image"}
		{@const isLast = index === chatStore.messages.length - 1}
		{@const isLoading = isLast && from === "ai" && chatStore.isProcessing}
		<div
			class={clsx(
				"break-words",
				isUser ? "ml-16 text-right" : "mr-16 text-left",
			)}
			style="overflow-wrap: anywhere"
		>
			<div
				class={clsx(
					"inline-block rounded-xl p-2",
					isUser
						? "bg-secondary/80 text-darkness"
						: "bg-input-inactive text-secondary",
					isAI &&
						isImage &&
						"flex aspect-square w-full min-w-0 max-w-96 shrink items-center justify-center",
				)}
			>
				{#if isLoading}
					{#if isText}
						<span>{content}</span>
					{:else if isImage}
						<div class="flex w-full items-center justify-center">
							<Spinner>
								<Icon name="image-alt" />
							</Spinner>
						</div>
					{/if}
				{:else if isText}
					<span>{content}</span>
				{:else if isImage}
					{#if isUser}
						<span>{content}</span>
					{:else if isAI}
						<picture class="overflow-hidden rounded-lg">
							<img src={content} alt="" />
						</picture>
					{/if}
				{/if}
			</div>
		</div>
	{/each}
</div>
