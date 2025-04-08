import { GLib } from "astal";
import { Gdk, Gtk } from "astal/gtk4";

const OS = function () {
  return (
    <button
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      onClicked="echo hello"
      hexpand
      halign={Gtk.Align.START}
      cssClasses={["Arch"]}
      iconName={GLib.get_os_info("LOGO") || "missing-symbolic"}
    />
  );
};

export default OS;
