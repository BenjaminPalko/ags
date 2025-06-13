import { Gdk, Gtk } from "astal/gtk4";

const Notifications = function () {
  return (
    <menubutton hexpand halign={Gtk.Align.END}>
      <label cursor={Gdk.Cursor.new_from_name("pointer", null)} label={""} />
      <popover>
        <Gtk.Grid></Gtk.Grid>
      </popover>
    </menubutton>
  );
};

export default Notifications;
