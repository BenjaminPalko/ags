import { bind } from "astal";
import { Gdk, Gtk } from "astal/gtk4";
import AstalTray from "gi://AstalTray";

const Tray = function () {
  const tray = AstalTray.get_default();

  const trayItems = bind(tray, "items");

  function OpenTrayItem(button: Gtk.MenuButton, item: AstalTray.TrayItem) {
    item.about_to_show();
  }

  return (
    <box cssClasses={["Tray"]}>
      {trayItems.as((items) =>
        items.map((item) => {
          return (
            <menubutton cursor={Gdk.Cursor.new_from_name("pointer", null)}>
              <image
                tooltip_text={item.title || item.tooltip.title}
                file={item.iconName || "NONE"}
              />
            </menubutton>
          );
        }),
      )}
    </box>
  );
};

export default Tray;
