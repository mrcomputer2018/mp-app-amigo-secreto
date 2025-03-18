"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

type LoggedUserProps = {
    id: string;
    email: string;
}

interface IParticipant {
    name: string;
    email: string;
}

export default function NewGroupForm({loggedUser}: {loggedUser: LoggedUserProps}) {
    
    const [participants, setParticipants] = useState<IParticipant[]>([
        {
            name: '',
            email: loggedUser.email
        }
    ]);

    const [groupName, setGroupName] = useState<string>('');

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Novo Grupo</CardTitle>
                <CardDescription>
                    Crie um novo grupo para compartilhar com seus amigos
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form action="">

                </form>
            </CardContent>
        </Card>
    )
}