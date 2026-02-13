import CustomizedButton from "@/components/CustomizedButton"
import CustomizedTextField from "@/components/CustomizedTextField"
import Layout from "@/components/Layout"
import { Card, Box, Typography } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login'
import CustomizedLink from "@/components/CustomizedLink"

const LoginPage = () => {
    return (
        <Layout>
            <Card className="p-3">
                <Box className="h-10 flex justify-center items-start gap-1">
                    <Typography fontSize={20}>
                        Login
                    </Typography>
                </Box>
                <Box className="grid gap-4">
                    <CustomizedTextField label="E-mail" size="small" topTitleColor="#9370db" hoverColor="#4a0072" borderColor="#4e54c8" focusColor="#4e54c8" className="w-[25rem]" />
                    <CustomizedTextField label="Senha" size="small" topTitleColor="#9370db" hoverColor="#4a0072" borderColor="#4e54c8" focusColor="#4e54c8" className="w-[25rem]" />
                </Box>
                <Box className="h-12 grid grid-cols-2 items-center">
                    <CustomizedLink href="http://localhost:3000/register" underline="hover" className="justify-self-start">
                        <Typography fontSize={14}>
                            Não possui conta? Cadastre-se
                        </Typography>
                    </CustomizedLink>
                    <CustomizedButton label="Entrar" size="small" variant="contained" bgColor="#4e54c8" hoverColor="#302b63" className=" justify-self-end w-32" startIcon={<LoginIcon />} />
                </Box>
            </Card>
        </Layout>
    )
}
export default LoginPage