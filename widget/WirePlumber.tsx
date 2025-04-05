import { bind, derive } from "astal";
import { Gdk } from "astal/gtk4";
import AstalWp from "gi://AstalWp";

const WirePlumber = function () {
  const audio = AstalWp.get_default()?.audio!;

  const speakers = bind(audio, "speakers");

  return (
    <menubutton>
      {speakers.as((speakers) => {
        const defaultSpeaker = speakers.find((speaker) => speaker.is_default);
        if (!defaultSpeaker) {
          return <></>;
        }
        return (
          <label
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
            label={bind(defaultSpeaker, "volume").as(
              (volume) => `  ${Math.floor(volume * 100)}%`,
            )}
            cssClasses={["Button"]}
            hasTooltip={true}
            tooltipText={bind(defaultSpeaker, "description").as(
              (description) => description,
            )}
          />
        );
      })}
      <popover cssClasses={["WirePlumberMenu"]}>
        <box vertical>
          {speakers.as((speakers) =>
            speakers.map((speaker) => (
              <button
                cssClasses={bind(speaker, "is_default").as((is_default) => [
                  "Button",
                  is_default ? "Button-Active" : "",
                ])}
                cursor={Gdk.Cursor.new_from_name("pointer", null)}
                onClicked={() => speaker.set_is_default(true)}
              >
                {speaker.description}
              </button>
            )),
          )}
        </box>
      </popover>
    </menubutton>
  );
};

export default WirePlumber;
