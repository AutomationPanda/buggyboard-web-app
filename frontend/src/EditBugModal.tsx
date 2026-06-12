import { useState, useEffect, FormEvent, useRef } from "react";

export type Severity = "high" | "mid" | "low";

export type BugState = "open" | "closed";

export interface Bug {
  id: number;
  title: string;
  severity: string;
  owner: string;
  description: string;
  state: string;
}

interface EditBugModalProps {
  bug: Bug | null;
  onClose: () => void;
  onSaved: () => void;
}

const SEVERITIES: Severity[] = ["high", "mid", "low"];
const BUG_STATES: BugState[] = ["open", "closed"];

function toLowerState(s: string): BugState {
  const u = s.trim().toUpperCase();
  if (u === "OPEN") return "open";
  if (u === "CLOSED") return "closed";
  return "open";
}

function severitySelectClass(severity: Severity): string {
  return `severity-select-${severity}`;
}

function toLowerSeverity(s: string): Severity {
  const u = s.trim().toUpperCase();
  if (u === "HIGH") return "high";
  if (u === "MID") return "mid";
  if (u === "LOW") return "low";
  return "mid";
}

export function EditBugModal({ bug, onClose, onSaved }: EditBugModalProps) {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState<Severity>("mid");
  const [state, setState] = useState<BugState>("open");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const isOpen = bug !== null;

  useEffect(() => {
    if (bug) {
      setTitle(bug.title);
      setSeverity(toLowerSeverity(bug.severity));
      setState(toLowerState(bug.state));
      setOwner(bug.owner);
      setDescription(bug.description);
      setValidationErrors([]);
      setLoading(false);
      setDeleting(false);
      setShowConfirmDelete(false);
      queueMicrotask(() => titleInputRef.current?.focus());
    }
  }, [bug]);

  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        if (showConfirmDelete) {
          setShowConfirmDelete(false);
        } else {
          onClose();
        }
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, showConfirmDelete]);

  const initial = bug
    ? {
        title: bug.title,
        severity: toLowerSeverity(bug.severity),
        state: toLowerState(bug.state),
        owner: bug.owner,
        description: bug.description,
      }
    : null;

  const current = {
    title: title.trim(),
    severity,
    state,
    owner: owner.trim(),
    description: description.trim(),
  };

  const hasChanges =
    initial !== null &&
    (current.title !== initial.title ||
      current.severity !== initial.severity ||
      current.state !== initial.state ||
      current.owner !== initial.owner ||
      current.description !== initial.description);

  const hasBlank =
    current.title === "" ||
    current.owner === "" ||
    current.description === "" ||
    !SEVERITIES.includes(severity);

  const saveDisabled = loading || !hasChanges || hasBlank;

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
    if (saveDisabled || deleting || !bug) return;
    const errors = validate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);
    setLoading(true);
    try {
      const res = await fetch(`/api/bugs/${bug.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          severity: severity.toLowerCase(),
          state: state.toLowerCase(),
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

  function handleDelete() {
    if (!bug || deleting || loading) return;
    setShowConfirmDelete(true);
  }

  function handleCancelDelete() {
    setShowConfirmDelete(false);
  }

  async function handleConfirmDelete() {
    if (!bug || deleting || loading) return;
    setDeleting(true);
    setValidationErrors([]);
    try {
      const res = await fetch(`/api/bugs/${bug.id}`, { method: "DELETE" });
      if (res.ok) {
        onSaved();
        onClose();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      setShowConfirmDelete(false);
      setValidationErrors([data.message ?? "Failed to delete bug."]);
    } catch {
      setShowConfirmDelete(false);
      setValidationErrors(["Something went wrong. Please try again."]);
    } finally {
      setDeleting(false);
    }
  }

  if (!isOpen || !bug) return null;

  return (
    <>
    <div
      className="bug-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-bug-modal-title"
    >
      <div className="bug-modal-panel">
        <div className="bug-modal-header">
          <h2 id="edit-bug-modal-title" className="text-lg font-semibold text-stone-800">
            Edit bug #{bug.id}
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
        <form onSubmit={handleSubmit} className="bug-modal-body space-y-4">
          <div>
            <label htmlFor="edit-bug-id" className="block text-sm font-medium text-stone-700 mb-1">
              ID
            </label>
            <input
              id="edit-bug-id"
              type="text"
              value={bug.id}
              readOnly
              className="w-full rounded border border-stone-200 px-3 py-2 text-stone-500 bg-stone-50 font-mono cursor-not-allowed"
              aria-readonly="true"
            />
          </div>
          <div>
            <label htmlFor="edit-bug-title" className="block text-sm font-medium text-stone-700 mb-1">
              Title
            </label>
            <input
              id="edit-bug-title"
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
            <label htmlFor="edit-bug-severity" className="block text-sm font-medium text-stone-700 mb-1">
              Severity
            </label>
            <select
              id="edit-bug-severity"
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
            <label htmlFor="edit-bug-state" className="block text-sm font-medium text-stone-700 mb-1">
              State
            </label>
            <select
              id="edit-bug-state"
              value={state}
              onChange={(e) => setState(e.target.value as BugState)}
              className="w-full rounded border border-stone-300 px-3 py-2 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={loading}
            >
              {BUG_STATES.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="edit-bug-owner" className="block text-sm font-medium text-stone-700 mb-1">
              Owner
            </label>
            <input
              id="edit-bug-owner"
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full rounded border border-stone-300 px-3 py-2 text-stone-800 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={loading}
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="edit-bug-description" className="block text-sm font-medium text-stone-700 mb-1">
              Description
            </label>
            <textarea
              id="edit-bug-description"
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
          <div className="flex gap-3 justify-between pt-2">
            <button
              type="button"
              onClick={handleDelete}
              className="rounded px-4 py-2 text-sm font-medium text-red-700 border border-red-200 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || deleting}
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded px-4 py-2 text-sm font-medium text-stone-700 bg-stone-200 hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 disabled:opacity-50"
                disabled={loading || deleting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded px-4 py-2 text-sm font-medium text-stone-800 bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saveDisabled || deleting}
            >
              {loading ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    {showConfirmDelete && (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm border border-stone-200">
          <div className="flex items-center justify-between gap-2 px-6 py-4 border-b border-stone-200">
            <h2 id="confirm-delete-title" className="text-lg font-semibold text-stone-800">
              Delete bug
            </h2>
            <button
              type="button"
              onClick={handleCancelDelete}
              className="rounded p-1 text-stone-500 hover:bg-stone-100 hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="px-6 py-4 space-y-4">
            <p className="text-stone-700">
              Are you sure you want to delete bug #{bug.id}: {bug.title}?
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={handleCancelDelete}
                className="rounded px-4 py-2 text-sm font-medium text-stone-700 bg-stone-200 hover:bg-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 disabled:opacity-50"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
