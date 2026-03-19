import CustomizedButton from "@/components/CustomizedButton"
import CustomizedTextField from "@/components/CustomizedTextField"
import { Box, Typography } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login'
import CustomizedLink from "@/components/CustomizedLink"
import AssignmentIcon from '@mui/icons-material/Assignment';
import Image from "next/image"

const LoginPage = () => {
    return (
        <Box className="h-screen flex items-center justify-center bg-gradient-to-t from-[#0f0c29] via-[#302b63] to-[#4e54c8]">

            <Image className="absolute top-[218px]"
                src="/images/logo.svg"
                width={300}
                height={300}
                alt="todolist_logo"
                priority
            />

            <Box className="flex flex-col items-center gap-4">

                <Box className="p-5 rounded-3xl bg-white">

                    <Box className="h-10 flex justify-center items-center gap-1">
                        <Typography className="text-gray-700"
                            fontSize={22}>
                            Realize o Login e entre com sua conta!
                        </Typography>

                        <AssignmentIcon className="text-gray-700" />
                    </Box>

                    <Box className="grid gap-4">
                        <CustomizedTextField
                            label="E-mail"
                            size="medium"
                            topTitleColor="#9370db"
                            hoverColor="#4a0072"
                            borderColor="#4e54c8"
                            focusColor="#4e54c8" />

                        <CustomizedTextField
                            label="Senha"
                            size="medium"
                            topTitleColor="#9370db"
                            hoverColor="#4a0072"
                            borderColor="#4e54c8"
                            focusColor="#4e54c8" />

                        <CustomizedButton
                            label="Entrar"
                            size="small"
                            variant="contained"
                            bgColor="#4e54c8"
                            hoverColor="#302b63"
                            startIcon={<LoginIcon />} />
                    </Box>

                </Box>

                <Box className="flex text-white gap-1">

                    <Typography fontSize={16}>
                        Não possui Conta?
                    </Typography>

                    <CustomizedLink href="http://localhost:3000/register" underline="hover" className="justify-self-start">
                        <Typography fontSize={16}>
                            Cadastre-se
                        </Typography>
                    </CustomizedLink>

                </Box>

            </Box>

        </Box>

    )
}
export default LoginPage