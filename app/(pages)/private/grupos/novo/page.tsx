import NewGroupForm from "@/app/_components/commons/NewGroupForm";
import { createClient } from "@/utils/supabase/server";

export default async function NewGroupPage () {

    const supabase = await createClient()

    const { data } = await supabase.auth.getUser()

    const loggedUser = {
        id: data?.user?.id || '',
        email: data?.user?.email || ''
    }
       
    return (
        <section className=" max-w-7xl mx-auto p-4">
            <NewGroupForm loggedUser={loggedUser} />
        </section>
    )
}