
import { Box, Card, CardContent, CircularProgress, Container, Paper, TextField, Typography } from "@suid/material"
import CharacterCard from "../components/character_card"
import { Show, createEffect, createSignal } from "solid-js";
import { For } from "solid-js";
import { Grid, Button } from "@suid/material"
import { GameDataService } from "../service/game_data_service";
import { CharacterModel } from "../models/optimized/character_model";
import { CardMode } from "../enums/card_mode_enum";
import { Trait } from "../models/raw/trait";
import { interpolateBmgIcons } from "../utils/bmg_symbol_interpolate";

export default function Compendium() {

    const [traits, setTraits] = createSignal<Array<Trait>>([])
    const [filteredTraits, setFilteredTraits] = createSignal<Array<Trait>>([])
    const [loading, setLoading] = createSignal(true)
    const [query, setQuery] = createSignal<string | null>(null)

    createEffect(async () => {
        const game_data_service = GameDataService.getInstance()
        setLoading(true)
        let traitsResponse = await game_data_service.getTraits(null)
        setTraits(
            traitsResponse
        )
        setLoading(false)
    })


    createEffect(() => {
        if (query() === "" || query() === null || query() === undefined) {
            setFilteredTraits(traits())
        }
        else {
            let rawQuery = query()
            let lowercaseQuery = rawQuery.toLowerCase()
            setFilteredTraits(
                traits().filter(e => e.name.toLowerCase().startsWith(lowercaseQuery))
            )
        }

    })


    return <Box>
        <TextField value={query()} onChange={e => setQuery(e.target.value)} placeholder="Search Traits" />
        <br />
        <Show when={!loading()}
            fallback={<CircularProgress />}
        >
            <Grid container spacing={1} justifyContent="center">
                <For each={filteredTraits()}>{(trait, i) =>
                    <Grid item xs={12}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                >
                                    <span innerHTML={interpolateBmgIcons(trait.name, true)} />
                                </Typography>
                                <Typography
                                    variant="body1"
                                >
                                    <span innerHTML={interpolateBmgIcons(trait.description, true)} />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                }</For>
            </Grid>
        </Show>
    </Box>

}