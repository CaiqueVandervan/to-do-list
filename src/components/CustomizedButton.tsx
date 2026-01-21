import {Button, ButtonProps} from "@mui/material"
import {styled} from "@mui/material/styles"

type CustomizedButtonProps = ButtonProps & {
    label: string
    bgColor?: string
    hoverColor?: string
}

const ColorsButton = styled(Button)<{
    bgColor?: string
    hoverColor?: string
}>(({theme, bgColor, hoverColor}) => {
    const baseColor = bgColor ?? theme.palette.primary.main
    return{
        color: theme.palette.getContrastText(baseColor),
        backgroundColor: baseColor,
        "&:hover": {
            backgroundColor: hoverColor ?? baseColor
        }
    }
})

const CustomizedButton = ({label, bgColor, hoverColor, ...props}: CustomizedButtonProps ) => {

    return(
        <ColorsButton bgColor={bgColor} hoverColor={hoverColor} {...props}>{label}</ColorsButton>
    )
}
export default CustomizedButton