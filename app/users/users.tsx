import { Grid, Grid2 } from "@mui/material";
import getUsers from "./actions/get-users";
import User from "./user";

export default async function Users() {
    const users = await getUsers();

    const usersArray = Array.isArray(users) ? users : [];

    return (
        <Grid2 container spacing={3} sx={{ height: '85vh', overflow: "scroll"}}>
            {usersArray.map((user) => (
                <Grid key={user.id} sm={6} lg={4} xs={12}>
                    <User user={user}/>
                </Grid>                
            ))}
        </Grid2>
    )
}