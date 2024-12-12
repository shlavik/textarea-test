interface ScrollToBottomOptions {
	behavior?: ScrollBehavior;
	node?: HTMLElement;
	threshold?: number;
}

export function scrollToBottom({
	node = window.document.documentElement,
	behavior = "instant",
	threshold = 90,
}: ScrollToBottomOptions = {}) {
	const currentPosition = node.scrollTop + node.clientHeight;
	const totalHeight = node.scrollHeight;
	const scrollPercentage = (currentPosition / totalHeight) * 100;

	if (scrollPercentage < threshold) return;

	node.scrollTo({
		top: totalHeight,
		behavior,
	});
}
