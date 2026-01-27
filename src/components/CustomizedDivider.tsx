import {Divider} from "@mui/material"
import {styled} from "@mui/material/styles"

type CustomizedDividerProps = {
    marginTop?: string
    marginBottom?: string
    color?: string
}

const CustomDivider = styled(Divider)<{
    marginTop?: string
    marginBottom?: string
    color?: string
}>(({marginTop, marginBottom, color}) => ({
    marginTop,
    marginBottom,
    borderColor: color
}))

const CustomizedDivider = ({marginTop, marginBottom, color}: CustomizedDividerProps) => {
    return(
<CustomDivider marginTop={marginTop} marginBottom={marginBottom} color={color}/>
    )
}
export default CustomizedDivider