import { bind } from "astal";
import { Gtk } from "astal/gtk4";
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
            <menubutton>
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
