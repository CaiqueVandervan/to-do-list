import { Modal, Box, Typography } from "@mui/material"
import CustomizedButton from "./CustomizedButton"

type ModalProps = {
    open: boolean
    label: string
    children?: React.ReactNode
}

const CustomizedModal = ({ open, label, children }: ModalProps) => {

    return (
        <Modal
            open={open}>
            <Box className="h-[100%] w-full flex justify-center items-center">
                <Box className="bg-white p-3 grid gap-3 rounded-[7px]">
                    <Typography className="flex justify-center">{label}</Typography>
                    {children}
                </Box>
            </Box>
        </Modal>
    )
}
export default CustomizedModal