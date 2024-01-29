import { Icon } from "@suid/material"
import { icons } from "../constants"

const mapSymbols = (text: String) => {
    return text
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
}

export const interpolateBmgIcons = (text: string, white: null | boolean) => {
    let alteredText = mapSymbols(text)

    white = white === true

    const updatedText = icons.map(icon => {
        const uppercaseIcon = icon.toUpperCase()
        if (alteredText.includes('{' + uppercaseIcon + '}')) {
            let width = 25
            let offset = -5
            if (
                icon.includes("stun") ||
                icon.includes("blood") ||
                icon.includes("rank") ||
                icon.includes("def_icon")
            ) {
                width = 15
                offset = -2
            }
            else if (
                icon.includes("special_icon")
            ) {
                width = 16
                offset = -4
            }

            alteredText = alteredText.replaceAll(
                '{' + uppercaseIcon + '}',
                '<img src="/src/static/img/icons/' + icon + '.svg" alt="' + icon + ' icon" ' +
                'style="' +
                'width: ' + width + 'px;' +
                'margin-bottom: ' + offset + 'px;' +
                'display: inline;' +
                (white ? 'filter: brightness(0) invert(1);' : '') +
                '"/>'
            )
        }

    })

    return alteredText.replaceAll(
        '<img src="../../Content/images/Unknown/seasonalcriminal.png" class="rounded img-fluid" />',
        '<img src="/src/static/img/misc/seasonalcriminal.png" class="rounded img-fluid" height="50%" /><br/>',
    )
}


export const splitTraitNameAndSymbol = (name) => {
    let alteredText = mapSymbols(name)

    let updatedName = name
    let icon = null
    for (let iconName of icons) {
        const uppercaseIcon = iconName.toUpperCase()
        if (alteredText.includes('{' + uppercaseIcon + '}')) {
            console.log("!!")
            updatedName = updatedName.replaceAll('{' + uppercaseIcon + '}', '')
            icon = <Icon>
                <img
                    src={"/src/static/img/icons/" + iconName + ".svg"}
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

    return (updatedName, icon)
}