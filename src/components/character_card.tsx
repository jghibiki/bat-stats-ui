import { mergeProps } from "solid-js";
import { Show, Match, Switch } from "solid-js";
import CharacterCardSimple from "./character_card_simple"
import CharacterCardFull from "./character_card_full"
import CharacterCardPrint from "./character_card_print";
import { CardMode } from "../enums/card_mode_enum";

export default function CharacterCard(props) {
    const merged = mergeProps({
        character: null,
        mode: CardMode.COMPACT
    }, props)

    return <Show when={merged.character} fallback={<p>Loading...</p>}>
        <Switch>
            <Match when={merged.mode === CardMode.COMPACT}>
                <CharacterCardSimple character={merged.character} />
            </Match>
            <Match when={merged.mode === CardMode.FULL}>
                <CharacterCardFull character={merged.character} />
            </Match>
            <Match when={merged.mode === CardMode.PRINT}>
                <CharacterCardPrint character={merged.character} />
            </Match>
        </Switch>
    </Show>

}