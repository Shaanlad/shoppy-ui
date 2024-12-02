interface SingleUserProps {
    params: { userId: string };
}


export default async function SingleUser({ params }: SingleUserProps) {
    return <p>Single User {params.userId} </p>
}