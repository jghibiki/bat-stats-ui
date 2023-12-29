import { mergeProps } from "solid-js";
import { Show, Match, Switch } from "solid-js";
import CharacterCardSimple from "./character_card_simple"
import checkboxClasses from "@suid/material/Checkbox/checkboxClasses";

export default function CharacterCard(props) {
    const merged = mergeProps({
        character: null,
        compactMode: true
    }, props)

    return <Show when={merged.character} fallback={<p>Loading...</p>}>
        <Switch>
            <Match when={merged.compactMode}>
                <CharacterCardSimple character={merged.character} />
            </Match>
        </Switch>
    </Show>

}