import { Paper, Grid, Typography, Stack, Box } from "@suid/material"
import { mergeProps } from "solid-js";
import { Show, For, Match, Switch } from "solid-js";

export default function CharacterCardSimple(props) {
    const merged = mergeProps({
        character: null,
        compactMode: true
    }, props)

    const characterStats = () => {
        return [
            {
                "name": "willpower",
                "value": merged.character.willpower
            },
            {
                "name": "endurance",
                "value": merged.character.endurance
            },
            {
                "name": "attack",
                "value": merged.character.attack
            },
            {
                "name": "defense",
                "value": merged.character.defense
            },
            {
                "name": "strength",
                "value": merged.character.strength
            },
            {
                "name": "movement",
                "value": merged.character.movement
            },
        ]
    }

    return <Paper style={{ "padding": "10px", "width": merged.compactMode ? "250px" : "400px" }}>
        <Show when={merged.character} fallback={<p>Loading...</p>}>
            <Switch>
                <Match when={merged.compactMode}>
                    <Stack spacing={1}>
                        <div>
                            <Typography variant="body2" fontWeight={500}>{merged.character.alias}</Typography>
                            <Typography variant="body2">{merged.character.name}</Typography>
                        </div>
                        <div style={{ "text-align": "center" }}>
                            <img src={merged.character.image} style={{ width: "200px", "border": "solid 1px white" }} />
                        </div>
                        <div>
                            <For each={characterStats()}>{(statPair, i) =>
                                <Grid container>
                                    <Grid item xs={8}
                                        style={{
                                            "border": "1px solid white",
                                            "border-radius": "0% 0% 8px 8px",
                                            "text-align": "center",
                                            "padding": "5px"
                                        }}>
                                        {statPair.name}
                                    </Grid>
                                    <Grid item xs={4}
                                        style={{
                                            "border": "1px solid #A1A1A1",
                                            "border-radius": "0% 0% 8px 8px",
                                            "text-align": "center",
                                            "padding": "5px"
                                        }}>
                                        {statPair.value}
                                    </Grid>
                                </Grid>
                            }</For>
                        </div>
                    </Stack>
                </Match>
                <Match when={!merged.compactMode}>
                    <></>
                </Match>
            </Switch>
        </Show >
    </Paper >
}