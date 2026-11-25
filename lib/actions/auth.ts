"use server"
import { createClient } from "../auth/server";
import { getAuthErrorMessage } from "../auth/errors";


export async function login(prevState: unknown, formData: FormData) {
    try {
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const { auth } = await createClient()
        const { error } = await auth.signInWithPassword(data)

        if (error) {
            return { errorMessage: getAuthErrorMessage(error) }
        }
        return { errorMessage: null }
    }
    catch (error) {
        if (error instanceof Error && /fetch failed/i.test(error.message)) {
            console.error('[auth] Login request could not reach the configured auth service')
        }
        console.error('[auth] Login failed', error instanceof Error ? error.message : 'Unknown error')
        return { errorMessage: getAuthErrorMessage(error) }
    }
}

export async function logout() {
    try {

        const { auth } = await createClient()
        const { error } = await auth.signOut()

        if (error) {
            return { errorMessage: getAuthErrorMessage(error) }
        }
        return { errorMessage: null }
    }
    catch (error) {
        console.log(error)
        return { errorMessage: getAuthErrorMessage(error) }
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
            return { errorMessage: getAuthErrorMessage(error) }
        }

        const userId = data.user?.id
        if (!userId) return { errorMessage: "User Id not found" }
        return { errorMessage: null }
    }
    catch (error) {
        if (error instanceof Error && /fetch failed/i.test(error.message)) {
            console.error('[auth] Supabase sign-up request could not reach the configured auth service')
        }

        console.error('[auth] Sign-up failed', error instanceof Error ? error.message : 'Unknown error')
        return { errorMessage: getAuthErrorMessage(error) }
    }
}