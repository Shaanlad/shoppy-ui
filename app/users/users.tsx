import { Grid, Grid2 } from "@mui/material";
import getUsers from "./actions/get-users";
import User from "./user";

export default async function Users() {
    const users = await getUsers();
    console.log("getUsers>> ", getUsers);

    return (
        <Grid2 container spacing={3}>
        {users.map((u) => (
            <Grid key={u.id} sm={6} lg={4} xs={12}>
            <User user={u}/>
        </Grid>
        ))}
            {/* {users.map((user) => (
                <Grid key={user.id} sm={6} lg={4} xs={12}>
                    <User user={user}/>
                </Grid>                
            ))} */}
        </Grid2>
    )
}