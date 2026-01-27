import { TextField, TextFieldProps } from "@mui/material"
import { styled } from "@mui/material/styles"

type CustomizedTextFieldProps = TextFieldProps & {
    label: string
    topTitleColor?: string
    borderColor?: string
    hoverColor?: string
    focusColor?: string
}

const ColorsTextField = styled(TextField)<{
    topTitleColor?: string
    borderColor?: string
    hoverColor?: string
    focusColor?: string
}>(({ topTitleColor, borderColor, hoverColor, focusColor }) => ({
    "& label.Mui-focused": {
        color: topTitleColor
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor
        },
        "&:hover fieldset": {
            borderColor: hoverColor
        },
        "&.Mui-focused fieldset": {
            borderColor: focusColor
        }
    }
}
))

const CustomizedTextField = ({ topTitleColor, borderColor, hoverColor, focusColor, label, ...props }: CustomizedTextFieldProps) => {
    return (
        <ColorsTextField topTitleColor={topTitleColor} borderColor={borderColor} hoverColor={hoverColor} focusColor={focusColor} label={label} {...props} />
    )
}
export default CustomizedTextField