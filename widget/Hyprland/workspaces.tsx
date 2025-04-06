import { bind } from "astal";
import { Gdk } from "astal/gtk4";
import Hyprland from "gi://AstalHyprland";

const Workspaces = function () {
  const hyprland = Hyprland.get_default();

  const workspaces = bind(hyprland, "workspaces").as((workspaces) =>
    workspaces
      .filter((workspace) => workspace.id > 0)
      .sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else if (a.id < b.id) {
          return -1;
        }
        return 0;
      }),
  );
  const focusedWorkspace = bind(hyprland, "focused_workspace");
  const specialWorkspaces = bind(hyprland, "workspaces").as((workspaces) =>
    workspaces.filter((workspace) => workspace.id < 0),
  );

  return (
    <box cssClasses={["Workspaces"]}>
      {workspaces.as((workspaces) => {
        return workspaces.map((workspace) => (
          <button
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
            cssClasses={focusedWorkspace.as((focused) => [
              focused.id === workspace.id ? "active" : "",
            ])}
            onClicked={() => workspace.focus()}
          >
            {workspace?.name}
          </button>
        ));
      })}
    </box>
  );
};

export default Workspaces;
