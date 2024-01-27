import { Divider, Paper, Grid, Typography, Stack, Box, AppBar, Toolbar, Table, TableBody, TableRow, TableCell, TableContainer } from "@suid/material"
import { Repeat } from "@solid-primitives/range"
import { Switch, mergeProps } from "solid-js";
import { Show, For, Match, createResource } from "solid-js";
import StatDisplay from './stat_display'
import { GameDataService } from "../service/game_data_service";
import { RawCharacter } from "../models/raw/raw_character";
import { Weapon } from "../models/raw/weapon";
import { Trait } from "../models/raw/trait";
import ModalTraitDisplay from './modal_trait_display'
import { DamageModel } from "../models/optimized/damage_model";

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
        ]
    }

    const column2 = () => {
        return [
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
        ]
    }

    const column3 = () => {
        return [
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

    return <Paper sx={{ "width": 500, borderRadius: 2 }}>
        <AppBar position="static" color="primary" enableColorOnDark={true}>
            <Toolbar>
                <Box>
                    <Typography variant="body1" fontWeight={500} component="div" sx={{ flexGrow: 1 }} >{merged.character.alias}</Typography>
                    <Typography variant="body1" component="div">{merged.character.name}</Typography>
                </Box>
            </Toolbar>
        </AppBar>
        <Grid container>
            <Grid item xs>
                <Grid container direction="row">
                    <Grid item sm={3} padding={1}>
                        <Box sx={{ textAlign: "center" }} borderColor="main.primary">
                            <img src={merged.character.image} style={{ "width": "130px", "margin-left": "-8px" }} />
                        </Box>
                    </Grid>
                    <Grid item sm={9} >
                        <Grid container spacing={1} sx={{ padding: 1 }} direction={"column"} >
                            <Grid item xs sx={{ marginBottom: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <Grid container direction={"column"}>
                                            <For each={column1()}>{(statPair, i) =>
                                                <Grid item>
                                                    <StatDisplay name={statPair.name} value={statPair.value} fontSize={statPair.fontSize} />
                                                </Grid>
                                            }</For>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs>
                                        <Grid container direction={"column"}>
                                            <For each={column2()}>{(statPair, i) =>
                                                <Grid item>
                                                    <StatDisplay name={statPair.name} value={statPair.value} fontSize={statPair.fontSize} />
                                                </Grid>
                                            }</For>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs>
                                        <Grid container direction={"column"}>
                                            <For each={column2()}>{(statPair, i) =>
                                                <Grid item>
                                                    <StatDisplay name={statPair.name} value={statPair.value} fontSize={statPair.fontSize} />
                                                </Grid>
                                            }</For>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Grid item>
            <Grid container>
                <Grid item xs backgroundColor="#383838">
                    <Show
                        when={merged.character.weapons !== undefined && merged.character.weapons.length > 0}
                    >
                        <For each={merged.character.weapons}>{(weapon, idx) =>
                            <>
                                <Grid container spacing={1} padding={0.5}>
                                    <Grid item sm={4} container direction={"column"}>
                                        <Grid item xs>
                                            <Typography variant="body1" textAlign="center">
                                                {weapon.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs container>
                                            <Show
                                                when={weapon.damage !== null && weapon.damage.length !== 0}
                                            >
                                                <Grid item xs>
                                                    <Typography variant="body1" textAlign="center">
                                                        <For each={weapon.damage}>{(damage) =>
                                                            <Repeat times={damage.count}>
                                                                <img src={
                                                                    damage.damage_type_id == 1 ?
                                                                        "src/static/img/icons/blood.svg" :
                                                                        "src/static/img/icons/stun.svg"
                                                                } />
                                                            </Repeat>
                                                        }</For>
                                                    </Typography>
                                                </Grid>
                                            </Show>
                                            <Show
                                                when={weapon.rate_of_fire !== null}
                                            >
                                                <Grid item xs>
                                                    <Typography variant="body1" textAlign="center">
                                                        <span style={{ "margin-right": "1px" }}>{weapon.rate_of_fire.toString()}</span>
                                                        <img src="src/static/img/icons/yellow_rof_icon.svg" />
                                                    </Typography>
                                                </Grid>
                                            </Show>
                                            <Show
                                                when={weapon.ammunition !== null}
                                            >
                                                <Grid item xs>
                                                    <Typography variant="body1" textAlign="center">
                                                        <span>
                                                            <span>{weapon.ammunition.toString()}</span>
                                                            <img src="src/static/img/icons/yellow_ammo_icon.svg" />
                                                        </span>
                                                    </Typography>
                                                </Grid>
                                            </Show>
                                        </Grid>
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
                                </Grid>
                                <Show when={(merged.character.weapons.length - 1) !== idx()}>
                                    <Divider sx={{ marginTop: 0.5, marginBottom: 0.5 }} />
                                </Show>
                            </>
                        }</For>
                    </Show>
                </Grid>
            </Grid>
            <Grid xs>
                <Box sx={{ margin: 1 }}>
                    <Grid container>
                        <For each={merged.character.traits}>{(characterTrait) =>
                            <Grid item xs="auto">
                                <ModalTraitDisplay trait={characterTrait.trait} name_override={characterTrait.alternate_name} />
                            </Grid>
                        }</For>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    </Paper >

}