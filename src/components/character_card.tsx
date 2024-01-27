import { mergeProps } from "solid-js";
import { Show, Match, Switch } from "solid-js";
import CharacterCardSimple from "./character_card_simple"
import CharacterCardFull from "./character_card_full"

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
            <Match when={!merged.compactMode}>
                <CharacterCardFull character={merged.character} />
            </Match>
        </Switch>
    </Show>

}