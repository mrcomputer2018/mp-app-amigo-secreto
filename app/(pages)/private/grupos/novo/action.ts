"use server"

import { createClient } from "@/utils/supabase/server"

export type CreateGroupState = {
    success: boolean | null;
    message?: string ;
}

export default async function createGroup (_previousState: CreateGroupState ,formData: FormData) {
    
    const supabase = await createClient()

    const { data: authUser, error: authError } = await supabase.auth.getUser()

    if(authError) {
        return { success: false, message: 'Ocorreu um erro ao criar o grupo.' }
    }

    const names = formData.get('name')
    const emails = formData.get('email')
    const groupName = formData.get('group-name')

    console.log(names, emails, groupName)

    return { success: true, message: 'Grupo criado com sucesso.' };
}