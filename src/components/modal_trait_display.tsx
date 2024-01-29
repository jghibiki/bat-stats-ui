import { Icon, Chip, Modal, Card, CardContent, Typography, CircularProgress } from "@suid/material"
import { mergeProps, createSignal, Show, } from "solid-js";
import { createResource } from "solid-js";
import { GameDataService } from "../service/game_data_service";
import useTheme from "@suid/material/styles/useTheme"
import { icons } from "../constants";
import { interpolateBmgIcons, splitTraitNameAndSymbol } from "../utils/bmg_symbol_interpolate";

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

    const generateChip = (name) => {
        let [updatedName, icon] = splitTraitNameAndSymbol(name)

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
                        <span innerHTML={interpolateBmgIcons(merged.trait.name)} />
                    </Typography>
                    <Typography variant="body1">
                        <span innerHTML={interpolateBmgIcons(merged.trait.description)} />
                    </Typography>
                </CardContent>
            </Card>
        </Modal>
    </Show >
}