import CustomizedTextField from "@/components/CustomizedTextField"
import { Box, Typography } from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import CustomizedButton from "@/components/CustomizedButton";
import CustomizedLink from "@/components/CustomizedLink";
import Image from "next/image"

const RegisterPage = () => {
    return (
        <Box className="h-screen flex items-center justify-center bg-gradient-to-t from-[#0f0c29] via-[#302b63] to-[#4e54c8]">

            <Image className="absolute top-44"
                src="/images/logo.svg"
                width={300}
                height={300}
                alt="todolist_logo"
                priority
            />

            <Box className="flex flex-col items-center gap-4">

                <Box className="p-5 rounded-3xl bg-white">

                    <Box className="h-10 flex items-center gap-1 justify-center mb-2">
                        <Typography className="text-gray-700"
                            fontSize={22}>
                            Realize o Cadastro para ter sua lista!
                        </Typography>

                        <AssignmentIcon className="text-gray-700" />
                    </Box>

                    <form className="grid gap-4"
                        onSubmit={() => alert("bla")}>
                        <CustomizedTextField
                            label="Nome de usuário"
                            size="medium"
                            topTitleColor="#9370db"
                            hoverColor="#4a0072"
                            borderColor="#4e54c8"
                            focusColor="#4e54c8" />

                        <CustomizedTextField
                            label="Seu melhor e-mail"
                            size="medium"
                            topTitleColor="#9370db"
                            hoverColor="#4a0072"
                            borderColor="#4e54c8"
                            focusColor="#4e54c8" />

                        <CustomizedTextField
                            label="Senha forte"
                            size="medium"
                            topTitleColor="#9370db"
                            hoverColor="#4a0072"
                            borderColor="#4e54c8"
                            focusColor="#4e54c8" />

                        <CustomizedButton
                            label="Cadastrar"
                            size="small"
                            variant="contained"
                            bgColor="#4e54c8"
                            hoverColor="#302b63"
                            startIcon={<AssignmentIndIcon />}
                            type="submit" />
                    </form>

                </Box>

                <Box className="flex gap-1 text-white">
                    <Typography fontSize={16}>
                        Ja possui conta?
                    </Typography>
                    <CustomizedLink className="justify-self-start"
                        href="http://localhost:3000/login"
                        underline="hover" >

                        <Typography fontSize={16}>
                            Faça login
                        </Typography>

                    </CustomizedLink>
                </Box>

            </Box>

        </Box>

    )
}
export default RegisterPage