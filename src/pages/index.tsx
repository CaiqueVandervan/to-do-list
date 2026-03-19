import Layout from "@/components/Layout"
import CustomizedButton from "@/components/CustomizedButton"
import CustomizedTextField from "@/components/CustomizedTextField";
import CustomizedDivider from "@/components/CustomizedDivider";
import CustomizedChip from "@/components/CustomizedChip";
import { Box, Typography, IconButton, InputAdornment, MenuItem, Grow, Skeleton, Slide } from "@mui/material"
import PostAddIcon from "@mui/icons-material/PostAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BarChartIcon from "@mui/icons-material/BarChart";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useEffect, useRef, useState } from "react"
import CancelIcon from "@mui/icons-material/Cancel";
import CustomizedModal from "@/components/CustomizedModal"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomizedTooltip from "@/components/CustomizedTooltip";
import CustomizedMenu from "@/components/CustomizedMenu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CheckIcon from '@mui/icons-material/Check';
import { Task } from "@/models/Task"
import CustomizedAlert from "@/components/CustomizedAlert";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";
import { motion } from "framer-motion"
import { getTasks, createTask, updateTask, deleteTask, deleteConcludedTasks } from "@/services/tasks"

type AlertState = {
  message: React.ReactNode
} | null

const ToDoList = () => {

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openDeleteTasksModal, setOpenDeleteTasksModal] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const [taskList, setTaskList] = useState<Task[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedTask, setSelectedTask] = useState<Task>()
  const [editTask, setEditTask] = useState<string>("")
  const [showAlert, setShowAlert] = useState<AlertState>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [spinLoading, setSpinLoading] = useState<boolean>(false)
  const [deletingTask, setDeletingTask] = useState<number | null>(null)
  const [openSlide, setOpenSlide] = useState<boolean>(false)
  const ref = useRef<HTMLInputElement>()
  const [chipFilter, setChipFilter] = useState<"all" | "pending" | "concluded">("all")
  const maxLength = 40

  const loadTasks = async () => {
    try {
      setIsLoading(true)

      const resp = await getTasks()

      setTaskList(resp.map((data: Task) => ({
        ...data,
        concluded: Boolean(data.concluded)
      })
      ))
    } catch (error) {
      console.warn(error)

      setShowAlert({
        message: (
          <Typography className="text-red-400">
            Erro ao buscar Tarefas
          </Typography>
        )
      })
    }
    setIsLoading(false)
  }

  const postTasks = async (task_name: string) => {
    try {
      setSpinLoading(true)

      const resp = await createTask(task_name)

      setValue("")

      setTaskList(prev => [...prev, resp])

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
              {capitalization(value)}
            </Typography>
            <ShinyText
              text={`" foi adicionada com sucesso!`}
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
      console.error("erro", error)
    }
    setSpinLoading(false)
  }

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
      console.warn("NãO FOIU", error)
    }
    setOpenModalEdit(false)
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
            {selectedTask?.concluded ?
              <ShinyText text={`" esta pendente novamente.`}
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
      console.warn(error)
    }
    setAnchorEl(null)
  }

  const handleDeleteTasks = async () => {
    if (!selectedTask) return
    try {

      await deleteTask(selectedTask.id)

      setDeletingTask(selectedTask.id)

      setShowAlert({
        message: (
          <Box className="flex">
            <ShinyText text={`Tarefa "`}
              speed={3}
              color="white"
              shineColor="#9370db"
              spread={160}
              direction="left"
            />
            <Typography className="text-[#9370db]">
              {capitalization(selectedTask.task_name)}
            </Typography>
            <ShinyText text={`" deletada com sucesso!`}
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
      console.warn(error)
    }
    setOpenDeleteModal(false)
  }

  const handleDeleteConcludedTasks = async () => {
    try {

      await deleteConcludedTasks()

      setTaskList(prev => prev.filter(task => task.concluded === false))

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
      console.warn(error)
    }
    setOpenDeleteTasksModal(false)
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

  const formatDate = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleString('pt-BR', {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  }

  const capitalization = (text: string) => {
    if (!text) return
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    if (!selectedTask) return
    if (openModalEdit) {
      setEditTask(capitalization(selectedTask.task_name)?.trim() || ""),
        setTimeout(() =>
          ref.current?.focus())
    }
  }, [openModalEdit])

  useEffect(() => {
    const timer = setTimeout(() =>
      setOpenSlide(true), 500)

    return () =>
      clearTimeout(timer)
  }, [openSlide])

  const concludedTasks = taskList.filter(task => task.concluded)
  const pendingTasks = taskList.filter(task => !task.concluded)

  const filteredTasks = chipFilter === "all"
    ? taskList
    : chipFilter === 'pending'
      ? pendingTasks
      : concludedTasks

  return (
    <Layout>

      {showAlert && <CustomizedAlert message={showAlert.message} duration={4000} onClose={() => setShowAlert(null)} />}

      <Slide direction="up" in={openSlide} mountOnEnter unmountOnExit>

        <Box className="p-5 bg-white rounded-3xl">

          <form className="flex gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              postTasks(value)
            }}>
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
              helperText={<Typography component="span" fontSize={14} className={value.length === maxLength ? "text-[#9370db]" : "text-[#212121]"}> {value.length === maxLength ? `Limite de caracteres atingido!` : `${value.length}/${maxLength} Caracteres`} </Typography>}
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
                startIcon={spinLoading ? <HourglassBottomIcon className="animate-spin" /> : <PostAddIcon />}
                size="large"
                disabled={!value.trim()}
                type="submit"
              />
            </Box>
          </form>

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
              variant={chipFilter === "all" ? "filled" : "outlined"}
              onClick={() => setChipFilter("all")}
              icon={<FormatListBulletedIcon />}
            />

            <CustomizedChip
              label="Pendentes"
              bgColor="white"
              hoverColor="#c084fc"
              borderColor="#4e54c8"
              selectedColor="#9370db"
              variant={chipFilter === "pending" ? "filled" : "outlined"}
              onClick={() => setChipFilter("pending")}
              icon={<PendingActionsIcon />} />

            <CustomizedChip
              label="Concluídas"
              bgColor="white"
              hoverColor="#c084fc"
              borderColor="#4e54c8"
              selectedColor="#9370db"
              variant={chipFilter === "concluded" ? "filled" : "outlined"}
              onClick={() => setChipFilter("concluded")}
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

          <Box className="mt-4 grid gap-1 max-h-[255px] overflow-y-auto customized-scrollbar pr-1.5 drop-shadow-md">

            {isLoading && (
              <Box className="grid grid-rows-3 gap-1">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Box className="flex w-full gap-1" key={index}>
                    <Skeleton variant="rounded" height={"80px"} width={5} />
                    <Skeleton variant="rounded" height={"80px"} width={"100%"} />
                  </Box>
                ))}
              </Box>
            )}

            {chipFilter === "concluded" && taskList.filter(task => task.concluded).length === 0 && taskList.length > 0 &&
              <Box className="flex justify-center">
                <Grow
                  in
                  timeout={1500}
                >
                  <Box className="flex items-center justify-center h-[82px] p-4 rounded-lg bg-[#ede9fe]">
                    <Typography className="opacity-80">
                      Não há Tarefas concluídas em sua lista!
                    </Typography>
                  </Box>
                </Grow>
              </Box>
            }

            {chipFilter === "pending" && taskList.filter(task => !task.concluded).length === 0 && taskList.length > 0 &&
              <Box className="flex justify-center">
                <Grow
                  in
                  timeout={1500}
                >
                  <Box className="flex items-center justify-center h-[82px] p-4 rounded-lg bg-[#ede9fe]">
                    <Typography>
                      Não há Tarefas pendentes em sua lista!
                    </Typography>
                  </Box>
                </Grow>
              </Box>
            }

            {taskList.length === 0 && !isLoading ?
              <Box className="flex justify-center">
                <Grow
                  in
                  timeout={1500}>
                  <Box className="grid items-center h-[82px] p-4 rounded-lg bg-[#ede9fe]">
                    <Typography className="flex justify-center opacity-80">Não há Tarefas em sua Lista.</Typography>
                    <Typography className="flex justify-center opacity-80">Adicione uma Tarefa para começar!</Typography>
                  </Box>
                </Grow>
              </Box>
              : filteredTasks.map(task => (
                <Grow
                  in={deletingTask !== task.id}
                  timeout={1500}
                  key={task.id}
                  onExited={() => {
                    setTaskList(prev => prev.filter(t => t.id !== task.id))
                    setDeletingTask(null)
                  }}>
                  <motion.div className="rounded-lg p-[2px]"
                    animate={{
                      background: task.concluded ? "linear-gradient(to left, #e5e7eb, #3b0764, #3b0764)" :
                        "linear-gradient(to left, #9370db, #9370db, #e5e7eb)"
                    }}
                    transition={{ duration: 1.5 }}>

                    <motion.div className="h-[78px] flex justify-between items-center rounded-lg"
                      animate={{
                        background: task.concluded ? "linear-gradient(to right, #ffffff, #b591e0)" : "linear-gradient(to right, #f0ebfe, #ffffff)"
                      }}
                      transition={{ duration: 1.5 }}>
                      <BlurText
                        key={task.task_name}
                        text={capitalization(task.task_name)}
                        delay={70}
                        animateBy="letters"
                        direction="top"
                        className="pl-3"
                        hoverAnimation
                      />
                      <CustomizedTooltip
                        title="Detalhes">
                        <IconButton onClick={(eventClick) => handleOpenMenu(eventClick, task)}>
                          <MoreVertIcon className="text-gray-700" fontSize="small" />
                        </IconButton>
                      </CustomizedTooltip>
                    </motion.div>
                  </motion.div>
                </Grow>
              ))}
          </Box>

          <CustomizedMenu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            elevation={10}
            onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={handleOpenEdit}>
              <EditIcon /> Editar
            </MenuItem>
            <MenuItem onClick={handleOpenDelete}>
              <DeleteForeverIcon />Deletar
            </MenuItem>
            <MenuItem onClick={handleConcluingTasks}>
              <CheckIcon />{selectedTask?.concluded ? "Desmarcar como concluído" : "Marcar como concluído"}
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

          <CustomizedModal open={openDeleteModal} label="Tem certeza que deseja excluir esta tarefa?">
            <Box className="flex justify-center">
              <Typography className="flex">
                "<Typography className="text-[#9370db]">{`${selectedTask && capitalization(selectedTask.task_name)}`}</Typography>"
              </Typography>
            </Box>

            <Box className="flex justify-center gap-1.5">
              <CustomizedButton label="Sim" bgColor="#4e54c8" hoverColor="#4a0072" variant="contained" size="small" onClick={handleDeleteTasks} />
              <CustomizedButton label="Cancelar" bgColor="#9370db" hoverColor="#ce93d8" variant="contained" size="small" onClick={() => setOpenDeleteModal(false)} />
            </Box>
          </CustomizedModal>

          <CustomizedModal open={openDeleteTasksModal} label="Tem certeza que deseja excluir todas as tarefas concluídas?">
            <Box className="flex justify-center gap-1.5">
              <CustomizedButton label="Sim" bgColor="#4e54c8" hoverColor="#4a0072" variant="contained" size="small" onClick={handleDeleteConcludedTasks} />
              <CustomizedButton label="Cancelar" bgColor="#9370db" hoverColor="#ce93d8" variant="contained" size="small" onClick={() => setOpenDeleteTasksModal(false)} />
            </Box>
          </CustomizedModal>

          <Box className="flex justify-between mt-5">
            <Box className="flex gap-1.5 items-center">
              <DoneAllIcon className="text-gray-700" fontSize="small" />
              <Typography fontSize={14}>{`Tarefas concluídas (${taskList.filter(task => task.concluded).length}/${taskList.length})`}</Typography>
            </Box>
            <Box>
              <CustomizedButton
                bgColor="#4e54c8"
                hoverColor="#302b63"
                label="Limpar tarefas concluídas"
                variant="contained"
                startIcon={<DeleteForeverIcon />}
                size="small"
                onClick={() => setOpenDeleteTasksModal(true)} />
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