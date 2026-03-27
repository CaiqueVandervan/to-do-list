import { Box, Grow, IconButton, Skeleton, Typography } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CustomizedTooltip from "./CustomizedTooltip"
import BlurText from "./BlurText"

import { ChipFilter } from "@/models/ChipFilter";
import { Task } from "@/models/Task";

import { capitalization } from "@/utils/capitalization";

import { motion } from "framer-motion"

import { Dispatch, SetStateAction } from "react";

type TaskProps = {
    isLoading: boolean
    chipFilter: ChipFilter
    taskList: Task[]
    setTaskList: Dispatch<SetStateAction<Task[]>>
    deletingTask: number | null
    setDeletingTask: Dispatch<SetStateAction<number | null>>
    handleOpenMenu: (
        event: React.MouseEvent<HTMLElement>,
        task: Task
    ) => void
}

const TaskSkeleton = () => (
    <Box className="grid grid-rows-3 gap-1">
        {Array.from({ length: 3 }).map((_, index) => (
            <Box className="flex w-full gap-1" key={index}>
                <Skeleton variant="rounded" height={"80px"} width={5} />
                <Skeleton variant="rounded" height={"80px"} width={"100%"} />
            </Box>
        ))}
    </Box>
)

const TaskItem = ({ isLoading, chipFilter, taskList, setTaskList, deletingTask, setDeletingTask, handleOpenMenu }: TaskProps) => {

    const concludedTasks = taskList.filter(task => task.concluded)
    const pendingTasks = taskList.filter(task => !task.concluded)

    const filteredTasks = chipFilter === "all"
        ? taskList
        : chipFilter === 'pending'
            ? pendingTasks
            : concludedTasks

    return (
        <Box className="mt-4 grid gap-1 max-h-[255px] overflow-y-auto customized-scrollbar pr-1.5 drop-shadow-md">

            {isLoading && (
                <TaskSkeleton />
            )}

            {chipFilter === "concluded" && taskList.filter(task => task.concluded).length === 0 && taskList.length > 0 && (
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
            )}

            {chipFilter === "pending" && taskList.filter(task => !task.concluded).length === 0 && taskList.length > 0 && (
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
            )}

            {taskList.length === 0 && !isLoading ? (
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
            ) : (filteredTasks.map(task => (
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
                            background: task.concluded
                                ? "linear-gradient(to left, #e5e7eb, #3b0764, #3b0764)"
                                : "linear-gradient(to left, #9370db, #9370db, #e5e7eb)"
                        }}
                        transition={{ duration: 1.5 }}>

                        <motion.div className="h-[78px] flex justify-between items-center rounded-lg"
                            animate={{
                                background: task.concluded
                                    ? "linear-gradient(to right, #ffffff, #b591e0)"
                                    : "linear-gradient(to right, #f0ebfe, #ffffff)"
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

                                <IconButton
                                    onClick={(eventClick) => handleOpenMenu(eventClick, task)}>
                                    <MoreVertIcon className="text-gray-700" fontSize="small" />
                                </IconButton>

                            </CustomizedTooltip>

                        </motion.div>

                    </motion.div>

                </Grow>
            )))}
        </Box>
    )
}

export default TaskItem