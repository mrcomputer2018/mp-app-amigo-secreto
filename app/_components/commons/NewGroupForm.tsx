"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Mail, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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

    

    function handleAddParticipant(name: string, email: string) {
        setParticipants([...participants, {name: name, email: email}]);
    }

    function updateParticipant(index: number, key: string, value: string) {
        const newParticipants = [...participants];

        if (key === "name" || key === "email") {
            newParticipants[index][key as keyof IParticipant] = value;
        }

        setParticipants(newParticipants);
    }

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

                    <div className="space-y-2 mt-8">
                        <Label htmlFor="participants" className="text-xl">
                            Participantes
                        </Label>
                        {participants.map((participant, index) => (
                            <div key={index} className="flex flex-col md:flex-row space-x-2 md:space-x-4 space-y-2">
                                <Input 
                                    id={`name-${index}`}
                                    name={`name-${index}`}
                                    type="text" 
                                    placeholder="Nome" 
                                    value={participant.name} 
                                    onChange={(e) => {
                                        updateParticipant(index,"name", e.target.value);
                                    }}
                                    required 
                                />
                                <Input 
                                    id={`email-${index}`}
                                    name={`email-${index}`}
                                    type="email" 
                                    placeholder="E-mail" 
                                    className="readonly:text-muted-foreground"
                                    readOnly={participant.email === loggedUser.email}
                                    value={participant.email} 
                                    onChange={(e) => {
                                        const newParticipants = [...participants];
                                        newParticipants[index].email = e.target.value;
                                        setParticipants(newParticipants);
                                    }} 
                                    required
                                />

                                { participant.email === loggedUser.email ? 
                                <Button
                                    className="border-none hover:border-none !hover:bg-background min-w-9"
                                    variant='outline'
                                >
                                </Button>
                                : 
                                <Button
                                    type="button"
                                    variant='outline'
                                    className="min-w-9" 
                                    onClick={() => {
                                        const newParticipants = [...participants];
                                        newParticipants.splice(index, 1);
                                        setParticipants(newParticipants);
                                    }}
                                >             
                                    <Trash size={18}/>
                                </Button>
                                }

                            </div>
                        ))}
                    </div>
                    <Separator className="my-4" />
                    <CardFooter className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                        <Button 
                        type='button' 
                        className="w-full md:w-auto"
                        onClick={() => handleAddParticipant('', '')}
                        >
                            Adicionar Amigo
                        </Button>

                        <Button 
                        type='submit' 
                        onClick={() =>{}} 
                        className="bg-destructive text-white w-full md:w-auto flex items-center">
                            <Mail size={18} className="mr-2"/>
                            Criar grupo e enviar e-mails
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}