import { Card, Typography } from "@mui/material";
import { User as IUser } from "./interfaces/user.interface";

interface UserProps {
    user: IUser;
}

export default function User( {user}: UserProps ) {
    return (
        <Card className="p-4">
            <Typography  variant="h4">{user.email}</Typography>              
        </Card>
    )
}