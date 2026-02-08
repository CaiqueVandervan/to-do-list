import { Menu, MenuProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const CustomizedMenu = styled((props: MenuProps) => (
    <Menu
        elevation={10}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right"
        }}
        {...props} />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 7,
        marginTop: theme.spacing(1),
        minWidth: 120,
        color: "rgba(0, 0, 0, 0.87)",
        '& .MuiMenu-list': { padding: '4px 0' },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: "gray[700]",
                marginRight: theme.spacing(1)
            },
            "&:active": {
                backgroundColor: alpha("#4B0082", 0.2)
            },
            "&.Mui-disabled": {
                opacity: 1
            }
        }
    }
}))
export default CustomizedMenu