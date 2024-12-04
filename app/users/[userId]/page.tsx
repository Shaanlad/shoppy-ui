import { Grid2, Stack, Typography } from "@mui/material";
import getUser from "./get-user";
import Image from "next/image";
import { getUserImage } from "../user-image";

interface SingleUserProps {
    params: { userId: string };
}


export default async function SingleUser({ params }: SingleUserProps) {

    const user = await getUser(+params.userId);

    return (
        <Grid2 container marginBottom={"2rem"} rowGap={3}>
            {user.imageExists && (
            <Grid2 md={6} xs={6} >
                
                <Image
                    src={getUserImage(user.id)}
                    alt="User Image"
                    width={0}
                    height={0}
                    className="w-full sm:w-3/4 h-auto"
                    sizes="100vw"
                />
            </Grid2>
            )}
            <Grid2 md={6} xs={6}>
                <Stack gap={3}>                
                    <Typography variant="h3"> {user.email} </Typography>
                </Stack>
            </Grid2>            
        </Grid2>        
    )
}