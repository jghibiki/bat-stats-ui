import { Divider, Paper, Grid, Typography, Stack, Box, AppBar, Toolbar, Table, TableBody, TableRow, TableCell, TableContainer } from "@suid/material"
import { Repeat } from "@solid-primitives/range"
import { JSXElement, createSignal, mergeProps, onMount } from "solid-js";
import { Show, For } from "solid-js";
import StatDisplay from './stat_display'
import { GameDataService } from "../service/game_data_service";
import ModalTraitDisplay from './modal_trait_display'
import { createTheme, ThemeProvider } from "@suid/material/styles";
import { WeaponTrait } from "../models/raw/weapon_trait";
import { WeaponTraitModel } from "../models/optimized/weapon_trait_model";
import { interpolateBmgIcons } from "../utils/bmg_symbol_interpolate";
import { CharacterTraitModel } from "../models/optimized/character_trait_model";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffc107',
            dark: "#B28704"
        },
        secondary: {
            main: '#2962ff',
        },
        background: {
            paper: "#fff"
        },
        text: {
            primary: "#000"
        },
        divider: "#000"
    }
})

export default function CharacterCardPrint(props) {
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

            }
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

    const formatTraitName = (trait: WeaponTraitModel | CharacterTraitModel) => {
        let name = trait.alternative_name ? trait.alternative_name : trait.trait.name
        let updatedName = interpolateBmgIcons(name, false)
        return updatedName
    }

    const formatTraits = (weaponTraits: Array<WeaponTraitModel | CharacterTraitModel>) => {
        return weaponTraits.map(
            el => {
                let updatedName = formatTraitName(el)
                return updatedName
            }
        ).map(
            el => <span innerHTML={el} />
        )
    }

    const generateWeaponTraits = (traits) => {

        let formattedTraits = formatTraits(traits)
        let lastIndex = traits.length - 1
        return <For each={formattedTraits}>{(trait, idx) =>
            <>
                <Typography
                    variant="body2"
                    sx={{
                        display: "inline-block"

                    }}>
                    {trait}
                </Typography>
                <Show when={idx() !== lastIndex}>
                    <span
                        style={{
                            "margin-left": "2px",
                            "margin-right": "2px"
                        }}
                    >/</span>
                </Show>
            </>
        }</For>
    }

    const generateCharacterTraits = (traits) => {

        let formattedTraits = formatTraits(traits)
        let lastIndex = traits.length - 1
        return <For each={formattedTraits}>{(trait, idx) =>
            <Grid item xs={6}>
                {trait}
            </Grid>
        }</For>
    }

    const minFontSize = 0.8
    const [traitReferenceRef, setTraitReferenceRef] = createSignal(null)
    const [fontSize, setFontSize] = createSignal(minFontSize + "rem")


    const traitFontSize = () => {
        let fontSize = minFontSize
        if (traitReferenceRef() === null) {
            return fontSize + "rem"
        }
        let scale = (1 - (traitReferenceRef().clientHeight / 620.0)) ** 2
        let calculatedFontSize = fontSize + (scale)
        console.log(traitReferenceRef())
        console.log(scale, traitReferenceRef().clientHeight, calculatedFontSize)

        return calculatedFontSize + "rem"
    }

    onMount(() => {
        let fontSize = traitFontSize()
        setFontSize(fontSize)
    })

    return <ThemeProvider theme={theme}>
        <Grid container>
            <Grid item xs={6}>
                <Paper id="printable-card-front" sx={{ "width": "500px", height: "700px" }} >
                    <AppBar position="static" color="primary" enableColorOnDark={true}>
                        <Toolbar>
                            <Box>
                                <Typography variant="body1" fontWeight={500} component="div" sx={{ flexGrow: 1 }} >{merged.character.alias}</Typography>
                                <Typography variant="body1" component="div">{merged.character.name}</Typography>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Grid container direction={"column"}>
                        <Grid item xs container
                            sx={{
                                textAlign: "center",
                                marginTop: 1
                            }}
                            borderColor="main.primary"

                        >
                            <Grid item xs >
                                <img
                                    src={merged.character.image}
                                    style={{
                                        "width": "335px",
                                        //"border": "1px solid black",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Grid
                                container
                                spacing={1}
                                justifyContent="center"
                                direction="row"
                                paddingBottom={1}
                            >
                                <Grid
                                    item
                                    container
                                    sm={3.25}
                                    direction={"column"}
                                    justifyContent="center"
                                >
                                    <For each={column1()}>{(statPair, i) =>
                                        <Grid item>
                                            <StatDisplay
                                                name={statPair.name}
                                                value={statPair.value}
                                                fontSize={statPair.fontSize}
                                                black={true}
                                            />
                                        </Grid>
                                    }</For>
                                </Grid>
                                <Grid item sm={3.25} container direction={"column"} justifyContent="center">
                                    <For each={column2()}>{(statPair, i) =>
                                        <Grid item>
                                            <StatDisplay
                                                name={statPair.name}
                                                value={statPair.value}
                                                fontSize={statPair.fontSize}
                                                black={true}
                                            />
                                        </Grid>
                                    }</For>
                                </Grid>
                                <Grid item sm={3.25} container direction={"column"} justifyContent="center">
                                    <For each={column3()}>{(statPair, i) =>
                                        <Grid item>
                                            <StatDisplay
                                                name={statPair.name}
                                                value={statPair.value}
                                                fontSize={statPair.fontSize}
                                                black={true}
                                            />
                                        </Grid>
                                    }</For>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            <Grid item xs backgroundColor="#bbb" style={{ "padding-top": "2px", "padding-bottom": "2px" }}>
                                <Show
                                    when={merged.character.weapons !== undefined && merged.character.weapons.length > 0}
                                    fallback={
                                        <Box sx={{ minHeight: 32 }} />
                                    }
                                >
                                    <For each={merged.character.weapons}>{(weapon, idx) =>
                                        <>
                                            <Grid container padding={0.5}>
                                                <Grid item sm={3} container direction={"column"}>
                                                    <Typography variant="body2" textAlign="left">
                                                        {weapon.name}
                                                    </Typography>
                                                </Grid>
                                                <Show
                                                    when={weapon.damage !== null && weapon.damage.length !== 0}
                                                    fallback={<Grid item xs={1} textAlign="center">-</Grid>}
                                                >
                                                    <Grid item xs={1.5}>
                                                        <Typography variant="body2" textAlign="center">
                                                            <For each={weapon.damage}>{(damage) =>
                                                                <Repeat times={damage.count}>
                                                                    <img src={
                                                                        damage.damage_type_id == 1 ?
                                                                            "/src/static/img/icons/blood_icon.svg" :
                                                                            "/src/static/img/icons/stun_icon.svg"
                                                                    } />
                                                                </Repeat>
                                                            }</For>
                                                        </Typography>
                                                    </Grid>
                                                </Show>
                                                <Show
                                                    when={weapon.rate_of_fire !== null}
                                                    fallback={<Grid item xs={1} textAlign="center">-</Grid>}
                                                >
                                                    <Grid item xs={1}>
                                                        <Typography variant="body2" textAlign="center">
                                                            <span style={{ "margin-right": "1px" }}>{weapon.rate_of_fire.toString()}</span>
                                                            <img src="/src/static/img/icons/rof_icon.svg" />
                                                        </Typography>
                                                    </Grid>
                                                </Show>
                                                <Show
                                                    when={weapon.ammunition !== null}
                                                    fallback={<Grid item xs={1} textAlign="center">-</Grid>}
                                                >
                                                    <Grid item xs={1}>
                                                        <Typography variant="body2" textAlign="center">
                                                            <span>
                                                                <span>{weapon.ammunition.toString()}</span>
                                                                <img
                                                                    src="/src/static/img/icons/ammo_icon.svg"
                                                                    style={{
                                                                        "filter": "brightness(0)"
                                                                    }}
                                                                />
                                                            </span>
                                                        </Typography>
                                                    </Grid>
                                                </Show>
                                                <Grid item sm={4.5}>
                                                    <Show
                                                        when={weapon.traits !== null && weapon.traits.length > 0}
                                                    >
                                                        {generateWeaponTraits(weapon.traits)}
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
                                <Typography variant="body1">
                                    <Grid
                                        container
                                        spacing={0}
                                        paddingBottom={1}
                                        paddingLeft={1}
                                    >
                                        {generateCharacterTraits(merged.character.traits)}
                                    </Grid>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper >
            </Grid>
            <Grid>
                <Paper id="printable-card-back" sx={{ "width": "498px", height: "700px", borderLeft: 2, }} >
                    <Box textAlign="center" paddingTop={1}>
                        <Typography
                            variant="body1"
                            fontWeight={500}
                            sx={{
                                display: "inline-block",
                                marginRight: 2
                            }}
                        >
                            {merged.character.alias}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                display: "inline-block"
                            }}
                        >
                            {merged.character.name}
                        </Typography>
                    </Box>

                    <Box padding={1} ref={setTraitReferenceRef}>
                        <Grid container direction={"column"}>
                            <For each={merged.character.traits}>{(trait, i) =>
                                <Grid item sx={{ textIndent: "0.5em hanging each-line" }}>
                                    <Typography
                                        variant="body2"
                                        fontWeight={700}
                                        sx={{
                                            display: "inline",
                                            marginRight: 1,
                                            fontSize: fontSize()
                                        }}
                                    >
                                        <span innerHTML={formatTraitName(trait)} />
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            display: "inline",
                                            fontSize: fontSize()
                                        }}
                                    >
                                        <span innerHTML={interpolateBmgIcons(trait.trait.description, false)} />
                                    </Typography>
                                </Grid>
                            }</For>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    </ThemeProvider>
}

