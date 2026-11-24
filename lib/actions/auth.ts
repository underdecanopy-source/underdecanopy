"use server"
import { createClient } from "../auth/server";


export async function login(prevState: unknown, formData: FormData) {
    try {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const { auth } = await createClient()
        const { error } = await auth.signInWithPassword(data)

        if (error) {
            return { errorMessage: error.message }
        }
        return { errorMessage: null }
    }
    catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return { errorMessage: error.message }
        }
        else return { errorMessage: "An error occured" }
    }
}

export async function logout() {
    try {

        const { auth } = await createClient()
        const { error } = await auth.signOut()

        if (error) {
            return { errorMessage: error.message }
        }
        return { errorMessage: null }
    }
    catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return { errorMessage: error.message }
        }
        else return { errorMessage: "An error occured" }
    }
}

export async function signUp(prevState: unknown, formData: FormData) {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            return { errorMessage: "Passwords do not match" }
        }

        const { auth } = await createClient()
        const { data, error } = await auth.signUp({ email, password })

        if (error) {
            return { errorMessage: error.message }
        }

        const userId = data.user?.id
        if (!userId) return { errorMessage: "User Id not found" }
        return { errorMessage: null }
    }
    catch (error) {
        if (error instanceof Error && /fetch failed/i.test(error.message)) {
            console.error('[auth] Supabase sign-up request could not reach the configured auth service')
            return {
                errorMessage: "We couldn't reach the account service. Please try again shortly. If this continues, contact support."
            }
        }

        console.error('[auth] Sign-up failed', error instanceof Error ? error.message : 'Unknown error')
        if (error instanceof Error) {
            return { errorMessage: error.message }
        }
        else return { errorMessage: "An error occured" }
    }
}