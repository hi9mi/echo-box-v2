import { action, atom, withAsyncData, wrap } from "@reatom/core";
import { OpenDialog, Greet } from "@wails/go/main/App";

const value = atom("", "value");
const onInput = (event: Event & { currentTarget: HTMLInputElement }) =>
  value.set(event.currentTarget.value);

const onGreet = action(async () => {
  const result = await wrap(Greet(value()));

  return result;
}, "onGreet").extend(withAsyncData());

export const MainScreen = () => {
  return (
    <div>
      <input value={value} on:input={onInput} />
      <div class="result">{value}</div>
      <button on:click={onGreet}>Greet</button>
      <p>{onGreet.data()}</p>

      <div>
        <button on:click={() => OpenDialog()}>Open Dialog</button>
      </div>
    </div>
  );
};
