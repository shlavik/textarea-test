interface AutoresizeOptions {
	maxRows?: number;
}

export function autoresize(
	node: HTMLTextAreaElement,
	options?: AutoresizeOptions,
) {
	let maxRows = options?.maxRows || Infinity;
	let lastHeight = node.scrollHeight;

	const updateHeight = () => {
		node.style.height = "auto";
		const maxHeight = parseInt(getComputedStyle(node).lineHeight) * maxRows;
		const newHeight = Math.min(node.scrollHeight, maxHeight);
		node.style.height = newHeight + "px";
		node.style.overflowY = node.scrollHeight > newHeight ? "auto" : "hidden";
		if (newHeight === lastHeight) return;
		lastHeight = newHeight;
		node.dispatchEvent(
			new CustomEvent("autoresize", { detail: { height: newHeight } }),
		);
	};

	const handlePaste = () => setTimeout(updateHeight);

	node.addEventListener("change", updateHeight);
	node.addEventListener("paste", handlePaste);

	const resizeObserver = new ResizeObserver(updateHeight);
	resizeObserver.observe(node);

	return {
		update: (newOptions?: AutoresizeOptions) => {
			if (newOptions?.maxRows !== maxRows) {
				maxRows = newOptions?.maxRows || Infinity;
				updateHeight();
			}
		},
		destroy: () => {
			node.removeEventListener("change", updateHeight);
			node.removeEventListener("paste", handlePaste);
			resizeObserver.disconnect();
		},
	};
}
