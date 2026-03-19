import { Chip, ChipProps } from "@mui/material"
import { styled } from "@mui/material/styles"

type CustomizedChipProps = ChipProps & {
    label?: string
    bgColor?: string
    borderColor?: string
    hoverColor?: string
    selectedColor?: string
}

const ColorChip = styled(Chip)<{
    bgColor?: string
    hoverColor?: string
    borderColor?: string
    selectedColor?: string
    isSelected?: boolean
    variant?: "filled" | "outlined"
}>(({ bgColor, variant, hoverColor, borderColor, selectedColor, isSelected }) => ({

    backgroundColor: variant === "filled" ? selectedColor : bgColor,

    border: variant === "filled" && isSelected ? `1px solid ${borderColor}` : `1px solid ${borderColor}`,

    "&:hover": {
        backgroundColor: hoverColor
    },

    "& .MuiChip-icon": {
        color: "#212121",
        fontSize: "18px"
    }
}))

const CustomizedChip = ({ label, bgColor, hoverColor, borderColor, selectedColor, ...props }: CustomizedChipProps) => {

    return (
        <ColorChip {...props}
            label={label}
            bgColor={bgColor}
            hoverColor={hoverColor}
            borderColor={borderColor}
            selectedColor={selectedColor}
        />
    )
}

export default CustomizedChip