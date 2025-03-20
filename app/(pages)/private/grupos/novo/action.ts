"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type CreateGroupState = {
    success: boolean | null;
    message?: string;
};

type Participants = {
    id: string;
    group_id: string;
    name: string;
    email: string;
    assigned_to: string | null;
    created_at: string;
    updated_at: string;
};

export default async function createGroup(
    _previousState: CreateGroupState,
    formData: FormData
) {
    const supabase = await createClient();

    const { data:authUser, error:authError } = await supabase.auth.getUser();

    if (authError) {
        return { success: false, message: "Ocorreu um erro ao criar o grupo." };
    }

    // Capture values from the input fields
    const names = formData.getAll("name"); // Get all values for "name"
    const emails = formData.getAll("email"); // Get all values for "email"
    const groupName = formData.get("group-name"); // Get the value for "group-name"

    //salvar no meu backend o grupo
    const { data: groupData, error } = await supabase.from("groups").insert({
        name: groupName,
        owner_id: authUser?.user.id,
    })
    .select()
    .single();
    
    if (error) {
        return { success: false, message: "Ocorreu um erro ao criar o grupo. Por favor tente novamente." };
    }

    // Criar os participantes do grupo
    const participants = names.map((name, index) => ({ 
        group_id: groupData.id,
        name,
        email: emails[index]
    }));

    const { data: participantsCreate, error: participantsError } = await supabase.from("participants").insert(participants).select();

    if (participantsError) {
        return { 
            success: false, 
            message: "Ocorreu um erro ao cadicionar os participantes ao grupo. Por favor tente novamente." 
        };
    }

    //sorteio dos participantes
    const drawnParticipants = drawGroup(participantsCreate);

    //atualizar os participantes com quem eles tiraram
    const { error: updateParticipantsError } = await supabase.from("participants").upsert(drawnParticipants);

    if (updateParticipantsError) {
        return { 
            success: false, 
            message: "Ocorreu um erro ao realizar o sorteio dos participantes. Por favor tente novamente." 
        };
    }

    redirect(`/private/grupos/${groupData.id}`);

}

function drawGroup(participants: Participants[]) {
    //sorteio dos participantes
    const selectedParticipants: string[] = [];

    return participants.map((participant) => {
        const availableparticipants = participants.filter(
            (p) => !selectedParticipants.includes(p.id) && p.id !== participant.id
        );

        //quem a pessoa tirou
        const assignedParticipant =
            availableparticipants[Math.floor(Math.random() * availableparticipants.length)];

        return {
            ...participant,
            assigned_to: assignedParticipant.id
        }
    });
}
