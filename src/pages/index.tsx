import Layout from "@/components/Layout"
import CustomizedButton from "@/components/CustomizedButton"
import CustomizedTextField from "@/components/CustomizedTextField";
import CustomizedDivider from "@/components/CustomizedDivider";
import CustomizedChip from "@/components/CustomizedChip";
import { Card, Box, Typography, IconButton, Modal, InputAdornment } from "@mui/material"
import PostAddIcon from '@mui/icons-material/PostAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useState } from "react"
import CancelIcon from '@mui/icons-material/Cancel';

const ToDoList = () => {

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalDeleteTasks, setOpenModalDeleteTasks] = useState(false)
  const [value, setValue] = useState("")
  const maxLength = 50

  const handleOpenEdit = () => {
    setOpenModalEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenModalEdit(false)
  }

  const handleOpenDelete = () => {
    setOpenModalDelete(true)
  }

  const handleCloseDelete = () => {
    setOpenModalDelete(false)
  }

  const handleOpenDeleteTasks = () => {
    setOpenModalDeleteTasks(true)
  }

  const handleCloseDeleteTasks = () => {
    setOpenModalDeleteTasks(false)
  }

  return (
    <Layout>
      <Card className="p-3" >

        <Box className="flex gap-3">
          <CustomizedTextField
          value={value}
            onChange={(digitado) => setValue(digitado.target.value)}
            slotProps={{ htmlInput: { maxLength: maxLength}, input: {endAdornment: value && (<InputAdornment position="end"><IconButton onClick={() => setValue("")} size="small"><CancelIcon className="text-gray-700" fontSize="small"/></IconButton></InputAdornment>)}}}
            helperText={<Typography component="span" fontSize={14} className={value.length === maxLength ? "text-[#9370DB]" : "text-[#212121]"}> {value.length === maxLength ? `Limite de caracteres atingido!` : `${value.length}/${maxLength} caracteres`} </Typography>} topTitleColor="#8e24aa" hoverColor="#4a0072" borderColor="#7b1fa2" focusColor="#ab47bc" label="Digite sua nova tarefa" size="medium" className="w-60" />
          <Box>
            <CustomizedButton bgColor="#7b1fa2" hoverColor="#4a0072" label="Adicionar" variant="contained" startIcon={<PostAddIcon />} size="large" className="w-60 h-14" />
          </Box>
        </Box>

        <CustomizedDivider marginTop="1.25rem" marginBottom="0.5rem" color="#7b1fa2" />

        <Box className="flex gap-3">
          <CustomizedChip label="Todos" icon={<FormatListBulletedIcon />} bgColor="white" hoverColor="#CE93D8" borderColor="#7b1fa2" selectedColor="#9370DB" selectedBorderColor="#7b1fa2" />
          <CustomizedChip label="Não Finalizados" bgColor="white" hoverColor="#CE93D8" borderColor="#7b1fa2" selectedColor="#9370DB" selectedBorderColor="#7b1fa2" icon={<PendingActionsIcon />} />
          <CustomizedChip bgColor="white" hoverColor="#CE93D8" borderColor="#7b1fa2" selectedColor="#9370DB" label="Concluídos"
            selectedBorderColor="#7b1fa2" icon={<ChecklistRtlIcon />} />
        </Box>

        <Box className="mt-4 border-b-2">
          <Box className="h-16 flex justify-between items-center border-t-2">
            <Box className="bg-purple-700 h-full w-1" />
            <Typography className="flex-1 pl-2">Estudar Next.js</Typography>
            <Box className="flex items-center">
              <IconButton onClick={handleOpenEdit}><EditIcon className="text-gray-700" fontSize="small"/></IconButton>
              <IconButton onClick={handleOpenDelete}><DeleteForeverIcon className="text-gray-700" fontSize="small"/></IconButton>
            </Box>
          </Box>
        </Box>

        <Modal
          open={openModalEdit}
          onClose={handleCloseEdit}>
          <Box className="h-[100vh] w-full flex justify-center items-center">
            <Box className="bg-white h-30 w-72 p-3 rounded grid gap-2">
              <Box className="flex justify-center">
                <Typography>Editar esta tarefa?</Typography>
              </Box>
              <CustomizedTextField label="Editar..." topTitleColor="#8e24aa" hoverColor="#4a0072" borderColor="#7b1fa2" focusColor="#ab47bc" className="w-full" />
              <Box className="flex justify-center gap-1.5">
                <CustomizedButton bgColor="#7b1fa2" hoverColor="#4a0072" label="Salvar" onClick={handleCloseEdit} size="small" variant="contained" />
                <CustomizedButton bgColor="#9370DB" hoverColor="#CE93D8" label="Cancelar" onClick={handleCloseEdit} variant="contained" size="small" />
              </Box>
            </Box>
          </Box>
        </Modal>

        <Modal
          open={openModalDelete}
          onClose={handleCloseDelete}>
          <Box className="h-[100%] w-full flex justify-center items-center">
            <Box className="bg-white p-3 grid gap-3 rounded">
              <Typography>Tem certeza que deseja excluir esta tarefa?</Typography>
              <Box className="flex justify-center gap-1.5">
                <CustomizedButton label="Sim" bgColor="#7b1fa2" hoverColor="#4a0072" variant="contained" size="small" onClick={handleCloseDelete} />
                <CustomizedButton label="Cancelar" bgColor="#9370DB" hoverColor="#CE93D8" variant="contained" size="small" onClick={handleCloseDelete} />
              </Box>
            </Box>
          </Box>
        </Modal>

        <Modal 
        open={openModalDeleteTasks}>
          <Box className="h-[100vh] w-full flex justify-center items-center">
        <Box className="bg-white p-3 rounded grid gap-3">
        <Typography>
          Tem certeza que deseja limpar todas as tarefas concluídas?
        </Typography>
        <Box className="flex justify-center gap-1.5">
        <CustomizedButton label="Sim" bgColor="#7b1fa2" hoverColor="#4a0072" variant="contained" size="small" onClick={handleCloseDeleteTasks}/>
        <CustomizedButton label="Cancelar" bgColor="#9370DB" hoverColor="#CE93D8" variant="contained" size="small" onClick={handleCloseDeleteTasks}/>
        </Box>
        </Box>
          </Box>
        </Modal>

        <Box className="flex justify-between mt-5">
          <Box className="flex gap-1.5 items-center">
            <DoneAllIcon className="text-gray-700" fontSize="small" /><Typography fontSize={14}>Tarefas concluídas (3/3)</Typography>
          </Box>
          <Box>
            <CustomizedButton label="Limpar tarefas concluídas" size="small" onClick={handleOpenDeleteTasks} bgColor="#7b1fa2" hoverColor="#4a0072" variant="contained" startIcon={<DeleteForeverIcon />} />
          </Box>
        </Box>

        <Box className="mt-4 h-2 bg-slate-100 rounded">
          <Box className="bg-[#9370DB] h-full w-[50%] rounded" />
        </Box>

        <Box className="mt-3 flex items-center justify-end gap-1">
          <BarChartIcon className="text-gray-700" fontSize="small" />
          <Typography fontSize={14}>
            Total de tarefas: 3
          </Typography>
        </Box>

      </Card>
    </Layout>
  )
}
export default ToDoList