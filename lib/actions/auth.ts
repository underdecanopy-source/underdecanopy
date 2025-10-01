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
        const dataObj = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const { auth } = await createClient()
        const { data, error } = await auth.signUp(dataObj)

        const userId = data.user?.id
        if (!userId) return { errorMessage: "User Id not found" }


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