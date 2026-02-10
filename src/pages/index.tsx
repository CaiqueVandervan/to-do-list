import Layout from "@/components/Layout"
import CustomizedButton from "@/components/CustomizedButton"
import CustomizedTextField from "@/components/CustomizedTextField";
import CustomizedDivider from "@/components/CustomizedDivider";
import CustomizedChip from "@/components/CustomizedChip";
import { Card, Box, Typography, IconButton, Modal, InputAdornment, Zoom, MenuItem } from "@mui/material"
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
import { Task } from "@/models/Task"

const ToDoList = () => {

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openDeleteTasksModal, setOpenDeleteTasksModal] = useState(false)
  const [value, setValue] = useState("")
  const [taskList, setTaskList] = useState<Task[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTask, setSelectedTask] = useState<Task>()
  const [newTask, setNewTask] = useState<string>("")
  const [editTask, setEditTask] = useState<string>("")
  const maxLength = 50

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


  const postTasks = async (task: string) => {
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
    setNewTask(data)
    console.log("POST: ", data)
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
  }


  useEffect(() => {
    const createTask = async () => {
      const getTasks = await fetch("/api/tasks/tasks", {
        method: "GET"
      })
      const resp = await getTasks.json()
      setTaskList(resp)
    }
    createTask()
  }, [newTask])

  const formatDate = (date: string) => {
    if (!date) return
    const [year, month, day] = date.split("T")[0].split("-")
    const hour = date.split("T")[1]
    const realHour = hour.split(":")[0]
    const minutes = hour.split(":")[1]
    return `${day}/${month}/${year} as ${realHour}:${minutes}`
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

  return (
    <Layout>
      <Card className="p-5" >

        <Box className="flex gap-3">
          <CustomizedTextField className="w-60"
            value={value}
            onChange={(digitado) => {
              setValue(digitado.target.value)
              setNewTask(digitado.target.value)
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
            topTitleColor="#8e24aa"
            hoverColor="#4a0072"
            borderColor="#7b1fa2"
            focusColor="#ab47bc"
            label="Digite sua nova tarefa"
            size="medium" />
          <Box>
            <CustomizedButton className="w-60 h-14"
              bgColor="#7b1fa2"
              hoverColor="#4a0072"
              label="Adicionar"
              variant="contained"
              startIcon={<PostAddIcon />}
              size="large"
              onClick={() => postTasks(newTask)}
            />
          </Box>
        </Box>

        <CustomizedDivider
          marginTop="1.25rem"
          marginBottom="0.5rem"
          color="#7b1fa2" />

        <Box className="flex gap-3">
          <CustomizedChip
            label="Todos"
            bgColor="white"
            hoverColor="#ce93d8"
            borderColor="#7b1fa2"
            selectedColor="#9370db"
            selectedBorderColor="#7b1fa2"
            icon={<FormatListBulletedIcon />} />
          <CustomizedChip
            label="Pendentes"
            bgColor="white"
            hoverColor="#ce93d8"
            borderColor="#7b1fa2"
            selectedColor="#9370db"
            selectedBorderColor="#7b1fa2"
            icon={<PendingActionsIcon />} />
          <CustomizedChip
            label="Concluídos"
            bgColor="white"
            hoverColor="#ce93d8"
            borderColor="#7b1fa2"
            selectedColor="#9370db"
            selectedBorderColor="#7b1fa2"
            icon={<ChecklistRtlIcon />} />

          <Box className="flex gap-1 flex-1 justify-center">

            <Box className="grid gap-1">
              <Box className="bg-purple-400 w-7 h-4 rounded"></Box>
              <Box className="bg-purple-950 w-7 h-4 rounded"></Box>
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
          {taskList.map(task => (
            <Box className="h-20 flex justify-between items-center border-t-2" key={task.id}>
              <Box className="bg-purple-400 h-full w-1" />
              <Typography className="flex-1 pl-2">{task.task_name}</Typography>
              <Box>
                <CustomizedTooltip title="Detalhes" arrow
                  slots={{
                    transition: Zoom
                  }}
                  slotProps={{
                    popper: {
                      modifiers: [{
                        name: "offset",
                        options: {
                          offset: [0, -7.5]
                        }
                      }]
                    }
                  }}>
                  <IconButton onClick={(eventClick) => handleOpenMenu(eventClick, task)}>
                    <MoreVertIcon className="text-gray-700" fontSize="small" />
                  </IconButton>
                </CustomizedTooltip>
              </Box>
            </Box>
          ))}
        </Box>

        <CustomizedMenu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          elevation={10}
          onClose={handleCloseMenu}>
          <MenuItem onClick={handleOpenEdit} disableRipple>
            <EditIcon /> Editar
          </MenuItem>
          <MenuItem onClick={handleOpenDelete} disableRipple>
            <DeleteForeverIcon />Deletar
          </MenuItem>
          <CustomizedDivider color="#9370db" />
          <MenuItem disabled>
            <CalendarMonthIcon />
            {selectedTask && formatDate(selectedTask.created_at)}
          </MenuItem>
        </CustomizedMenu>

        <CustomizedModal open={openModalEdit} label="Editar esta tarefa?">
          <CustomizedTextField className="w-full"
            label="Editar"
            defaultValue={selectedTask && selectedTask.task_name}
            onChange={(e) => setEditTask(e.target.value)}
            topTitleColor="#8e24aa"
            hoverColor="#4a0072"
            borderColor="#7b1fa2"
            focusColor="#ab47bc" />
          <Box className="flex justify-center gap-1.5">
            <CustomizedButton label="Salvar" bgColor="#7b1fa2" hoverColor="#4a0072" variant="contained" size="small" onClick={() => handleEditTasks()} />
            <CustomizedButton label="Cancelar" bgColor="#9370db" hoverColor="#ce93d8" variant="contained" size="small" onClick={() => setOpenModalEdit(false)} />
          </Box>
        </CustomizedModal>

        <CustomizedModal open={openDeleteModal} label="Tem certeza que deseja excluir esta tarefa?">
          <Box className="flex justify-center">
            <Typography>{`"${selectedTask && selectedTask.task_name}"`}</Typography>
          </Box>
          <Box className="flex justify-center gap-1.5">
            <CustomizedButton label="Sim" bgColor="#7b1fa2" hoverColor="#4a0072" variant="contained" size="small" onClick={() => handleCloseDelete()} />
            <CustomizedButton label="Cancelar" bgColor="#9370db" hoverColor="#ce93d8" variant="contained" size="small" onClick={() => setOpenDeleteModal(false)} />
          </Box>
        </CustomizedModal>

        <CustomizedModal open={openDeleteTasksModal} label="Tem certeza que deseja excluir todas as tarefas concluídas?">
          <Box className="flex justify-center gap-1.5">
            <CustomizedButton label="Sim" bgColor="#7b1fa2" hoverColor="#4a0072" variant="contained" size="small" onClick={handleCloseDeleteTasks} />
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
              bgColor="#7b1fa2"
              hoverColor="#4a0072"
              label="Limpar tarefas concluídas"
              variant="contained"
              startIcon={<DeleteForeverIcon />}
              size="small"
              onClick={handleOpenDeleteTasks} />
          </Box>
        </Box>

        <Box className="mt-4 h-2 bg-slate-100 rounded">
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