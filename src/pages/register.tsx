import CustomizedTextField from "@/components/CustomizedTextField"
import Layout from "@/components/Layout"
import { Card, Box, Typography } from "@mui/material"
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import CustomizedButton from "@/components/CustomizedButton";
import CustomizedLink from "@/components/CustomizedLink";

const RegisterPage = () => {
    return (
        <Layout>
            <Card className="p-3">
                <Box className="h-10 flex items-center gap-1 justify-center mb-2">
                    <Typography
                        fontSize={20}>
                        Faça o cadastro para ter sua lista!
                    </Typography>

                    <AssignmentIcon className="text-gray-700" />
                </Box>

                <Box className="grid gap-4">
                    <CustomizedTextField className="w-[25rem]"
                        label="Nome de usuário"
                        size="small"
                        topTitleColor="#9370db"
                        hoverColor="#4a0072"
                        borderColor="#4e54c8"
                        focusColor="#4e54c8" />

                    <CustomizedTextField className="w-[25rem]"
                        label="Seu melhor e-mail"
                        size="small"
                        topTitleColor="#9370db"
                        hoverColor="#4a0072"
                        borderColor="#4e54c8"
                        focusColor="#4e54c8" />

                    <CustomizedTextField className="w-[25rem]"
                        label="Senha forte"
                        size="small"
                        topTitleColor="#9370db"
                        hoverColor="#4a0072"
                        borderColor="#4e54c8"
                        focusColor="#4e54c8" />
                </Box>

                <Box className="h-12 grid grid-cols-2 items-center">
                    <CustomizedLink className="justify-self-start"
                        href="http://localhost:3000/login"
                        underline="hover" >

                        <Typography
                            fontSize={14}>
                            Ja possui conta? Faça login
                        </Typography>

                    </CustomizedLink>

                    <CustomizedButton className="justify-self-end w-32"
                        label="Cadastrar"
                        size="small"
                        variant="contained"
                        bgColor="#4e54c8"
                        hoverColor="#302b63"
                        startIcon={<AssignmentIndIcon />} />
                </Box>

            </Card>
        </Layout>
    )
}
export default RegisterPage