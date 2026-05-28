import { useState, useEffect, FormEvent, useRef } from "react";

export type Severity = "high" | "mid" | "low";

interface CreateBugModalProps {
  isOpen: boolean;
  defaultOwner: string;
  onClose: () => void;
  onSaved: () => void;
}

const SEVERITIES: Severity[] = ["high", "mid", "low"];

function severitySelectClass(severity: Severity): string {
  return `severity-select-${severity}`;
}

export function CreateBugModal({
  isOpen,
  defaultOwner,
  onClose,
  onSaved,
}: CreateBugModalProps) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<Severity>("mid");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setSeverity("mid");
      setOwner(defaultOwner);
      setDescription("");
      setValidationErrors([]);
      setLoading(false);
      queueMicrotask(() => titleInputRef.current?.focus());
    }
  }, [isOpen, defaultOwner]);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  function validate(): string[] {
    const errors: string[] = [];
    if (!title.trim()) errors.push("Title is required.");
    if (!owner.trim()) errors.push("Owner is required.");
    if (!description.trim()) errors.push("Description is required.");
    if (!SEVERITIES.includes(severity)) errors.push("Severity is required.");
    return errors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);
    setLoading(true);
    try {
      const res = await fetch("/api/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          severity,
          owner: owner.trim(),
          description: description.trim(),
        }),
      });
      if (res.ok) {
        onSaved();
        onClose();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      setValidationErrors([data.message ?? "Failed to save bug."]);
    } catch {
      setValidationErrors(["Something went wrong. Please try again."]);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-bug-modal-title"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg border border-stone-200">
        <div className="flex items-center justify-between gap-2 px-6 py-4 border-b border-stone-200">
          <h2 id="create-bug-modal-title" className="text-lg font-semibold text-stone-800">
            Create bug
          </h2>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded p-1 text-stone-500 hover:bg-stone-100 hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label htmlFor="bug-title" className="block text-sm font-medium text-stone-700 mb-1">
              Title
            </label>
            <input
              id="bug-title"
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-stone-300 px-3 py-2 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={loading}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="bug-severity" className="block text-sm font-medium text-stone-700 mb-1">
              Severity
            </label>
            <select
              id="bug-severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as Severity)}
              className={`w-full rounded border border-stone-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${severitySelectClass(severity)}`}
              disabled={loading}
            >
              {SEVERITIES.map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="bug-owner" className="block text-sm font-medium text-stone-700 mb-1">
              Owner
            </label>
            <input
              id="bug-owner"
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full rounded border border-stone-300 px-3 py-2 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={loading}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="bug-description" className="block text-sm font-medium text-stone-700 mb-1">
              Description
            </label>
            <textarea
              id="bug-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border border-stone-300 px-3 py-2 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-y"
              disabled={loading}
              autoComplete="off"
            />
          </div>
          {validationErrors.length > 0 && (
            <ul className="text-sm text-red-600" role="alert">
              {validationErrors.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          )}
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded px-4 py-2 text-sm font-medium text-stone-700 bg-stone-200 hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded px-4 py-2 text-sm font-medium text-stone-800 bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
