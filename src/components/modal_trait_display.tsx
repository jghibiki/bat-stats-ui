import { Icon, Chip, Modal, Card, CardContent, Typography, CircularProgress } from "@suid/material"
import { mergeProps, createSignal, Show, } from "solid-js";
import { createResource } from "solid-js";
import { GameDataService } from "../service/game_data_service";
import useTheme from "@suid/material/styles/useTheme"
import { icons } from "../constants";

export default function ModalTraitDisplay(props) {
    const merged = mergeProps({
        trait: null,
        name_override: null,
    }, props)

    const [open, setOpen] = createSignal(false)
    const theme = useTheme();

    const gameDataService: GameDataService = GameDataService.getInstance()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const transformText = (text: string) => {
        let alteredText = text
            .replaceAll('{+', '{PLUS_')
            .replaceAll('{-', '{LESS_')
            .replaceAll('-2MOV', '{MOV_MINUS_2_ICON}')
            .replaceAll('-4MOV', '{MOV_MINUS_4_ICON}')
            .replaceAll('-6MOV', '{MOV_MINUS_6_ICON}')
            .replaceAll('+2MOV', '{MOV_2_ICON}')
            .replaceAll('+4MOV', '{MOV_4_ICON}')
            .replaceAll('+6MOV', '{MOV_6_ICON}')
            .replaceAll('MOV+2', 'MOV_2')
            .replaceAll('MOV+4', 'MOV_4')
            .replaceAll('MOV+6', 'MOV_6')
            .replaceAll('MOV-2', 'MOV_MINUS_2')
            .replaceAll('MOV-4', 'MOV_MINUS_4')
            .replaceAll('MOV-6', 'MOV_MINUS_6')

        let white = true

        icons.map(icon => {
            const uppercaseIcon = icon.toUpperCase()
            if (alteredText.includes('{' + uppercaseIcon + '}')) {
                alteredText = alteredText.replaceAll(
                    '{' + uppercaseIcon + '}',
                    '<img src="src/static/img/icons/' + icon + '.svg" alt="' + icon + ' icon" ' +
                    'style="' +
                    'width: 25px;' +
                    'margin-bottom: -5px;' +
                    'display: inline;' +
                    (white ? 'filter: brightness(0) invert(1);' : '') +
                    '"/>'
                )
            }
        })

        return alteredText
    }

    const generateChip = (name) => {
        let alteredText = name
            .replaceAll('{+', '{PLUS_')
            .replaceAll('{-', '{LESS_')
            .replaceAll('-2MOV', '{MOV_MINUS_2_ICON}')
            .replaceAll('-4MOV', '{MOV_MINUS_4_ICON}')
            .replaceAll('-6MOV', '{MOV_MINUS_6_ICON}')
            .replaceAll('+2MOV', '{MOV_2_ICON}')
            .replaceAll('+4MOV', '{MOV_4_ICON}')
            .replaceAll('+6MOV', '{MOV_6_ICON}')
            .replaceAll('MOV+2', 'MOV_2')
            .replaceAll('MOV+4', 'MOV_4')
            .replaceAll('MOV+6', 'MOV_6')
            .replaceAll('MOV-2', 'MOV_MINUS_2')
            .replaceAll('MOV-4', 'MOV_MINUS_4')
            .replaceAll('MOV-6', 'MOV_MINUS_6')

        let updatedName = name
        let icon = null
        for (let iconName of icons) {
            const uppercaseIcon = iconName.toUpperCase()
            if (alteredText.includes('{' + uppercaseIcon + '}')) {
                console.log("!!")
                updatedName = updatedName.replaceAll('{' + uppercaseIcon + '}', '')
                icon = <Icon>
                    <img
                        src={"src/static/img/icons/" + iconName + ".svg"}
                        alt={iconName + " icon"}
                        style={{
                            "width": "25px",
                            "margin-left": "-3px",
                            "margin-top": "-1px",
                            "filter": "brightness(0) invert(1)",
                        }} />
                </Icon>
                break
            }
        }


        return <Chip
            onClick={handleOpen}
            onDelete={icon ? handleOpen : null}
            label={updatedName}
            deleteIcon={icon}
            variant="outlined" />
    }

    return <Show
        when={merged.trait !== null && merged.trait !== undefined}
        fallback={
            < CircularProgress />
        }
    >
        {generateChip(merged.trait.name)}
        <Modal
            open={open()}
            onClose={handleClose}
        >
            <Card sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: theme.palette.background.paper,
                boxShadow: "24px",
                p: 4,
            }}>
                <CardContent>
                    <Typography variant="h6">
                        <span innerHTML={transformText(merged.trait.name)} />
                    </Typography>
                    <Typography variant="body1">
                        <span innerHTML={transformText(merged.trait.description)} />
                    </Typography>
                </CardContent>
            </Card>
        </Modal>
    </Show >
}