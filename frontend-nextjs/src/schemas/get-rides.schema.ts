import {z} from "zod";


export const getRidesSchema = z.object({
    customer_id: z
        .string({ message: "ID do cliente é obrigatório" })
        .min(1, { message: "Insira um ID válido" })
        .refine((value) => /^\d+$/.test(value), { message: "O ID deve conter apenas números" }),
    driver: z.string()
});

export type TGetRidesSchema = z.infer<typeof getRidesSchema>