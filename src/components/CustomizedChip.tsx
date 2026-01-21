import { useState } from "react"
import {Chip, ChipProps} from "@mui/material"
import {styled} from "@mui/material/styles"

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
}>(({bgColor, hoverColor, borderColor, selectedColor, isSelected}) => ({
backgroundColor: isSelected ? selectedColor : bgColor,
border: `1px solid ${borderColor}`,
"&:hover": {
    backgroundColor: hoverColor
},
}))

const CustomizedChip = ({label, bgColor,hoverColor, borderColor, selectedColor, ...props}: CustomizedChipProps ) => {
    
    const [isSelected, setIsSelected] = useState(false)
    const handleClick = () => {
        setIsSelected(prev => !prev)
    }
    return(
<ColorChip {...props} label={label} bgColor={bgColor} hoverColor={hoverColor} borderColor={borderColor} isSelected={isSelected} selectedColor={selectedColor} onClick={() => {
    handleClick()
}}/>
    )
}

export default CustomizedChip