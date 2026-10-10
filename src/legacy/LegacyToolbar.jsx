import React from "react";

// TODO(team): replace with DFTS TextField / Button / SegmentedControl.
// Left on native elements on purpose: this is what "not yet migrated" looks like.
export default function LegacyToolbar({ onSearch }) {
  const [q, setQ] = React.useState("");
  return (
    <form className="legacy-toolbar" onSubmit={(e) => { e.preventDefault(); onSearch(q); }}>
      <label htmlFor="legacy-q">Search</label>
      <input id="legacy-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} />
      <select aria-label="Sort by" defaultValue="name">
        <option value="name">Name</option>
        <option value="role">Role</option>
      </select>
      <button type="submit">Go</button>
      <button type="button" onClick={() => window.print()}>Print</button>
      <a href="#help">Help</a>
    </form>
  );
}
