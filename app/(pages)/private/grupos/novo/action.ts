"use server";

import { createClient } from "@/utils/supabase/server";

export type CreateGroupState = {
    success: boolean | null;
    message?: string;
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

    console.log(names, emails, groupName);

    return { success: true, message: "Grupo criado com sucesso." };
}
