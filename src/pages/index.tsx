import Layout from "@/components/Layout"
import CustomizedButton from "@/components/CustomizedButton"
import CustomizedTextField from "@/components/CustomizedTextField";
import CustomizedDivider from "@/components/CustomizedDivider";
import CustomizedChip from "@/components/CustomizedChip";
import { Card, Box, Typography, IconButton, InputAdornment, Zoom, MenuItem, Grow } from "@mui/material"
import PostAddIcon from "@mui/icons-material/PostAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useEffect, useState } from "react"
import CancelIcon from "@mui/icons-material/Cancel";
import CustomizedModal from "@/components/CustomizedModal"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomizedTooltip from "@/components/CustomizedTooltip";
import CustomizedMenu from "@/components/CustomizedMenu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckIcon from '@mui/icons-material/Check';
import { Task } from "@/models/Task"
import Alert from "@/components/Alert";

type AlertState = {
  message: React.ReactNode
} | null

const ToDoList = () => {

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openDeleteTasksModal, setOpenDeleteTasksModal] = useState(false)
  const [value, setValue] = useState("")
  const [taskList, setTaskList] = useState<Task[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTask, setSelectedTask] = useState<Task>()
  const [editTask, setEditTask] = useState<string>("")
  const [concluded, setConcluded] = useState<boolean>(false)
  const [showAlert, setShowAlert] = useState<AlertState>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const maxLength = 40

  const getTask = async () => {
    try {
      setIsLoading(true)

      await new Promise<void>((resolve) => {
        window.setTimeout(() => {
          resolve()
        }, 2000)
      })

      const getTasks = await fetch("/api/tasks/tasks", {
        method: "GET"
      })
      const resp = await getTasks.json()
      setTaskList(resp)

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTask()
  }, [])

  const postTasks = async (task: string) => {
    if (task.trim() === "") {
      setShowAlert({
        message: (
          <Typography>Digite sua Tarefa para adicionar</Typography>
        )
      })
      setTimeout(() => setShowAlert(null), 3000)
      return
    }
    try {
      const novaTask = await fetch("/api/tasks/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          task_name: task
        })
      })
      const data = await novaTask.json()
      setValue("")
      setTaskList(prev => [...prev, data])

      getTask()

      setShowAlert({
        message: (
          <Typography className="flex">Tarefa "<Typography className="text-[#9370db]">{value}</Typography>" adicionada com sucesso</Typography>
        )
      })

      setTimeout(() =>
        setShowAlert(null), 3000)
    } catch (error) {
      console.error("caiqewue", error)
    }
  }

  const updateTasks = async (taskName: string, id: number) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          task_name: taskName
        })
      })
      if (!selectedTask) return
      setTaskList(prev => prev.map(task => task.id === selectedTask.id ? { ...task, task_name: editTask } : task))
    } catch (error) {
      console.warn("NãO FOIU", error)
    }
  }

  const handleEditTasks = async () => {
    if (!selectedTask) return
    await updateTasks(editTask, selectedTask.id)
    setOpenModalEdit(false)
  }

  const deleteTasks = async (id: number) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    })
    setTaskList(prev => prev.filter(task => task.id !== id))
  }

  const handleCloseDelete = async () => {
    if (!selectedTask) return
    const id = selectedTask.id
    await deleteTasks(id)
    setOpenDeleteModal(false)

    setShowAlert({
      message: (
        <Typography className="flex">
          Tarefa "
          <Typography className="text-[#9370db]">{selectedTask.task_name}</Typography>
          " deletada com sucesso.
        </Typography>
      )
    })

    setTimeout(() =>
      setShowAlert(null), 3000)
  }

  const concluingTasks = async (id: number, concluing: boolean) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "CONCLUDED",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          concluded: concluing
        })
      })
      if (!selectedTask) return
      setTaskList(prev => prev.map(task => task.id === selectedTask.id ? { ...task, concluded: concluded } : task))
    } catch (error) {
      console.warn(error)
    }
  }

  const handleConcludedTasks = async () => {
    if (!selectedTask) return
    await concluingTasks(selectedTask.id, concluded)
    setConcluded(true)
  }

  const handleOpenEdit = () => {
    setOpenModalEdit(true)
    setAnchorEl(null)
  }

  const handleOpenDelete = () => {
    setOpenDeleteModal(true)
    setAnchorEl(null)
  }

  const handleOpenDeleteTasks = () => {
    setOpenDeleteTasksModal(true)
  }

  const handleCloseDeleteTasks = () => {
    setOpenDeleteTasksModal(false)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>,
    task: Task
  ) => {
    setAnchorEl(event.currentTarget)
    setSelectedTask(task)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const formatDate = (date: string) => {
    if (!date) return
    const [year, month, day] = date.split("T")[0].split("-")
    const hour = date.split("T")[1]
    const realHour = hour.split(":")[0]
    const minutes = hour.split(":")[1]
    return `${day}/${month}/${year} as ${realHour}:${minutes}`
  }

  const capitalization = (text: string) => {
    if (!text) return
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  useEffect(() => {
    if (!selectedTask) return
    if (openModalEdit) {
      setEditTask(capitalization(selectedTask.task_name)?.trim() || "")
    }
  }, [openModalEdit])

  return (
    <Layout>

      {showAlert && <Alert message={showAlert.message} />}

      <Card className="p-5">

        <Box className="flex gap-3">
          <CustomizedTextField className="w-60"
            value={value}
            onChange={(digitado) => {
              setValue(digitado.target.value)
            }}
            slotProps={{
              htmlInput: {
                maxLength: maxLength
              },
              input: {
                endAdornment: value && (<InputAdornment position="end"><IconButton onClick={() => setValue("")}
                  size="small"><CancelIcon className="text-gray-700" fontSize="small" /></IconButton></InputAdornment>)
              }
            }}
            helperText={<Typography component="span" fontSize={14} className={value.length === maxLength ? "text-[#9370db]" : "text-[#212121]"}> {value.length === maxLength ? `Limite de caracteres atingido!` : `${value.length}/${maxLength} caracteres`} </Typography>}
            topTitleColor="#9370db"
            hoverColor="#4a0072"
            borderColor="#4e54c8"
            focusColor="#4e54c8"
            label="Digite sua nova Tarefa"
            size="medium" />
          <Box>
            <CustomizedButton className="w-60 h-14"
              bgColor="#4e54c8"
              hoverColor="#302b63"
              label="Adicionar"
              variant="contained"
              startIcon={<PostAddIcon />}
              size="large"
              onClick={() => postTasks(value)}
            />
          </Box>
        </Box>

        <CustomizedDivider
          marginTop="1.25rem"
          marginBottom="0.5rem"
          color="#4e54c8" />

        <Box className="flex gap-3">
          <CustomizedChip
            label="Todos"
            bgColor="white"
            hoverColor="#c084fc"
            borderColor="#4e54c8"
            selectedColor="#9370db"
            selectedBorderColor="#4e54c8"
            icon={<FormatListBulletedIcon />} />

          <CustomizedChip
            label="Pendentes"
            bgColor="white"
            hoverColor="#c084fc"
            borderColor="#4e54c8"
            selectedColor="#9370db"
            selectedBorderColor="#4e54c8"
            icon={<PendingActionsIcon />} />

          <CustomizedChip
            label="Concluídos"
            bgColor="white"
            hoverColor="#c084fc"
            borderColor="#4e54c8"
            selectedColor="#9370db"
            selectedBorderColor="#4e54c8"
            icon={<ChecklistRtlIcon />} />
          <Box className="flex gap-1 flex-1 justify-center">

            <Box className="grid gap-1">
              <Box className="bg-[#9370db] w-7 h-4 rounded"></Box>
              <Box className="bg-[#3b0764] w-7 h-4 rounded"></Box>
            </Box>

            <Box className="grid gap-1">
              <Box className="flex items-center h-4">
                <Typography fontSize={14}>Pendentes</Typography>
              </Box>
              <Box className="flex items-center h-4">
                <Typography fontSize={14}>Concluídos</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="mt-4 border-b-2">
          {isLoading && (
           <Box></Box>
          )}
          {taskList.map(task => (
            <Grow
              in
              timeout={1000}
              key={task.id}>
              <Box className="h-20 flex justify-between items-center border-t-2">
                <Box className={task.concluded ? `bg-[#3b0764] h-full w-1` : `bg-[#9370db] h-full w-1`} />
                <Typography className="flex-1 pl-2">{
                  capitalization(task.task_name)}</Typography>
                <Box>
                  <CustomizedTooltip
                    title="Detalhes">
                    <IconButton onClick={(eventClick) => handleOpenMenu(eventClick, task)}>
                      <MoreVertIcon className="text-gray-700" fontSize="small" />
                    </IconButton>
                  </CustomizedTooltip>
                </Box>
              </Box>
            </Grow>
          ))}
        </Box>

        <CustomizedMenu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          elevation={10}
          onClose={handleCloseMenu}>
          <MenuItem onClick={handleOpenEdit}>
            <EditIcon /> Editar
          </MenuItem>
          <MenuItem onClick={handleOpenDelete}>
            <DeleteForeverIcon />Deletar
          </MenuItem>
          <MenuItem onClick={handleConcludedTasks}>
            <CheckIcon />{selectedTask?.concluded ? "Desmarcar como concluído" : "Marcar como concluído"}
          </MenuItem>
          <CustomizedDivider color="#9370db" />
          <MenuItem disabled>
            <CalendarMonthIcon />
            {selectedTask && formatDate(selectedTask.created_at)}
          </MenuItem>
        </CustomizedMenu>


        <CustomizedModal open={openModalEdit} label="Editar esta tarefa?">
          {editTask.trim() === "" && (
            <Typography className="flex justify-center text-[#9370db]">A Tarefa não pode ter nome em branco</Typography>
          )}
          <CustomizedTextField className="w-full"
            label="Editar"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            topTitleColor="#9370db"
            topPermaColor="#9370db"
            hoverColor="#4a0072"
            borderColor="#4e54c8"
            focusColor="#4e54c8" />
          <Box className="flex justify-center gap-1.5">
            <CustomizedButton label="Salvar" bgColor="#4e54c8" hoverColor="#302b63" variant="contained" size="small" onClick={() => handleEditTasks()} />
            <CustomizedButton label="Cancelar" bgColor="#9370db" hoverColor="#ce93d8" variant="contained" size="small" onClick={() => setOpenModalEdit(false)} />
          </Box>
        </CustomizedModal>

        <CustomizedModal open={openDeleteModal} label="Tem certeza que deseja excluir esta tarefa?">
          <Box className="flex justify-center">
            <Typography className="flex">
              "<Typography className="text-[#9370db]">{`${selectedTask && selectedTask.task_name}`}</Typography>"
            </Typography>
          </Box>
          <Box className="flex justify-center gap-1.5">
            <CustomizedButton label="Sim" bgColor="#4e54c8" hoverColor="#4a0072" variant="contained" size="small" onClick={() => handleCloseDelete()} />
            <CustomizedButton label="Cancelar" bgColor="#9370db" hoverColor="#ce93d8" variant="contained" size="small" onClick={() => setOpenDeleteModal(false)} />
          </Box>
        </CustomizedModal>

        <CustomizedModal open={openDeleteTasksModal} label="Tem certeza que deseja excluir todas as tarefas concluídas?">
          <Box className="flex justify-center gap-1.5">
            <CustomizedButton label="Sim" bgColor="#4e54c8" hoverColor="#4a0072" variant="contained" size="small" onClick={handleCloseDeleteTasks} />
            <CustomizedButton label="Cancelar" bgColor="#9370db" hoverColor="#ce93d8" variant="contained" size="small" onClick={handleCloseDeleteTasks} />
          </Box>
        </CustomizedModal>

        <Box className="flex justify-between mt-5">
          <Box className="flex gap-1.5 items-center">
            <DoneAllIcon className="text-gray-700" fontSize="small" />
            <Typography fontSize={14}>Tarefas concluídas (3/3)</Typography>
          </Box>
          <Box>
            <CustomizedButton
              bgColor="#4e54c8"
              hoverColor="#302b63"
              label="Limpar tarefas concluídas"
              variant="contained"
              startIcon={<DeleteForeverIcon />}
              size="small"
              onClick={handleOpenDeleteTasks} />
          </Box>
        </Box>

        <Box className="mt-4 h-2 bg-slate-200 rounded">
          <Box className="bg-[#9370db] h-full w-[50%] rounded" />
        </Box>

        <Box className="mt-3 flex items-center justify-end gap-1">
          <BarChartIcon className="text-gray-700" fontSize="small" />
          <Typography fontSize={14}>{`Total de Tarefas: ${taskList.length}`}</Typography>
        </Box>

      </Card>
    </Layout>
  )
}
export default ToDoList