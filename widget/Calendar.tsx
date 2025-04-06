import { Variable } from "astal";
import { Gdk, Gtk } from "astal/gtk4";

const time = Variable("").poll(1000, 'date +"%r"');
const date = Variable("").poll(1000, 'date +"%a %b%e, %G"');

function Calendar() {
  return (
    <menubutton hexpand halign={Gtk.Align.END}>
      <label
        cursor={Gdk.Cursor.new_from_name("pointer", null)}
        label={time().as((t) => ` ${t}`)}
        tooltip_text={date().as((d) => `󰸗  ${d}`)}
      />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  );
}

export default Calendar;
