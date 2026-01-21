import {Divider} from "@mui/material"
import {styled} from "@mui/material/styles"

type CustomizedDividerProps = {
    margin?: string
    color?: string
}

const CustomDivider = styled(Divider)<{
    margin?: string
    color?: string
}>(({margin, color}) => ({
    margin: margin,
    borderColor: color
}))

const CustomizedDivider = ({margin, color}: CustomizedDividerProps) => {
    return(
<CustomDivider margin={margin} color={color}/>
    )
}
export default CustomizedDivider