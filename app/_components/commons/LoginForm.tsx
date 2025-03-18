"use client"

import { useActionState } from 'react'
import { login, LoginState } from '../../(auth)/login/actions'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Loader, MessageCircle } from 'lucide-react'

export default function LoginForm() {
   /*  trabalha com chamada de acoes de server actions */

    const [state, formAction, pending ] = useActionState<LoginState, FormData>(
        login,
        { 
           success: null,
           message: ""
        }
    )

    return (
        <Card className='px-2 py-6 w-96'>
            <CardHeader className='w-full'>
                <CardTitle className='text-2xl font-semibold'>
                    Login
                </CardTitle>
                <CardDescription className='text-sm text-zinc-400'>
                    Digite seu email para receber um link de login.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form action={formAction} className=''>
                    <div className='flex flex-col space-y-2'>
                        <Label htmlFor="email">Email:</Label>
                        <Input id="email" name="email" type="email" required placeholder='email@email.com'/>
                    </div>

                    { state.message && (
                        <Alert className='mt-2 text-muted-foreground'>
                            <MessageCircle className='mr-2 h-4 w-4 !text-green-600'/>

                            <AlertTitle className='text-gray-50'>
                                Email enviado!!!
                            </AlertTitle>

                            <AlertDescription className='text-gray-50'>
                                Confira seu inbox para acessar o link de login.
                            </AlertDescription>
                        </Alert>
                    )}

                    { !state.message && (
                        <Alert className='mt-2 text-muted-foreground'>
                            <MessageCircle className='mr-2 h-4 w-4 !text-red-600'/>

                            <AlertTitle className='text-gray-50'>
                                Error!!!
                            </AlertTitle>

                            <AlertDescription className='text-gray-50'>
                                Ocorreu um erro ao enviar o link de login.
                                Por favor, entre em contato com o suporte.
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className='mt-4'>
                        <Button 
                            className='w-full bg-destructive text-white text-md'
                            type='submit'
                        >
                            { pending && <Loader className='animate-spin' /> }
                            Login
                        </Button>
                        {/* <button formAction={signup}>Sign up</button> */}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}