import React from "react";
import { Card, Tile, ProgressLine, Chip, Accordion, SegmentedControl, Checkbox } from "@chris-antonio/dfts-react";

const PROJECTS = [
  { id: "web", title: "Website redesign", description: "New marketing site on the DFTS kit.", progress: 72 },
  { id: "app", title: "Mobile app", description: "Onboarding flow and settings.", progress: 35 },
  { id: "docs", title: "Help centre", description: "Migrate articles and search.", progress: 90 },
];

export default function ProjectsPage({ toast }) {
  const [view, setView] = React.useState("cards");
  const [showDone, setShowDone] = React.useState(true);
  const list = PROJECTS.filter((p) => showDone || p.progress < 100);

  return (
    <div style={{ display: "grid", gap: 16, paddingTop: 16 }}>
      <div className="app__row">
        <SegmentedControl
          segments={[{ value: "cards", label: "Cards" }, { value: "tiles", label: "Tiles" }]}
          value={view}
          onChange={setView}
        />
        <Checkbox id="show-done" label="Show completed" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
      </div>

      {view === "cards" ? (
        <div className="app__grid">
          {list.map((p) => (
            <Card
              key={p.id}
              title={p.title}
              description={p.description}
              footer={<div style={{ display: "grid", gap: 8, width: "100%" }}><ProgressLine value={p.progress} showLabel label="Progress" /><Chip variant="outlined">{p.progress}%</Chip></div>}
            />
          ))}
        </div>
      ) : (
        <div className="app__grid">
          {list.map((p) => <Tile key={p.id} icon="folder" title={p.title} description={p.description} onClick={() => toast("default", `Opened ${p.title}`)} />)}
        </div>
      )}

      <Accordion
        defaultOpenId="a1"
        items={[
          { id: "a1", title: "How is progress calculated?", content: "Completed tasks divided by total tasks." },
          { id: "a2", title: "Who can edit a project?", content: "Anyone on the team with edit rights." },
        ]}
      />
    </div>
  );
}
