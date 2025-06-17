import { bind } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import AstalTray from "gi://AstalTray";

const TrayItem = function ({ item }: { item: AstalTray.TrayItem }) {
	const popover = Gtk.PopoverMenu.new_from_model(item.menu_model);
	popover.insert_action_group("dbusmenu", item.action_group);

	return (
		<menubutton
			cursor={Gdk.Cursor.new_from_name("pointer", null)}
			icon_name={item.icon_name}
			popover={popover}
		/>
	);
};

const Tray = function () {
	const tray = AstalTray.get_default();

	return (
		<box cssClasses={["Tray"]}>
			{bind(tray, "items").as((items) =>
				items.map((item) => TrayItem({ item })),
			)}
		</box>
	);
};

export default Tray;
