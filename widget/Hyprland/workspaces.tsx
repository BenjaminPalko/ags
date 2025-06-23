import { bind } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import Hyprland from "gi://AstalHyprland";
import Rsvg from "gi://Rsvg?version=2.0";
import { Svg } from "../../components/Svg";

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
						cssClasses={["Button", "Label"]}
						cursor={Gdk.Cursor.new_from_name("pointer", null)}
						onClicked={() => workspace.focus()}
					>
						{focusedWorkspace.as((focused) =>
							focused.id === workspace.id ? (
								<Svg
									color="#1fb854"
									path='<path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>'
									rotation={180}
								/>
							) : (
								<Svg path='<path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>' />
							),
						)}
					</button>
				));
			})}
		</box>
	);
};

export default Workspaces;
