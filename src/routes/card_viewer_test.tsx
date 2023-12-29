import { Container } from "@suid/material"
import CharacterCard from "../components/character_card"
import { onMount, createSignal } from "solid-js";
import type { Character } from '../models/character'
import { For } from "solid-js";
import { Grid, Button } from "@suid/material"

export default function CardViewerTest() {

    const [characters, setCharacters] = createSignal<Array<Character>>([])
    const [compactMode, setCompactMode] = createSignal<Boolean>(true)

    onMount(async () => {
        const result = await fetch("http://localhost:8080/character")
        setCharacters(
            (await result.json() as Array<Character>).filter(x => !x.eternal)
        )
    })

    const toggleCompactMode = () => {
        setCompactMode(!compactMode())
    }

    return <div>
        <Button variant="contained" onClick={toggleCompactMode} sx={{ marginBottom: 1 }}>Toggle Compact</Button>

        <Grid container spacing={2} justifyContent="center">
            <For each={characters().splice(0, 20)}>{(character, i) =>
                <Grid item>
                    <CharacterCard character={character} compactMode={compactMode()} />
                </Grid>
            }</For>
        </Grid>
    </div>

}