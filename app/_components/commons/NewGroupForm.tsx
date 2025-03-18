"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input";
import { Label } from "../ui/label";

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
                <form action="" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="group-name">Nome do grupo</Label>
                        <Input 
                            id="group-name"
                            name="group-name"
                            type="text" 
                            placeholder="Nome do grupo" 
                            value={groupName} 
                            onChange={(e) => setGroupName(e.target.value)} 
                        />
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}