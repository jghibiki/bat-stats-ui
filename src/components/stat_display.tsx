import { Paper, Grid, Typography, Stack, Box, AppBar, Toolbar, Theme } from "@suid/material"
import { mergeProps } from "solid-js";

export default function StatDisplay(props) {
    const merged = mergeProps({
        name: null,
        value: null
    }, props)

    const name = () => merged.name[0].toUpperCase() + merged.name.slice(1)

    return <Grid container justifyContent="center">
        <Grid item xs={9}
            borderColor="primary.dark"
            sx={{
                border: 2,
                borderRadius: "0% 0% 8px 8px",
                textAlign: "center",
                padding: 1
            }}
        >
            {name()}
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
            {merged.value}
        </Grid>
    </Grid>
}