import { Container } from "@suid/material"
import CharacterCardSimple from "../components/character_card"
import { onMount, createSignal } from "solid-js";
import type { Character } from '../models/character'
import { For } from "solid-js";
import { Grid, } from "@suid/material"

export default function CardViewerTest() {

    const [characters, setCharacters] = createSignal<Array<Character>>([])

    onMount(async () => {
        const result = await fetch("http://localhost:8080/character")
        setCharacters(
            (await result.json() as Array<Character>).filter(x => !x.eternal)
        )
    })

    const character = () => characters()[730]

    return <div>
        <Grid container spacing={2}>
            <For each={characters().splice(0, 20)}>{(character, i) =>
                <Grid item>
                    <CharacterCardSimple character={character} />
                </Grid>
            }</For>
        </Grid>
    </div>

}