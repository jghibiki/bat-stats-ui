import { Box, CircularProgress, Container, Typography } from "@suid/material"
import CharacterCard from "../components/character_card"
import { Show, createEffect, createSignal } from "solid-js";
import { For } from "solid-js";
import { Grid, Button } from "@suid/material"
import { GameDataService } from "../service/game_data_service";
import { CharacterModel } from "../models/optimized/character_model";
import { CardMode } from "../enums/card_mode_enum";


export default function PrintView() {
    const [characters, setCharacters] = createSignal<Array<CharacterModel>>([])
    const [compactMode, setCompactMode] = createSignal<Boolean>(true)
    const [page, setPage] = createSignal(1)
    const [maxPage, setMaxPage] = createSignal<null | number>(null)
    const [totalResults, setTotalResults] = createSignal<null | number>(null)
    const [loading, setLoading] = createSignal(true)

    createEffect(async () => {
        const game_data_service = GameDataService.getInstance()
        setLoading(true)
        let result = await game_data_service.getCharactersByPage(null, page())
        let nonEternalCharacters = result.data.filter(x => !x.eternal)
        setCharacters(
            nonEternalCharacters
        )
        setMaxPage(
            result.total_pages
        )
        setTotalResults(
            result.total_pages
        )
        setLoading(false)
    })

    const hasPreviousPage = () => {
        return page() > 1
    }

    const hasNextPage = () => {
        return page() < maxPage()
    }

    const nextPage = () => {
        setPage(x => x + 1)
    }

    const previousPage = () => {
        setPage(x => x - 1)
    }

    const toggleCompactMode = () => {
        setCompactMode(!compactMode())
    }

    return <Box>
        <Grid container sx={{ marginBottom: 1 }}>
            <Grid item xs>
                <Button
                    variant="contained"
                    onClick={toggleCompactMode}
                >
                    Toggle Compact
                </Button>
            </Grid>
            <Grid item xs />
            <Grid item xs={3} container spacing={1} justifyContent="center">
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={previousPage}
                        disabled={!hasPreviousPage()}
                    >
                        Previous Page
                    </Button>
                </Grid>
                <Grid item>
                    <Typography variant={"body1"} color="white">
                        {page()} / {maxPage()}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={nextPage}
                        disabled={!hasNextPage()}
                    >
                        Next Page
                    </Button>
                </Grid>
            </Grid>
        </Grid>

        <Show when={!loading()}
            fallback={<CircularProgress />}
        >
            <Grid container spacing={1} justifyContent="center">
                <For each={characters().splice(0, 20)}>{(character, i) =>
                    <Grid item>
                        <CharacterCard character={character} mode={CardMode.PRINT} />
                    </Grid>
                }</For>
            </Grid>
        </Show>
    </Box>
}