import { action, atom, wrap } from "@reatom/core";
import { OpenDialog, Greet } from "@wails/go/main/App";

const value = atom("");
const onInput = (event: Event & { currentTarget: HTMLInputElement }) =>
  value.set(event.currentTarget.value);
const result = atom("");

const greetAction = action(async () => {
  const r = await wrap(Greet(value()));
  result.set(r);
});

export const Input = () => {
  return (
    <div>
      <input value={value} on:input={onInput} />
      <div class="result">{value}</div>
      <button on:click={greetAction}>Greet</button>
      <span>{result}</span>

      <div>
        <button on:click={() => OpenDialog()}>Open Dialog</button>
      </div>
    </div>
  );
};
