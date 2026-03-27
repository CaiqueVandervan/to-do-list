import Layout from "@/components/Layout"
import CustomizedDivider from "@/components/CustomizedDivider";
import CustomizedMenu from "@/components/CustomizedMenu";
import CustomizedAlert from "@/components/CustomizedAlert";
import ShinyText from "@/components/ShinyText";
import ChipsSection from "@/components/ChipsSection";
import TaskItem from "@/components/TaskItem";
import EditModal from "@/components/EditModal";
import DeleteModal from "@/components/DeleteModal";
import DeleteConcludedModal from "@/components/DeleteConcludedModal";
import FormSection from "@/components/FormSection";

import { Box, Typography, MenuItem, Slide } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckIcon from '@mui/icons-material/Check';

import { Task } from "@/models/Task"
import { ChipFilter } from "@/models/ChipFilter";
import { AlertState } from "@/models/AlertState";

import { capitalization } from "@/utils/capitalization";
import { formatDate } from "@/utils/formatDate";

import { useEffect, useState } from "react"

import { getTasks, updateTask } from "@/services/tasks"

const ToDoList = () => {

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [taskList, setTaskList] = useState<Task[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTask, setSelectedTask] = useState<Task>()
  const [editTask, setEditTask] = useState<string>("")
  const [showAlert, setShowAlert] = useState<AlertState>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [deletingTask, setDeletingTask] = useState<number | null>(null)
  const [openSlide, setOpenSlide] = useState<boolean>(false)
  const [chipFilter, setChipFilter] = useState<ChipFilter>("all")

  const loadTasks = async () => {
    try {
      setIsLoading(true)

      const resp = await getTasks()

      setTaskList(resp.map(tasks => ({
        ...tasks,
        concluded: Boolean(tasks.concluded)
      })
      ))
    } catch (error) {
      console.error(error)

      setShowAlert({
        message: (
          <Typography className="text-red-400">
            Erro ao buscar Tarefas.
          </Typography>
        )
      })
    }
    setIsLoading(false)
  }

  const handleConcluingTasks = async () => {
    if (!selectedTask) return
    try {

      await updateTask(selectedTask.id, {
        concluded: !selectedTask.concluded
      })

      setTaskList(prev =>
        prev.map(task =>
          task.id === selectedTask.id
            ? { ...task, concluded: !selectedTask.concluded }
            : task))

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
              {capitalization(selectedTask?.task_name || "")}
            </Typography>
            {selectedTask?.concluded
              ? <ShinyText text={`" esta pendente novamente.`}
                speed={3}
                color="white"
                shineColor="#9370db"
                spread={160}
                direction="left" />
              : <ShinyText text={`" marcada como concluída.`}
                speed={3}
                color="white"
                shineColor="#9370db"
                spread={160}
                direction="left" />}
          </Box>
        )
      })

    } catch (error) {
      console.error(error)

      setShowAlert({
        message: (
          <Typography className="text-red-400">
            Erro ao concluir Tarefa.
          </Typography>
        )
      })
    }
    setAnchorEl(null)
  }

  const handleOpenEdit = () => {
    setOpenModalEdit(true)
    setAnchorEl(null)
  }

  const handleOpenDelete = () => {
    setOpenDeleteModal(true)
    setAnchorEl(null)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>,
    task: Task
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedTask(task)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() =>
      setOpenSlide(true), 500)

    return () =>
      clearTimeout(timer)
  }, [openSlide])

  return (
    <Layout>

      {showAlert &&
        <CustomizedAlert
          message={showAlert.message}
          duration={4000}
          onClose={() => setShowAlert(null)} />
      }

      <Slide
        direction="up"
        in={openSlide}
        mountOnEnter
        unmountOnExit>

        <Box className="p-5 bg-white rounded-3xl">

          <FormSection
            setTaskList={setTaskList}
            setShowAlert={setShowAlert} />

          <CustomizedDivider
            marginTop="1.25rem"
            marginBottom="0.5rem"
            color="#4e54c8" />

          <ChipsSection
            chipFilter={chipFilter}
            setChipFilter={setChipFilter} />

          <TaskItem
            isLoading={isLoading}
            chipFilter={chipFilter}
            taskList={taskList}
            setTaskList={setTaskList}
            deletingTask={deletingTask}
            setDeletingTask={setDeletingTask}
            handleOpenMenu={handleOpenMenu}
          />

          <CustomizedMenu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            elevation={10}
            onClose={() => setAnchorEl(null)}>

            <MenuItem
              onClick={handleOpenEdit}>
              <EditIcon /> Editar
            </MenuItem>

            <MenuItem
              onClick={handleOpenDelete}>
              <DeleteForeverIcon />Deletar
            </MenuItem>

            <MenuItem
              onClick={handleConcluingTasks}>
              <CheckIcon />{selectedTask?.concluded
                ? "Desmarcar como concluído"
                : "Marcar como concluído"}
            </MenuItem>

            <CustomizedDivider color="#9370db" />

            <MenuItem disabled>
              <CalendarMonthIcon />
              {selectedTask && formatDate(selectedTask.created_at)}
            </MenuItem>

          </CustomizedMenu>

          <EditModal
            editTask={editTask}
            setEditTask={setEditTask}
            selectedTask={selectedTask}
            setTaskList={setTaskList}
            setShowAlert={setShowAlert}
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
          />

          <DeleteModal
            selectedTask={selectedTask}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            setDeletingTask={setDeletingTask}
            setShowAlert={setShowAlert}
          />

          <CustomizedDivider
            marginTop="0.5rem"
            color="#4e54c8" />

          <Box className="flex justify-between mt-5">
            <Box className="flex gap-1.5 items-center">
              <DoneAllIcon className="text-gray-700" fontSize="small" />
              <Typography fontSize={14}>
                {`Tarefas concluídas (${taskList.filter(task => task.concluded).length}/${taskList.length})`}
              </Typography>
            </Box>
            <Box>
              <DeleteConcludedModal
                setTaskList={setTaskList}
                setShowAlert={setShowAlert}
              />
            </Box>
          </Box>

          <Box className="mt-4 h-2 bg-slate-200 rounded">
            <Box className="bg-[#9370db] h-full rounded transition-all delay-150"
              style={{
                width: taskList.length > 0
                  ? `${taskList.filter(conc => conc.concluded).length / taskList.length * 100}%`
                  : "0%"
              }} />
          </Box>

          <Box className="mt-3 flex items-center justify-end gap-1">
            <BarChartIcon className="text-gray-700" fontSize="small" />
            <Typography fontSize={14}>{`Total de Tarefas: ${taskList.length}`}</Typography>
          </Box>

        </Box>

      </Slide>

    </Layout>
  )
}

export default ToDoList