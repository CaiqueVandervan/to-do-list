import { Box, Typography } from "@mui/material"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";

import CustomizedChip from "./CustomizedChip"

import { ChipFilter } from "@/models/ChipFilter";

import { Dispatch, SetStateAction } from "react";

type ChipsSectionProps = {
    chipFilter: ChipFilter
    setChipFilter: Dispatch<SetStateAction<ChipFilter>>
}

const ChipsSection = ({ chipFilter, setChipFilter }: ChipsSectionProps) => {

    return (
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
                        <Typography
                            fontSize={14}>
                            Pendentes
                        </Typography>
                    </Box>
                    <Box className="flex items-center h-4">
                        <Typography
                            fontSize={14}>
                            Concluídos
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Box>

    )
}

export default ChipsSection