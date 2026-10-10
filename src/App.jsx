import React from "react";
import { Breadcrumbs, Switch, ToastStack, Tabs, Button } from "@chris-antonio/dfts-react";
import TeamPage from "./pages/TeamPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";

export default function App() {
  const [dark, setDark] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const toast = (variant, message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, variant, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };

  return (
    <div className="app">
      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />
      <header className="app__header">
        <div>
          <Breadcrumbs items={[{ label: "Workspace", href: "#" }, { label: "Team Hub" }]} />
          <h1>Team Hub</h1>
        </div>
        <Switch id="theme" label="Dark mode" checked={dark} onChange={(e) => setDark(e.target.checked)} />
      </header>

      <Tabs
        items={[
          { id: "team", label: "Team", content: <TeamPage toast={toast} /> },
          { id: "projects", label: "Projects", content: <ProjectsPage toast={toast} /> },
        ]}
        defaultActiveId="team"
      />
    </div>
  );
}
