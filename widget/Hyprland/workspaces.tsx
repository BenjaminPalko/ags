import { bind } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import Hyprland from "gi://AstalHyprland";
import Rsvg from "gi://Rsvg?version=2.0";

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

	Gtk.Image.interface_install_property;

	const activeTrianglePath =
		'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1fb854" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-icon lucide-triangle"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>';
	const inactiveTrianglePath =
		'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" transform="rotate(180 12 12)" fill="none" stroke="#cac9c9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-icon lucide-triangle"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>';

	const activeTrianglePixBuf =
		Rsvg.Handle.new_from_data(activeTrianglePath).get_pixbuf();
	const inactiveTrianglePixBuf =
		Rsvg.Handle.new_from_data(inactiveTrianglePath).get_pixbuf();

	return (
		<box cssClasses={["Workspaces"]}>
			{workspaces.as((workspaces) => {
				return workspaces.map((workspace) => (
					<button
						cursor={Gdk.Cursor.new_from_name("pointer", null)}
						onClicked={() => workspace.focus()}
					>
						{focusedWorkspace.as((focused) =>
							focused.id === workspace.id
								? Gtk.Image.new_from_pixbuf(activeTrianglePixBuf)
								: Gtk.Image.new_from_pixbuf(inactiveTrianglePixBuf),
						)}
					</button>
				));
			})}
		</box>
	);
};

export default Workspaces;
