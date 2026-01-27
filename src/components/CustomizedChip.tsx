import { useState } from "react"
import {Chip, ChipProps} from "@mui/material"
import {styled} from "@mui/material/styles"

type CustomizedChipProps = ChipProps & {
    label?: string
    bgColor?: string
    borderColor?: string
    hoverColor?: string
    selectedColor?: string
    selectedBorderColor?: string
}

const ColorChip = styled(Chip)<{
    bgColor?: string
    hoverColor?: string
    borderColor?: string
    selectedColor?: string
    selectedBorderColor?: string
    isSelected?: boolean
}>(({bgColor, hoverColor, borderColor, selectedColor, selectedBorderColor, isSelected}) => ({
backgroundColor: isSelected ? selectedColor : bgColor,
border: isSelected ? `1px solid ${selectedBorderColor}` : `1px solid ${borderColor}`,
"&:hover": {
    backgroundColor: hoverColor
},
"& .MuiChip-icon": {
    color: isSelected ? "#212121" : "#212121",
    fontSize: "18px"
}
}))

const CustomizedChip = ({label, bgColor,hoverColor, borderColor, selectedColor, selectedBorderColor, ...props}: CustomizedChipProps ) => {
    
    const [isSelected, setIsSelected] = useState(false)
    const handleClick = () => {
        setIsSelected(prev => !prev)
    }
    return(
<ColorChip {...props} label={label} bgColor={bgColor} hoverColor={hoverColor} borderColor={borderColor} selectedBorderColor={selectedBorderColor} isSelected={isSelected} selectedColor={selectedColor} onClick={() => {
    handleClick()
}}/>
    )
}

export default CustomizedChip