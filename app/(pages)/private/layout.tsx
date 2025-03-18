import Header from "@/app/_components/landingPage/header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser()
    
    if (error || !data?.user) {
        redirect('/login')
    }

	return (
        <div>
            <Header />

            {children}
        </div>
    )
}