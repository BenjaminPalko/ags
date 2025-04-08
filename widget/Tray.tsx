import { bind } from "astal";
import { Gdk } from "astal/gtk4";
import AstalTray from "gi://AstalTray";

const Tray = function () {
  const tray = AstalTray.get_default();

  const trayItems = bind(tray, "items");

  return (
    <box cssClasses={["Tray"]}>
      {trayItems.as((items) =>
        items.map((item) => {
          return (
            <menubutton cursor={Gdk.Cursor.new_from_name("pointer", null)}>
              <image
                tooltip_text={bind(item, "tooltip_markup")}
                file={bind(item, "icon_name").as(
                  (iconName) => iconName || "NONE",
                )}
              />
            </menubutton>
          );
        }),
      )}
    </box>
  );
};

export default Tray;
