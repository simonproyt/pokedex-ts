import { describe, expect, test, vi, afterEach } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("stores and retrieves values by key", () => {
    const cache = new Cache(1000);

    cache.add("test-key", { value: 123 });
    const value = cache.get<{ value: number }>("test-key");

    expect(value).toEqual({ value: 123 });
    cache.stopReapLoop();
  });

  test("removes expired entries from the cache", async () => {
    vi.useFakeTimers();
    const cache = new Cache(100);
    cache.add("old-key", "value");

    expect(cache.get("old-key")).toBe("value");

    vi.advanceTimersByTime(200);
    await Promise.resolve();

    expect(cache.get("old-key")).toBeUndefined();
    cache.stopReapLoop();
  });
});
