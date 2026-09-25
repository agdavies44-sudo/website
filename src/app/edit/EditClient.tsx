"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import workSeed from "@/data/work.json";
import type { MediaKind, WorkItem } from "@/data/projects";

const PASS_PHRASE = "davies-edit";
const STORAGE_KEY = "alexandra-edit-unlocked";

type SectionKey = "social" | "corporate" | "podcasts" | "lives";

type WorkContent = Record<SectionKey, WorkItem[]>;

const SECTION_META: { key: SectionKey; label: string; defaultAspect: "portrait" | "landscape" }[] = [
  { key: "social", label: "Social", defaultAspect: "portrait" },
  { key: "corporate", label: "Corporate", defaultAspect: "landscape" },
  { key: "podcasts", label: "Podcast", defaultAspect: "landscape" },
  { key: "lives", label: "Live productions", defaultAspect: "landscape" },
];

function cloneWork(data: WorkContent): WorkContent {
  return {
    social: data.social.map((i) => ({ ...i })),
    corporate: data.corporate.map((i) => ({ ...i })),
    podcasts: data.podcasts.map((i) => ({ ...i })),
    lives: data.lives.map((i) => ({ ...i })),
  };
}

function todayStamp(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function defaultItem(aspect: "portrait" | "landscape"): WorkItem {
  return {
    id: newId("vimeo"),
    brand: "Brand",
    title: "New title",
    kind: "vimeo",
    url: "",
    vimeoId: "",
    aspect,
  };
}

function syncDerivedFields(item: WorkItem): WorkItem {
  const next = { ...item };
  if (next.kind === "vimeo" && next.vimeoId) {
    next.id = next.id.startsWith("vimeo-") ? `vimeo-${next.vimeoId}` : next.id;
    next.url = `https://vimeo.com/${next.vimeoId}`;
    if (!next.poster || next.poster.includes("vumbnail.com")) {
      next.poster = `https://vumbnail.com/${next.vimeoId}.jpg`;
    }
  } else if (next.kind === "youtube" && next.youtubeId) {
    next.id = next.id.startsWith("yt-") ? `yt-${next.youtubeId}` : next.id;
    next.url = `https://www.youtube.com/watch?v=${next.youtubeId}`;
    if (!next.poster || next.poster.includes("ytimg.com")) {
      next.poster = `https://i.ytimg.com/vi/${next.youtubeId}/hqdefault.jpg`;
    }
  }
  return next;
}

export function EditClient() {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [data, setData] = useState<WorkContent>(() => cloneWork(workSeed as WorkContent));
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("social");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
    } catch {
      /* ignore */
    }
  }, []);

  const tryUnlock = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (pass.trim() === PASS_PHRASE) {
        setUnlocked(true);
        setPassError("");
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
      } else {
        setPassError("That passphrase doesn’t match. Try again.");
      }
    },
    [pass],
  );

  const jsonText = useMemo(() => JSON.stringify(data, null, 2) + "\n", [data]);

  const downloadJson = () => {
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alexandra-work-${todayStamp()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      window.prompt("Copy this JSON:", jsonText);
    }
  };

  const updateItem = (section: SectionKey, index: number, patch: Partial<WorkItem>) => {
    setData((prev) => {
      const items = prev[section].map((item, i) => {
        if (i !== index) return item;
        return syncDerivedFields({ ...item, ...patch });
      });
      return { ...prev, [section]: items };
    });
  };

  const moveItem = (section: SectionKey, index: number, dir: -1 | 1) => {
    setData((prev) => {
      const items = [...prev[section]];
      const target = index + dir;
      if (target < 0 || target >= items.length) return prev;
      const tmp = items[index];
      items[index] = items[target];
      items[target] = tmp;
      return { ...prev, [section]: items };
    });
  };

  const removeItem = (section: SectionKey, index: number) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addItem = (section: SectionKey, aspect: "portrait" | "landscape") => {
    setData((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultItem(aspect)],
    }));
  };

  const resetAll = () => {
    if (window.confirm("Reset all sections to the site’s current published data?")) {
      setData(cloneWork(workSeed as WorkContent));
    }
  };

  if (!unlocked) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
        <p className="wordmark text-3xl text-ink">Alexandra Davies</p>
        <h1 className="mt-6 text-xl font-medium tracking-tight">Edit work content</h1>
        <p className="mt-3 text-sm text-mid">
          Enter the shared passphrase to open the editor. This is light protection only — not
          bank-level security.
        </p>
        <form onSubmit={tryUnlock} className="mt-8 space-y-4">
          <label className="block text-xs uppercase tracking-[0.12em] text-muted">
            Passphrase
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="mt-2 w-full border border-line bg-white px-3 py-2.5 text-base text-ink outline-none focus:border-ink"
              autoComplete="current-password"
              autoFocus
            />
          </label>
          {passError ? <p className="text-sm text-accent">{passError}</p> : null}
          <button
            type="submit"
            className="w-full bg-ink px-4 py-3 text-sm uppercase tracking-[0.12em] text-paper"
          >
            Unlock
          </button>
        </form>
        <p className="mt-8 text-xs text-muted">
          Tip: you can also open <code className="text-mid">/edit</code> after unlocking once in
          this browser tab (session).
        </p>
      </main>
    );
  }

  const meta = SECTION_META.find((s) => s.key === activeSection)!;
  const items = data[activeSection];

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 sm:px-8">
      <header className="border-b border-line pb-6">
        <p className="wordmark text-2xl">Alexandra Davies</p>
        <h1 className="mt-4 text-xl font-medium">Work content editor</h1>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-mid">
          <li>Change what you need (titles, brands, Vimeo IDs, order).</li>
          <li>
            Click <strong className="text-ink">Download JSON</strong>.
          </li>
          <li>
            Send the file to <strong className="text-ink">Grok Bot</strong> in chat so it can update
            the live site.
          </li>
        </ol>
        <p className="mt-3 text-xs text-muted">
          This page does not write to GitHub or the live site by itself. Passphrase protection is
          light — anyone with the phrase can open this form.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadJson}
            className="bg-ink px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-paper"
          >
            Download JSON
          </button>
          <button
            type="button"
            onClick={copyJson}
            className="border border-ink px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-ink"
          >
            {copied ? "Copied!" : "Copy JSON"}
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="border border-line px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-mid"
          >
            Reset
          </button>
        </div>
      </header>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Sections">
        {SECTION_META.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActiveSection(s.key)}
            className={`px-3 py-2 text-xs uppercase tracking-[0.1em] ${
              activeSection === s.key
                ? "bg-ink text-paper"
                : "border border-line bg-white text-mid"
            }`}
          >
            {s.label} ({data[s.key].length})
          </button>
        ))}
      </nav>

      <section className="mt-6 space-y-4" aria-labelledby="section-heading">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="section-heading" className="text-lg font-medium">
            {meta.label}
          </h2>
          <button
            type="button"
            onClick={() => addItem(activeSection, meta.defaultAspect)}
            className="border border-accent px-3 py-2 text-xs uppercase tracking-[0.1em] text-accent"
          >
            + Add item
          </button>
        </div>

        {items.length === 0 ? (
          <p className="rounded border border-dashed border-line bg-white px-4 py-8 text-center text-sm text-muted">
            No items yet. Add one to get started.
          </p>
        ) : (
          items.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="rounded border border-line bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.12em] text-muted">
                  #{index + 1} · {item.kind} · {item.aspect}
                </p>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() => moveItem(activeSection, index, -1)}
                    className="border border-line px-2 py-1 text-sm disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label="Move down"
                    disabled={index === items.length - 1}
                    onClick={() => moveItem(activeSection, index, 1)}
                    className="border border-line px-2 py-1 text-sm disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Remove “${item.title || item.brand}”?`)) {
                        removeItem(activeSection, index);
                      }
                    }}
                    className="border border-line px-2 py-1 text-xs uppercase tracking-[0.08em] text-accent"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs text-muted">
                  Brand
                  <input
                    value={item.brand}
                    onChange={(e) => updateItem(activeSection, index, { brand: e.target.value })}
                    className="mt-1 w-full border border-line px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  />
                </label>
                <label className="block text-xs text-muted">
                  Title
                  <input
                    value={item.title}
                    onChange={(e) => updateItem(activeSection, index, { title: e.target.value })}
                    className="mt-1 w-full border border-line px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  />
                </label>
                <label className="block text-xs text-muted">
                  Kind
                  <select
                    value={item.kind}
                    onChange={(e) =>
                      updateItem(activeSection, index, { kind: e.target.value as MediaKind })
                    }
                    className="mt-1 w-full border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  >
                    <option value="vimeo">vimeo</option>
                    <option value="youtube">youtube</option>
                    <option value="instagram">instagram</option>
                    <option value="image">image</option>
                    <option value="external">external</option>
                    <option value="video">video</option>
                  </select>
                </label>
                <label className="block text-xs text-muted">
                  Aspect
                  <select
                    value={item.aspect}
                    onChange={(e) =>
                      updateItem(activeSection, index, {
                        aspect: e.target.value as "portrait" | "landscape",
                      })
                    }
                    className="mt-1 w-full border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  >
                    <option value="portrait">portrait</option>
                    <option value="landscape">landscape</option>
                  </select>
                </label>
                <label className="block text-xs text-muted">
                  Vimeo ID
                  <input
                    value={item.vimeoId ?? ""}
                    onChange={(e) =>
                      updateItem(activeSection, index, {
                        vimeoId: e.target.value.trim() || undefined,
                        kind: e.target.value.trim() ? "vimeo" : item.kind,
                      })
                    }
                    placeholder="e.g. 1229936390"
                    className="mt-1 w-full border border-line px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  />
                </label>
                <label className="block text-xs text-muted">
                  YouTube ID
                  <input
                    value={item.youtubeId ?? ""}
                    onChange={(e) =>
                      updateItem(activeSection, index, {
                        youtubeId: e.target.value.trim() || undefined,
                      })
                    }
                    placeholder="optional"
                    className="mt-1 w-full border border-line px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  />
                </label>
                <label className="block text-xs text-muted sm:col-span-2">
                  Poster URL or path
                  <input
                    value={item.poster ?? ""}
                    onChange={(e) =>
                      updateItem(activeSection, index, {
                        poster: e.target.value.trim() || undefined,
                      })
                    }
                    placeholder="/media/... or https://..."
                    className="mt-1 w-full border border-line px-3 py-2 text-sm text-ink outline-none focus:border-ink"
                  />
                </label>
              </div>
            </article>
          ))
        )}
      </section>

      <footer className="mt-12 border-t border-line pt-6 text-xs text-muted">
        <p>
          When you are done, download the JSON and send it in chat. Do not expect this page to
          publish changes on its own.
        </p>
        <p className="mt-2">
          <a href="/" className="underline underline-offset-2">
            ← Back to site
          </a>
        </p>
      </footer>
    </main>
  );
}
