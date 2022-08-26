const copy = async (e: MouseEvent): Promise<void> => {
  if (e.target instanceof HTMLElement) {
    const parent = e.target.parentElement;
    if (parent instanceof HTMLElement) {
      const code = parent.querySelector("code");
      if (code) {
        await navigator.clipboard.writeText(code.textContent || "");
      }
    }
  }
};

export { copy };
