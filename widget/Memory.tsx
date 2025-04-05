import { bind, Variable } from "astal";

const Memory = function () {
  const usage = Variable(0).poll(
    1000,
    ["bash", "-c", "free -m | grep Mem | awk '{print ($3/$2)*100}'"],
    (value) => Number(value),
  );

  return (
    <label
      cssClasses={["Label"]}
      label={bind(usage).as((usage) => `  ${usage.toFixed()} %`)}
    />
  );
};

export default Memory;
