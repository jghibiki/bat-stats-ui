import { Paper, Grid, Typography, Stack, Box, AppBar, Toolbar } from "@suid/material"
import { mergeProps } from "solid-js";
import { Show, For, Match } from "solid-js";
import StatDisplay from './stat_display'

export default function CharacterCardSimple(props) {
    const merged = mergeProps({
        character: null,
    }, props)

    const column1 = () => {
        return [
            {
                "name": "willpower",
                "value": merged.character.willpower
            },
            {
                "name": "endurance",
                "value": merged.character.endurance
            },
        ]
    }

    const column2 = () => {
        return [
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

    return <Paper sx={{ "width": 300, borderRadius: 2 }}>
        <AppBar position="static" color="primary" enableColorOnDark={true}>
            <Toolbar>
                <Box>
                    <Typography variant="body2" fontWeight={1000} component="div" sx={{ flexGrow: 1 }} >{merged.character.alias}</Typography>
                    <Typography variant="body2" component="div">{merged.character.name}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
        <Grid container spacing={1} sx={{ padding: 1 }}>
            <Grid item sm={6}>
                <Box sx={{ textAlign: "center" }} borderColor="main.primary">
                    <img src={merged.character.image} style={{ "width": "150px" }} />
                </Box>
                <For each={column1()}>{(statPair, i) =>
                    <StatDisplay name={statPair.name} value={statPair.value} />
                }</For>

            </Grid>
            <Grid item sm={6} >
                <Grid container direction="column" justifyContent="flex-end" sx={{ height: "100%" }}>
                    <For each={column2()}>{(statPair, i) =>
                        <Grid item>
                            <StatDisplay name={statPair.name} value={statPair.value} />
                        </Grid>
                    }</For>
                </Grid>
            </Grid>
        </Grid>
    </Paper >
}