import Layout from "@/components/Layout"
import CustomizedButton from "@/components/CustomizedButton"
import CustomizedTextField from "@/components/CustomizedTextField";
import CustomizedDivider from "@/components/CustomizedDivider";
import CustomizedChip from "@/components/CustomizedChip";
import { Card, Box } from "@mui/material"
import PostAddIcon from '@mui/icons-material/PostAdd';

const ToDoList = () => {
  return (
    <Layout>
      <Card className="p-3" >
        <Box className="flex gap-3">
          <CustomizedTextField topTitleColor="#8e24aa
" hoverColor="#9c27b0" borderColor="#7b1fa2" focusColor="#ab47bc" label="Digite sua nova tarefa" size="small" />
          <CustomizedButton bgColor="#7b1fa2" hoverColor="#4a0072" label="Adicionar" variant="contained" startIcon={<PostAddIcon />} />
        </Box>
        
        <CustomizedDivider margin="1rem 0" color="#7b1fa2" />
      
      <Box className="flex gap-3">
        <CustomizedChip label="Todos" bgColor="white" hoverColor="#CE93D8" borderColor="#7b1fa2" selectedColor="#7b1fa2"/>
        <CustomizedChip label="Não Finalizados" bgColor="white" hoverColor="#CE93D8" borderColor="#7b1fa2" selectedColor="#7b1fa2"/>
        <CustomizedChip bgColor="white" hoverColor="#CE93D8" borderColor="#7b1fa2" selectedColor="#7b1fa2" label="Concluídos"/>
      </Box>
      </Card>
    </Layout>
  )
}
export default ToDoList