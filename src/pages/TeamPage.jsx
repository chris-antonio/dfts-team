import React from "react";
import {
  Table, Modal, Button, TextField, Select, Link, Alert, Filter, Avatar, Chip, Menu,
} from "@chris-antonio/dfts-react";

const MEMBERS = [
  { id: 1, name: "Amara Chen", role: "Product Designer", team: "design", status: "Active" },
  { id: 2, name: "Diego Fischer", role: "Frontend Engineer", team: "eng", status: "Active" },
  { id: 3, name: "Priya Nandan", role: "Design Lead", team: "design", status: "Away" },
  { id: 4, name: "Sam O'Malley", role: "Content Strategist", team: "content", status: "Active" },
];

export default function TeamPage({ toast }) {
  const [filters, setFilters] = React.useState(new Set());
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("name");

  const toggle = (k) => setFilters((f) => { const n = new Set(f); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const rows = MEMBERS.filter((m) => !filters.size || filters.has(m.team));

  return (
    <div style={{ display: "grid", gap: "var(--spacing-md)", paddingTop: "var(--spacing-md)" }}>
      <Alert variant="info" title="Q4 planning">Add your teammates before Friday so capacity planning is accurate.</Alert>

      <div className="app__row">
        <Filter label="Design" icon="palette" active={filters.has("design")} onToggle={() => toggle("design")} />
        <Filter label="Engineering" icon="code" active={filters.has("eng")} onToggle={() => toggle("eng")} />
        <Filter label="Content" icon="edit_note" active={filters.has("content")} onToggle={() => toggle("content")} />
        <span style={{ flex: 1 }} />
        <Menu
          trigger={<Button variant="secondary" trailingIcon="expand_more">Actions</Button>}
          items={[
            { id: "invite", label: "Invite by email", icon: "mail", onSelect: () => toast("default", "Invite link copied") },
            { id: "export", label: "Export", icon: "download", onSelect: () => toast("success", "Export started") },
          ]}
        />
        <Button leadingIcon="person_add" onClick={() => setOpen(true)}>Add member</Button>
      </div>

      <div className="app__row">
        {MEMBERS.map((m) => <Avatar key={m.id} name={m.name} size="md" />)}
        <Chip variant="outlined">{rows.length} shown</Chip>
      </div>

      <Table
        selectable
        columns={[
          { key: "name", label: "Name", sortable: true },
          { key: "role", label: "Role", sortable: true },
          { key: "status", label: "Status", sortable: false },
        ]}
        rows={rows}
      />

      <form className="app__row" onSubmit={(e) => { e.preventDefault(); toast("default", `Searching \u201c${query}\u201d`); }}>
        <TextField id="team-search" type="search" label="Search" leadingIcon="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Select id="team-sort" label="Sort by" options={[{ value: "name", label: "Name" }, { value: "role", label: "Role" }]} value={sort} onChange={setSort} />
        <Button type="submit">Go</Button>
        <Button type="button" variant="secondary" onClick={() => window.print()}>Print</Button>
        <Link href="#help">Help</Link>
      </form>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add team member"
        footer={
          <React.Fragment>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => { setOpen(false); toast("success", `${name || "Member"} added`); setName(""); }}>Add</Button>
          </React.Fragment>
        }
      >
        <TextField id="member-name" label="Full name" value={name} onChange={(e) => setName(e.target.value)} leadingIcon="person" placeholder="Ada Lovelace" />
      </Modal>
    </div>
  );
}
