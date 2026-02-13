import { styled } from "@mui/material/styles"
import { Link, LinkProps } from "@mui/material"

const CustomLink = styled(Link)(() => ({
    color: "#9370db",
    "&.hover": {
        color: "#9333ea",
    }
}))

const CustomizedLink = ({ ...props }: LinkProps) => {
    return (
        <CustomLink {...props} />
    )
}
export default CustomizedLink