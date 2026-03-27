import CustomizedModal from "./CustomizedModal"
import CustomizedTextField from "./CustomizedTextField"
import CustomizedButton from "./CustomizedButton"
import ShinyText from "./ShinyText"

import { Task } from "@/models/Task"
import { AlertState } from "@/models/AlertState"

import { Box, Typography } from "@mui/material"

import { useEffect, useRef, Dispatch, SetStateAction } from "react"

import { capitalization } from "@/utils/capitalization"

import { updateTask } from "@/services/tasks"

type EditModalProps = {
    editTask: string
    setEditTask: Dispatch<SetStateAction<string>>
    selectedTask: Task | undefined
    setTaskList: Dispatch<SetStateAction<Task[]>>
    setShowAlert: Dispatch<SetStateAction<AlertState>>
    openModalEdit: boolean
    setOpenModalEdit: Dispatch<SetStateAction<boolean>>
}

const EditModal = ({ editTask, setEditTask, selectedTask, setTaskList, setShowAlert, openModalEdit, setOpenModalEdit }: EditModalProps) => {


    const ref = useRef<HTMLInputElement>()

    const handleEditTasks = async () => {
        if (!selectedTask) return
        try {
            await updateTask(selectedTask.id, {
                task_name: editTask
            })

            setTaskList(prev =>
                prev.map(task =>
                    task.id === selectedTask.id
                        ? { ...task, task_name: editTask }
                        : task))

            setShowAlert({
                message: (
                    <Box className="flex">
                        <ShinyText
                            text={`A Tarefa "`}
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
                            text={`" foi editada para "`}
                            speed={3}
                            color="white"
                            shineColor="#9370db"
                            spread={160}
                            direction="left"
                        />

                        <Typography className="text-[#9370db]">
                            {capitalization(editTask)}
                        </Typography>

                        <ShinyText
                            text={`".`}
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
                        Erro ao editar Tarefa.
                    </Typography>
                )
            })
        }
        setOpenModalEdit(false)
    }

    useEffect(() => {
        if (!selectedTask) return
        if (openModalEdit) {
            setEditTask(capitalization(selectedTask.task_name)?.trim() || ""),
                setTimeout(() =>
                    ref.current?.focus())
        }
    }, [openModalEdit])

    return (
        <CustomizedModal open={openModalEdit} label="Editar esta tarefa?">
            <CustomizedTextField className="w-full"
                label="Editar"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                topTitleColor="#9370db"
                topPermaColor="#9370db"
                hoverColor="#4a0072"
                borderColor="#4e54c8"
                focusColor="#4e54c8"
                inputRef={ref} />

            <Box className="flex justify-center gap-1.5">
                <CustomizedButton
                    label="Salvar"
                    bgColor="#4e54c8"
                    hoverColor="#302b63"
                    variant="contained"
                    size="small"
                    disabled={editTask.trim() === "" || editTask.trim().toLowerCase() === selectedTask?.task_name.trim().toLowerCase()}
                    onClick={handleEditTasks} />

                <CustomizedButton
                    label="Cancelar"
                    bgColor="#9370db"
                    hoverColor="#ce93d8"
                    variant="contained"
                    size="small"
                    onClick={() => setOpenModalEdit(false)} />
            </Box>
        </CustomizedModal>
    )
}

export default EditModal