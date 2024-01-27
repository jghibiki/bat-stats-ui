import { Paper, Grid, Typography, Stack, Box, AppBar, Toolbar, Theme } from "@suid/material"
import { mergeProps } from "solid-js";

export default function StatDisplay(props) {
    const merged = mergeProps({
        name: null,
        value: null,
        fontSize: "body1"
    }, props)

    const name = () => merged.name[0].toUpperCase() + merged.name.slice(1)

    return <Grid container justifyContent="center">
        <Grid item xs={8}
            borderColor="primary.dark"
            sx={{
                border: 3,
                borderRadius: "8px 0px 0px 8px",
                textAlign: "center",
                padding: 1
            }}
        >
            <Typography variant={merged.fontSize}>
                {name()}
            </Typography>
        </Grid>
        <Grid item xs={4}
            borderColor="primary.main"
            sx={{
                border: 2,
                borderRadius: "0px 8px 8px 0px",
                textAlign: "center",
                padding: 1
            }}
        >
            <Typography variant={merged.fontSize}>
                {merged.value}
            </Typography>
        </Grid>
    </Grid>
}