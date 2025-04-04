import { GLib } from "astal";
import { Gtk } from "astal/gtk4";

const OS = function () {
  return (
    <button
      onClicked="echo hello"
      hexpand
      halign={Gtk.Align.START}
      cssClasses={["Arch"]}
    >
      <image iconName={GLib.get_os_info("LOGO") || "missing-symbolic"} />
    </button>
  );
};

export default OS;
