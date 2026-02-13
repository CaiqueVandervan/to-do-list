import React, { useState } from "react"
import Image from "next/image"
import { Avatar, IconButton, MenuItem } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomizedTooltip from "./CustomizedTooltip";
import CustomizedMenu from "./CustomizedMenu";

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {

    const [anchorEl, setAnchorEl] = useState<HTMLElement>()

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    return (
        <main className="h-screen grid grid-rows-3 bg-gradient-to-t from-[#0f0c29] via-[#302b63] to-[#4e54c8] ">
            <div className="w-full h-36 flex items-center justify-between px-8 shadow-xl
                bg-gradient-to-r from-[#4e54c8] via-[#302b63] to-[#0f0c29]">
                <div className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#4e54c8] p-2 rounded-lg flex items-center">
                    <Image
                        src="/images/logo.svg"
                        width={350}
                        height={350}
                        alt="todolist_logo"
                        className="pb-2 pl-6"
                    />
                </div>
                <div className="px-24">
                    <Avatar className="bg-gradient-to-r from-[#ffffff] to-[#4e54c8] p-4">
                        <CustomizedTooltip title="Perfil" arrow>
                            <IconButton onClick={handleOpenMenu}>
                                <AccountCircleIcon className="text-gray-700" />
                            </IconButton>
                        </CustomizedTooltip>
                    </Avatar>
                    <CustomizedMenu open={Boolean(anchorEl)}
                        anchorEl={anchorEl}>
                        <MenuItem onClick={() => setAnchorEl(undefined)}>
                            Cadastrar
                        </MenuItem>
                    </CustomizedMenu>
                </div>
            </div>
            <div className="flex items-center justify-center">
                {children}
            </div>

        </main>
    )
}
export default Layout