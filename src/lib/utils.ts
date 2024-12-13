interface ScrollToBottomOptions {
	behavior?: ScrollBehavior;
	node?: HTMLElement;
	threshold?: number;
}

export function scrollToBottom({
	node = window.document.documentElement,
	behavior = "instant",
	threshold = 100,
}: ScrollToBottomOptions = {}) {
	const currentPosition = node.scrollTop + node.clientHeight;
	const totalHeight = node.scrollHeight;

	if (totalHeight - currentPosition > threshold) return;

	node.scrollTo({
		top: totalHeight,
		behavior,
	});
}
