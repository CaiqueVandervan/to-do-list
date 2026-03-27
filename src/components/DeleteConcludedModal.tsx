import CustomizedModal from "./CustomizedModal"
import CustomizedButton from "./CustomizedButton"
import ShinyText from "./ShinyText";

import { Box, Typography } from "@mui/material"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { Task } from "@/models/Task";
import { AlertState } from "@/models/AlertState";

import { Dispatch, SetStateAction, useState } from "react"

import { deleteConcludedTasks } from "@/services/tasks";

type DeleteConcludedModalProps = {
  setTaskList: Dispatch<SetStateAction<Task[]>>
  setShowAlert: Dispatch<SetStateAction<AlertState>>
}

const DeleteConcludedModal = ({ setTaskList, setShowAlert }: DeleteConcludedModalProps) => {

  const [openDeleteConcludedTasksModal, setOpenDeleteConcludedTasksModal] = useState<boolean>(false)

  const handleDeleteConcludedTasks = async () => {
    try {

      await deleteConcludedTasks()

      setTaskList(prev => prev.filter(task => task.concluded !== true))

      setShowAlert({
        message: (
          <ShinyText
            text={"Tarefas concluídas deletadas com sucesso!"}
            speed={3}
            color="white"
            shineColor="#9370db"
            spread={160}
            direction="left"
          />
        )
      })
    } catch (error) {
      console.error(error)

      setShowAlert({
        message: (
          <Typography className="text-red-400">
            Erro ao excluir Tarefas concluídas.
          </Typography>
        )
      })
    }
    setOpenDeleteConcludedTasksModal(false)
  }

  return (
    <Box>
      <CustomizedButton
        bgColor="#4e54c8"
        hoverColor="#302b63"
        label="Limpar tarefas concluídas"
        variant="contained"
        startIcon={<DeleteForeverIcon />}
        size="small"
        onClick={() => setOpenDeleteConcludedTasksModal(true)} />

      <CustomizedModal
        open={openDeleteConcludedTasksModal}
        label="Tem certeza que deseja excluir todas as tarefas concluídas?">

        <Box className="flex justify-center gap-1.5">

          <CustomizedButton
            label="Sim"
            bgColor="#4e54c8"
            hoverColor="#4a0072"
            variant="contained"
            size="small"
            onClick={handleDeleteConcludedTasks} />

          <CustomizedButton
            label="Cancelar"
            bgColor="#9370db"
            hoverColor="#ce93d8"
            variant="contained"
            size="small"
            onClick={() => setOpenDeleteConcludedTasksModal(false)} />

        </Box>

      </CustomizedModal>
    </Box>
  )
}

export default DeleteConcludedModal