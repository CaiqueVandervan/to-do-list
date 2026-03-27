import { Box, Typography, InputAdornment, IconButton } from "@mui/material"
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import PostAddIcon from "@mui/icons-material/PostAdd";

import CustomizedTextField from "./CustomizedTextField"
import CustomizedButton from "./CustomizedButton"
import ShinyText from "./ShinyText"

import { Task } from "@/models/Task"
import { AlertState } from "@/models/AlertState"

import { Dispatch, SetStateAction, useState } from "react"

import { capitalization } from "@/utils/capitalization"

import { createTask } from "@/services/tasks"

type FormSectionProps = {
  setTaskList: Dispatch<SetStateAction<Task[]>>
  setShowAlert: Dispatch<SetStateAction<AlertState>>
}

const FormSection = ({ setTaskList, setShowAlert }: FormSectionProps) => {

  const [value, setValue] = useState<string>("")
  const [spinLoading, setSpinLoading] = useState<boolean>(false)
  const maxLength = 40

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
      console.error(error)

      setShowAlert({
        message: (
          <Typography className="text-red-400">
            Erro ao salvar Tarefa.
          </Typography>
        )
      })
    }
    setSpinLoading(false)
  }

  return (

    <form className="flex gap-3"
      onSubmit={(e) => {
        e.preventDefault()
        postTasks(value)
      }}>
      <CustomizedTextField className="w-60"
        topTitleColor="#9370db"
        hoverColor="#4a0072"
        borderColor="#4e54c8"
        focusColor="#4e54c8"
        label="Digite sua nova Tarefa"
        size="medium"
        value={value}
        onChange={(digitado) => {
          setValue(digitado.target.value)
        }}
        slotProps={{
          htmlInput: {
            maxLength: maxLength
          },
          input: {
            endAdornment: value && (
              <InputAdornment
                position="end">
                <IconButton
                  onClick={() => setValue("")}
                  size="small">
                  <CancelIcon className="text-gray-700"
                    fontSize="small" />
                </IconButton>
              </InputAdornment>)
          }
        }}
        helperText={
          <Typography className={value.length === maxLength
            ? "text-[#9370db]"
            : "text-[#212121]"}
            component="span"
            fontSize={14}
          >
            {value.length === maxLength
              ? `Limite de caracteres atingido!`
              : `${value.length}/${maxLength} Caracteres`}
          </Typography>}
      />
      <Box>
        <CustomizedButton className="w-60 h-14"
          bgColor="#4e54c8"
          hoverColor="#302b63"
          label="Adicionar"
          variant="contained"
          startIcon={spinLoading
            ? <HourglassBottomIcon className="animate-spin" />
            : <PostAddIcon />}
          size="large"
          disabled={!value.trim()}
          type="submit"
        />
      </Box>
    </form>

  )
}

export default FormSection