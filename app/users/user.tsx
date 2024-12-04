"use client"
import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { User as IUser } from "./interfaces/user.interface";
import Image from "next/image";
import { getUserImage } from "./user-image";
import { useRouter } from "next/navigation";

interface UserProps {
    user: IUser;
}

export default function User( {user}: UserProps ) {
    const router = useRouter()
    return (
        <CardActionArea onClick={() => router.push(`/users/${user.id}`)}>
            <Card className="p-4">
                <Stack gap={3}>
                    <Typography  variant="h4">{user.email}</Typography>
                    {
                        user.imageExists && (
                            <Image 
                                src={getUserImage(user.id)}
                                alt="User Picture"
                                width="0"
                                height="0"
                                sizes="10vw"
                                className="w-full h-auto"
                            />
                        )
                    }  
                </Stack>                     
            </Card>
        </CardActionArea>
        
    )
}