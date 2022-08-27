const copy = async (e: MouseEvent): Promise<void> => {
  if (e.target instanceof HTMLElement) {
    const parent = e.target.parentElement;
    if (parent instanceof HTMLElement) {
      const code = parent.querySelector("code");
      if (code) {
        await navigator.clipboard.writeText(code.textContent || "");
        e.target.textContent = "Copied";

        setTimeout(() => {
          if (e.target instanceof HTMLElement) {
            e.target.textContent = "Copy";
          }
        }, 2000);
      }
    }
  }
};

export { copy };
