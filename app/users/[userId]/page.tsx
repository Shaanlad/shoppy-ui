import { Grid, Grid2, Stack, Typography } from "@mui/material";
import getUser from "./get-user";
import Image from "next/image";
import { getUserImage } from "../user-image";

export default async function SingleUser({ params }: { params?: Promise<{ userId: string }> }) {

    const resolvedParams = params ? await params : undefined;

    const userId = resolvedParams?.userId ?? '';

    const user = await getUser(+userId);

    return (
        <Grid2 container marginBottom={"2rem"} rowGap={3}>
            {user.imageExists && (
            <Grid md={6} xs={6} >
                
                <Image
                    src={getUserImage(user.id)}
                    alt="User Image"
                    width={0}
                    height={0}
                    className="w-full sm:w-3/4 h-auto"
                    sizes="100vw"
                />
            </Grid>
            )}
            <Grid md={6} xs={6}>
                <Stack gap={3}>                
                    <Typography variant="h3"> {user.email} </Typography>
                </Stack>
            </Grid>            
        </Grid2>        
    )
}