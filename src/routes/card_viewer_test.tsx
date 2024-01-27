import { Container } from "@suid/material"
import CharacterCard from "../components/character_card"
import { onMount, createSignal } from "solid-js";
import { For } from "solid-js";
import { Grid, Button } from "@suid/material"
import { GameDataService } from "../service/game_data_service";
import { CharacterModel } from "../models/optimized/character_model";

export default function CardViewerTest() {

    const [characters, setCharacters] = createSignal<Array<CharacterModel>>([])
    const [compactMode, setCompactMode] = createSignal<Boolean>(true)

    onMount(async () => {
        const game_data_service = GameDataService.getInstance()
        let result = await game_data_service.getCharactersByPage()
        let nonEternalCharacters = result.data.filter(x => !x.eternal)
        setCharacters(
            nonEternalCharacters
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