"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Mail, Trash } from "lucide-react";
import { Button } from "../ui/button";

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
                <CardTitle className="text-xl">Novo Grupo</CardTitle>
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

                    <div className="space-y-2 mt-6">
                        <Label htmlFor="participants" className="text-xl">
                            Participantes
                        </Label>
                        {participants.map((participant, index) => (
                            <div key={index} className="flex space-x-2">
                                <Input 
                                    id={`participant-name-${index}`}
                                    name={`participant-name-${index}`}
                                    type="text" 
                                    placeholder="Nome" 
                                    value={participant.name} 
                                    onChange={(e) => {
                                        const newParticipants = [...participants];
                                        newParticipants[index].name = e.target.value;
                                        setParticipants(newParticipants);
                                    }} 
                                />
                                <Input 
                                    id={`participant-email-${index}`}
                                    name={`participant-email-${index}`}
                                    type="email" 
                                    placeholder="E-mail" 
                                    value={participant.email} 
                                    onChange={(e) => {
                                        const newParticipants = [...participants];
                                        newParticipants[index].email = e.target.value;
                                        setParticipants(newParticipants);
                                    }} 
                                />

                                <Button
                                    type="button"
                                    variant='outline' 
                                    onClick={() => {
                                        const newParticipants = [...participants];
                                        newParticipants.splice(index, 1);
                                        setParticipants(newParticipants);
                                    }}
                                >             
                                    <Trash size={18}/>
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <Button onClick={() =>{}}>
                            Adicionar Amigo
                        </Button>

                        <Button onClick={() =>{}} className="bg-destructive text-white">
                            <Mail size={18} className="mr-2"/>
                            Criar grupo e enviar e-mails
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}