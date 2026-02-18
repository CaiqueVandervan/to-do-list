import { Tooltip, tooltipClasses, TooltipProps, Zoom } from "@mui/material";
import { styled } from "@mui/material/styles"

const CustomizedTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props}
        arrow
        slots={{
            transition: Zoom
        }}
        slotProps={{
            popper: {
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, -7.5]
                        }
                    }
                ]
            }
        }}
        classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#4e54c8",
        color: "white",
        boxShadow: theme.shadows[7],
        fontSize: 12
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: "#4e54c8"
    }
}))
export default CustomizedTooltip