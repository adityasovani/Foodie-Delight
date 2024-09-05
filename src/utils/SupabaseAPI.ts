import RouteNames from "../Config/routesnames";
import supabase from "./supabase";

export const signIn = async (email: string, password: string) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.log(error);
            window.location.href = RouteNames.LOGIN;
        }
        return { data, error };
    } catch (error) {
        console.log(error);
        window.location.href = RouteNames.LOGIN;
    }
    return {};
};

export const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    } finally {
        window.location.href = RouteNames.LOGIN;
    }
};

export const getRestaurents = async (page: number) => {
    try {
        const { data, error } = await supabase
            .from("Restaurents")
            .select("*")
            .order("id", { ascending: false }).range(20 * (page - 1), 20 * page);
        if (error) {
            console.log(error);
        }
        return { data, error };
    } catch (error) {
        console.log(error);
    }
    return {};
}

export const deleteRestaurent = async (id: number) => {
    try {
        const { data, error } = await supabase
            .from("Restaurents")
            .delete()
            .eq("id", id);
        if (error) {
            console.log(error);
        }
        return { data, error };
    } catch (error) {
        console.log(error);
    }
    return {};
}

export const addRestaurent = async (name: string, owner_name: string, address: string, description: string) => {
    try {
        const { data, error } = await supabase
            .from("Restaurents")
            .insert([{ name, owner_name, address, description }]);
        if (error) {
            console.log(error);
        }
        return { data, error };
    } catch (error) {
        console.log(error);
    }
    return {};
}

export const updateRestaurent = async (id: number, name: string, owner_name: string, address: string, description: string) => {
    try {
        const { data, error } = await supabase
            .from("Restaurents")
            .update({ name, owner_name, address, description })
            .eq("id", id);
        if (error) {
            console.log(error);
        }
        return { data, error };
    } catch (error) {
        console.log(error);
    }
    return {};
}