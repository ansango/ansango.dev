export function useFetchCache<T>(url: string, ttl: number = 60_000) {
  const KEY = `cache:${url}`;
  let listeners: Array<(data: T) => void> = [];

  async function get(): Promise<T> {
    const now = Date.now();
    const cached = JSON.parse(localStorage.getItem(KEY) || "null") as
      | { data: T; expire: number }
      | null;

    if (cached && now < cached.expire) {
      notify(cached.data);
      revalidateInBackground();
      return cached.data;
    }

    const data = await fetchAndStore();
    notify(data);
    return data;
  }

  async function fetchAndStore(): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
    const data = (await res.json()) as T;
    localStorage.setItem(
      KEY,
      JSON.stringify({ data, expire: Date.now() + ttl })
    );
    return data;
  }

  async function revalidateInBackground(): Promise<void> {
    try {
      const data = await fetchAndStore();
      notify(data);
    } catch {
      /* silencioso */
    }
  }

  function onUpdate(callback: (data: T) => void): void {
    listeners.push(callback);
  }

  function notify(data: T): void {
    for (const callback of listeners) callback(data);
  }

  return { get, onUpdate };
}