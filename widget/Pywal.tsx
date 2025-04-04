import { exec } from "astal";
import { Gdk } from "astal/gtk4";

function Pywal() {
  return (
    <button
      cssClasses={["Pywal"]}
      cursor={Gdk.Cursor.new_from_name("pointer", null)}
      label={""}
      onClicked={() => exec("bash -c ~/dotfiles/.scripts/pywal-swww.sh")}
    />
  );
}

export default Pywal;
