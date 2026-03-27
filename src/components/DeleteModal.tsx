import CustomizedModal from "./CustomizedModal"
import CustomizedButton from "./CustomizedButton"
import ShinyText from "./ShinyText"

import { Task } from "@/models/Task"
import { AlertState } from "@/models/AlertState"

import { Box, Typography } from "@mui/material"

import { capitalization } from "@/utils/capitalization"

import { deleteTask } from "@/services/tasks"

import { Dispatch, SetStateAction } from "react"


type DeleteModalProps = {
    selectedTask: Task | undefined
    openDeleteModal: boolean
    setOpenDeleteModal: Dispatch<SetStateAction<boolean>>
    setDeletingTask: Dispatch<SetStateAction<number | null>>
    setShowAlert: Dispatch<SetStateAction<AlertState>>
}

const DeleteModal = ({ selectedTask, openDeleteModal, setOpenDeleteModal, setDeletingTask, setShowAlert }: DeleteModalProps) => {

    const handleDeleteTasks = async () => {
        if (!selectedTask) return
        try {
            await deleteTask(selectedTask.id)

            setDeletingTask(selectedTask.id)

            setShowAlert({
                message: (
                    <Box className="flex">

                        <ShinyText
                            text={`Tarefa "`}
                            speed={3}
                            color="white"
                            shineColor="#9370db"
                            spread={160}
                            direction="left"
                        />

                        <Typography className="text-[#9370db]">
                            {capitalization(selectedTask.task_name)}
                        </Typography>

                        <ShinyText
                            text={`" deletada com sucesso!`}
                            speed={3}
                            color="white"
                            shineColor="#9370db"
                            spread={160}
                            direction="left"
                        />

                    </Box>
                )
            })
        } catch (error) {
            console.error(error)

            setShowAlert({
                message: (
                    <Typography className="text-red-400">
                        Erro ao deletar Tarefa.
                    </Typography>
                )
            })
        }
        setOpenDeleteModal(false)
    }

    return (
        <CustomizedModal
            open={openDeleteModal}
            label="Tem certeza que deseja excluir esta tarefa?">

            <Box className="flex justify-center">
                <Typography className="flex">
                    "
                    <Typography className="text-[#9370db]">
                        {`${selectedTask && capitalization(selectedTask.task_name)}`}
                    </Typography>
                    "
                </Typography>
            </Box>

            <Box className="flex justify-center gap-1.5">
                <CustomizedButton
                    label="Sim"
                    bgColor="#4e54c8"
                    hoverColor="#4a0072"
                    variant="contained"
                    size="small"
                    onClick={handleDeleteTasks} />

                <CustomizedButton
                    label="Cancelar"
                    bgColor="#9370db"
                    hoverColor="#ce93d8"
                    variant="contained"
                    size="small"
                    onClick={() => setOpenDeleteModal(false)} />
            </Box>

        </CustomizedModal>
    )
}

export default DeleteModal