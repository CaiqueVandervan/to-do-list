import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles"

const CustomizedTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#7b1fa2",
        color: "white",
        boxShadow: theme.shadows[7],
        fontSize: 12
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "#7b1fa2"
    }
}))
export default CustomizedTooltip