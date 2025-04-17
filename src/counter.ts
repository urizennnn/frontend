interface Click {
  id: number;
  clicked_at: string;
}

const CLICKS_URL = "https://pqqzywg2t3.us-east-1.awsapprunner.com/api/clicks";

export function setupCounter(
  button: HTMLButtonElement,
  tsEl: HTMLElement,
  listEl: HTMLUListElement,
) {
  let count = 0;
  button.textContent = `Count ${count}`;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(undefined, { hour12: false });

  const loadClicks = async () => {
    try {
      const res = await fetch(CLICKS_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      const clicks: Click[] = await res.json();
      listEl.innerHTML = clicks
        .map(({ id, clicked_at }) => `<li>#${id} — ${fmt(clicked_at)}</li>`)
        .join("");

      if (clicks.length) {
        const last = clicks.at(-1)!;
        count = last.id;
        button.textContent = `Count ${count}`;
        tsEl.textContent = fmt(last.clicked_at);
      }
    } catch (err) {
      console.error("Failed to fetch clicks:", err);
      listEl.innerHTML = `<li class="error">Could not load history: ${err}</li>`;
    }
  };

  button.addEventListener("click", async () => {
    try {
      const res = await fetch(CLICKS_URL, { method: "POST" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

      const saved: Click = await res.json();
      count = saved.id;
      button.textContent = `Count ${count}`;
      tsEl.textContent = fmt(saved.clicked_at);
      await loadClicks();
    } catch (err) {
      console.error("Failed to register click:", err);
      alert("Click failed—see console for details");
    }
  });

  loadClicks();
}
