import { Divider, Paper, Grid, Typography, Stack, Box, AppBar, Toolbar, Table, TableBody, TableRow, TableCell, TableContainer } from "@suid/material"
import { Switch, mergeProps } from "solid-js";
import { Show, For, Match, createResource } from "solid-js";
import StatDisplay from './stat_display'
import { GameDataService } from "../service/game_data_service";
import { RawCharacter } from "../models/raw/raw_character";
import { Weapon } from "../models/raw/weapon";
import { Trait } from "../models/raw/trait";
import ModalTraitDisplay from './modal_trait_display'

export default function CharacterCardFull(props) {
    const merged = mergeProps({
        character: null,
    }, props)

    const gameDataService: GameDataService = GameDataService.getInstance()


    const column1 = () => {
        return [
            {
                "name": "willpower",
                "value": merged.character.willpower,
                "fontSize": "body2"
            },
            {
                "name": "endurance",
                "value": merged.character.endurance,
                "fontSize": "body2"
            },
            {
                "name": "attack",
                "value": merged.character.attack,
                "fontSize": "body2"

            },
            {
                "name": "defense",
                "value": merged.character.defense,
                "fontSize": "body2"

            },
            {
                "name": "strength",
                "value": merged.character.strength,
                "fontSize": "body2"

            },
            {
                "name": "movement",
                "value": merged.character.movement,
                "fontSize": "body2"

            },
        ]
    }


    return <Paper sx={{ "width": 700, borderRadius: 2 }}>
        <AppBar position="static" color="primary" enableColorOnDark={true}>
            <Toolbar>
                <Box>
                    <Typography variant="body1" fontWeight={500} component="div" sx={{ flexGrow: 1 }} >{merged.character.alias}</Typography>
                    <Typography variant="body1" component="div">{merged.character.name}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
        <Grid container direction="row">
            <Grid item sm={3} padding={1}>
                <Box sx={{ textAlign: "center" }} borderColor="main.primary">
                    <img src={merged.character.image} style={{ "width": "100px" }} />
                </Box>
                <For each={column1()}>{(statPair, i) =>
                    <StatDisplay name={statPair.name} value={statPair.value} fontSize={statPair.fontSize} />
                }</For>

            </Grid>
            <Grid item sm={9} backgroundColor={"#383838"}>
                <Grid container spacing={1} sx={{ padding: 1 }} >
                    <Show when={merged.character.weapons !== undefined && merged.character.weapons.length > 0}
                        fallback={
                            <>
                                <Grid item sm={4}>
                                    -
                                </Grid>
                                <Grid item sm={4}>
                                    -
                                </Grid>
                                <Grid item sm={4}>
                                    -
                                </Grid>
                            </>
                        }>
                        <For each={merged.character.weapons}>{(weapon, idx) =>
                            <>
                                <Grid item sm={2}>
                                    {weapon.name}
                                </Grid>
                                <Grid item sm={2}>
                                    {weapon.damage !== null ? weapon.damage.map(e => e.damage_type_name).toString() : "-"}
                                </Grid>
                                <Grid item sm={1}>
                                    {weapon.rate_of_fire !== null ? weapon.rate_of_fire.toString() : "-"}
                                </Grid>
                                <Grid item sm={1}>
                                    {weapon.ammunition !== null ? weapon.ammunition.toString() : "-"}
                                </Grid>
                                <Grid item sm={6}>
                                    <Show
                                        when={weapon.traits !== null && weapon.traits.length > 0}
                                        fallback={<span>-</span>}
                                    >
                                        <Grid container spacing={0.5}>
                                            <For each={weapon.traits}>{(characterTrait) =>
                                                <Grid item xs="auto">
                                                    <ModalTraitDisplay trait={characterTrait.trait} name_override={characterTrait.alternate_name} />
                                                </Grid>
                                            }</For>
                                        </Grid>
                                    </Show>
                                </Grid>
                                <Divider />
                            </>
                        }</For>
                    </Show>
                </Grid>
            </Grid>
        </Grid>
    </Paper >

}