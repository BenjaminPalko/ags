import { bind } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import AstalTray from "gi://AstalTray";

const TrayItem = function ({ item }: { item: AstalTray.TrayItem }) {
	const popover = Gtk.PopoverMenu.new_from_model(item.menu_model);
	popover.insert_action_group("dbusmenu", item.action_group);
	popover.add_css_class("TrayItem");

	return (
		<menubutton
			cursor={Gdk.Cursor.new_from_name("pointer", null)}
			popover={popover}
		>
			<image gicon={item.gicon} cssClasses={["Label"]} />
		</menubutton>
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
