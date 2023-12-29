import { Paper, Grid, Typography, Stack, Box, AppBar, Toolbar, Theme } from "@suid/material"
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
        ].map((e) => {
            return {
                ...e,
                "name": e.name[0].toUpperCase() + e.name.slice(1)
            }
        })
    }

    return <Paper sx={{ "width": merged.compactMode ? 300 : 400, borderRadius: 2 }}>
        <Show when={merged.character} fallback={<p>Loading...</p>}>
            <Switch>
                <Match when={merged.compactMode}>
                    <AppBar position="static" color="primary" enableColorOnDark={true}>
                        <Toolbar>
                            <Box>
                                <Typography variant="body2" fontWeight={1000} component="div" sx={{ flexGrow: 1 }} >{merged.character.alias}</Typography>
                                <Typography variant="body2" component="div">{merged.character.name}</Typography>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Stack spacing={1} sx={{ margin: 1 }}>
                        <Box sx={{ textAlign: "center" }}>
                            <img src={merged.character.image} style={{ "width": "200px" }} />
                        </Box>
                        <Grid container>
                            <Grid item xs={2} />
                            <Grid item xs={8} >
                                <Stack spacing={0.1}>
                                    <For each={characterStats()}>{(statPair, i) =>
                                        <Grid container justifyContent="center">
                                            <Grid item xs={9}
                                                borderColor="primary.dark"
                                                sx={{
                                                    border: 2,
                                                    borderRadius: "0% 0% 8px 8px",
                                                    textAlign: "center",
                                                    padding: 1
                                                }}
                                            >
                                                {statPair.name}
                                            </Grid>
                                            <Grid item xs={3}
                                                borderColor="primary.main"
                                                sx={{
                                                    border: 2,
                                                    borderRadius: "0% 0% 8px 8px",
                                                    textAlign: "center",
                                                    padding: 1
                                                }}
                                            >
                                                {statPair.value}
                                            </Grid>
                                        </Grid>
                                    }</For>
                                </Stack>
                            </Grid>
                            <Grid item xs={2} />
                        </Grid>
                        {/*fix for bottom margin not working */}
                        <Box style={{ "height": "1px" }}></Box>
                    </Stack>
                </Match>
                <Match when={!merged.compactMode}>
                    <></>
                </Match>
            </Switch>
        </Show >
    </Paper >
}