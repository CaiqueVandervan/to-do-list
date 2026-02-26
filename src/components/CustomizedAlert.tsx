import { Box } from "@mui/material"

type AlertProps = {
    message: React.ReactNode
}

const CustomizedAlert = ({message}: AlertProps) => {
    
    return (
        <Box className="fixed flex items-center justify-center top-[157px] rounded-lg h-8 max-w-[1000px] px-3 text-white bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#4e54c8] shadow-lg">
            {message}
        </Box>
    )
}
export default CustomizedAlert