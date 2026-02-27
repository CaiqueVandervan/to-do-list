import { Box, Zoom } from "@mui/material"
import { useEffect, useState } from "react"

type AlertProps = {
    message: React.ReactNode
    duration: number
    onClose: () => void
}

const CustomizedAlert = ({ message, duration, onClose }: AlertProps) => {

    const [open, setOpen] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() =>
            setOpen(false), duration)

        return () => clearTimeout(timer)
    }, [message])

    return (
        <Zoom in={open}
            onExited={onClose}>
            <Box className="fixed flex items-center justify-center top-[157px] rounded-lg h-8 max-w-[1000px] px-3 text-white bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#4e54c8] shadow-lg">
                {message}
            </Box>
        </Zoom>
    )
}
export default CustomizedAlert