import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "./auth";
import { TitleBar } from "./TitleBar";
import { CreateBugModal } from "./CreateBugModal";
import { EditBugModal, type Bug } from "./EditBugModal";

type BugStateFilter = "OPEN" | "CLOSED";

interface BugRow {
  id: number;
  title: string;
  severity: string;
  owner: string;
  state: string;
}

type SortColumn = "id" | "severity" | "title" | "owner";
type SortDirection = "asc" | "desc";

/** Severity priority for sort: LOW=0, MID=1, HIGH=2 (ascending = LOW then MID then HIGH). */
function severityOrder(s: string): number {
  const u = s.toUpperCase();
  if (u === "LOW") return 0;
  if (u === "MID") return 1;
  if (u === "HIGH") return 2;
  return 1;
}

/** Map API severity (HIGH/MID/LOW) to badge class suffix. */
function severityBadgeClass(severity: string): string {
  const s = severity.toUpperCase();
  if (s === "HIGH") return "severity-badge-high";
  if (s === "MID") return "severity-badge-mid";
  if (s === "LOW") return "severity-badge-low";
  return "severity-badge-mid";
}

/**
 * Normalize text for search matching: case insensitive, collapse whitespace, normalize punctuation.
 * Used on both query and bug titles so "login" matches "Login fails" and "Issue with log-in".
 */
function normalizeForSearch(text: string): string {
  const lower = text.toLowerCase().trim();
  const noPunctuation = lower.replace(/\p{P}/gu, " ");
  return noPunctuation.replace(/\s+/g, " ").trim();
}

/** Return true if normalized bug title contains the normalized query. */
function titleMatchesSearch(title: string, query: string): boolean {
  if (query === "") return true;
  const nTitle = normalizeForSearch(title);
  const nQuery = normalizeForSearch(query);
  return nTitle.includes(nQuery);
}

function sortBugs(bugs: BugRow[], column: SortColumn, direction: SortDirection): BugRow[] {
  const sorted = [...bugs];
  sorted.sort((a, b) => {
    let cmp = 0;
    switch (column) {
      case "id":
        cmp = a.id - b.id;
        break;
      case "severity":
        cmp = severityOrder(a.severity) - severityOrder(b.severity);
        break;
      case "title":
        cmp = a.title.localeCompare(b.title);
        break;
      case "owner":
        cmp = a.owner.localeCompare(b.owner);
        break;
    }
    return direction === "asc" ? cmp : -cmp;
  });
  return sorted;
}

export function BoardPage() {
  const { user } = useAuth();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editBug, setEditBug] = useState<Bug | null>(null);
  const [bugs, setBugs] = useState<BugRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState<SortColumn>("severity");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<BugStateFilter>("OPEN");

  const bugsByState = useMemo(
    () => bugs.filter((bug) => bug.state.toUpperCase() === stateFilter),
    [bugs, stateFilter]
  );

  const filteredBugs = useMemo(
    () => bugsByState.filter((bug) => titleMatchesSearch(bug.title, searchQuery)),
    [bugsByState, searchQuery]
  );

  const sortedBugs = useMemo(
    () => sortBugs(filteredBugs, sortColumn, sortDirection),
    [filteredBugs, sortColumn, sortDirection]
  );

  function handleSortHeader(column: SortColumn) {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  async function handleRowClick(bugId: number) {
    try {
      const res = await fetch(`/api/bugs/${bugId}`);
      if (res.ok) {
        const data = (await res.json()) as Bug;
        setEditBug(data);
      }
    } catch {
      // ignore
    }
  }

  const fetchBugs = useCallback(async () => {
    try {
      const res = await fetch("/api/bugs");
      if (res.ok) {
        const data = (await res.json()) as Array<{
          id: number;
          title: string;
          severity: string;
          owner: string;
          state: string;
        }>;
        setBugs(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBugs();
  }, [fetchBugs]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <TitleBar
        onNewBug={() => setCreateModalOpen(true)}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-5">
            <div
              className="flex rounded-lg border border-stone-200 bg-white p-0.5 shadow-sm"
              role="group"
              aria-label="Filter by bug state"
            >
              <button
                type="button"
                onClick={() => setStateFilter("OPEN")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
                  stateFilter === "OPEN"
                    ? "bg-primary text-stone-800 shadow-sm ring-1 ring-stone-200/50"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                }`}
              >
                Open
              </button>
              <button
                type="button"
                onClick={() => setStateFilter("CLOSED")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
                  stateFilter === "CLOSED"
                    ? "bg-primary text-stone-800 shadow-sm ring-1 ring-stone-200/50"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
                }`}
              >
                Closed
              </button>
            </div>
          </div>
          <section className="bg-white rounded-lg border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left" aria-label="Bugs">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-600 text-sm font-medium uppercase tracking-wide">
                    <th className="px-4 py-3 w-20" scope="col" aria-sort={sortColumn === "id" ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}>
                      <button
                        type="button"
                        onClick={() => handleSortHeader("id")}
                        className="flex items-center gap-1 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                      >
                        ID
                        <span className="inline-block w-4 text-center" aria-hidden="true">
                          {sortColumn === "id" ? (sortDirection === "asc" ? "↑" : "↓") : "\u00A0"}
                        </span>
                      </button>
                    </th>
                    <th className="px-4 py-3 w-24" scope="col" aria-sort={sortColumn === "severity" ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}>
                      <button
                        type="button"
                        onClick={() => handleSortHeader("severity")}
                        className="flex items-center gap-1 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                      >
                        Severity
                        <span className="inline-block w-4 text-center" aria-hidden="true">
                          {sortColumn === "severity" ? (sortDirection === "asc" ? "↑" : "↓") : "\u00A0"}
                        </span>
                      </button>
                    </th>
                    <th className="px-4 py-3" scope="col" aria-sort={sortColumn === "title" ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}>
                      <button
                        type="button"
                        onClick={() => handleSortHeader("title")}
                        className="flex items-center gap-1 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                      >
                        Title
                        <span className="inline-block w-4 text-center" aria-hidden="true">
                          {sortColumn === "title" ? (sortDirection === "asc" ? "↑" : "↓") : "\u00A0"}
                        </span>
                      </button>
                    </th>
                    <th className="px-4 py-3 w-40" scope="col" aria-sort={sortColumn === "owner" ? (sortDirection === "asc" ? "ascending" : "descending") : undefined}>
                      <button
                        type="button"
                        onClick={() => handleSortHeader("owner")}
                        className="flex items-center gap-1 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                      >
                        Owner
                        <span className="inline-block w-4 text-center" aria-hidden="true">
                          {sortColumn === "owner" ? (sortDirection === "asc" ? "↑" : "↓") : "\u00A0"}
                        </span>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-stone-500">
                        Loading…
                      </td>
                    </tr>
                  ) : sortedBugs.length === 0 && bugs.length > 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-stone-500">
                        No bugs matched.
                      </td>
                    </tr>
                  ) : sortedBugs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-stone-500">
                        No bugs.
                      </td>
                    </tr>
                  ) : (
                    sortedBugs.map((bug) => (
                      <tr
                        key={bug.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleRowClick(bug.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleRowClick(bug.id);
                          }
                        }}
                        className="border-b border-stone-100 hover:bg-stone-50/80 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 text-stone-500 font-mono text-sm">{bug.id}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`severity-badge ${severityBadgeClass(bug.severity)}`}
                            data-severity={bug.severity.toUpperCase()}
                          >
                            {bug.severity.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-stone-800">{bug.title}</td>
                        <td className="px-4 py-3 text-stone-600">{bug.owner}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <CreateBugModal
        isOpen={createModalOpen}
        defaultOwner={user?.username ?? ""}
        onClose={() => setCreateModalOpen(false)}
        onSaved={fetchBugs}
      />
      <EditBugModal
        bug={editBug}
        onClose={() => setEditBug(null)}
        onSaved={() => {
          fetchBugs();
          setEditBug(null);
        }}
      />
    </div>
  );
}
