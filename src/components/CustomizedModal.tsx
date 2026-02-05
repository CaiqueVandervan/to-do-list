import { Modal, Box, Typography } from "@mui/material"
import CustomizedButton from "./CustomizedButton"

type ModalProps = {
    open: boolean
    onClose: () => void
    label: string
    children?: React.ReactNode
}

const CustomizedModal = ({ open, onClose, label, children }: ModalProps) => {

    return (
        <Modal
            open={open}
            onClose={onClose}>
            <Box className="h-[100%] w-full flex justify-center items-center">
                <Box className="bg-white p-3 grid gap-3 rounded">
                    <Typography className="flex justify-center">{label}</Typography>
                    {children}
                    <Box className="flex justify-center gap-1.5">
                        <CustomizedButton label="Sim" bgColor="#7b1fa2" hoverColor="#4a0072" variant="contained" size="small" onClick={onClose} />
                        <CustomizedButton label="Cancelar" bgColor="#9370DB" hoverColor="#CE93D8" variant="contained" size="small" onClick={onClose} />
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}
export default CustomizedModal