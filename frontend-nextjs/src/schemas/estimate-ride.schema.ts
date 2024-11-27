import { z } from "zod";

export const estimateRideSchema = z.object({
    customer_id: z
        .string({ message: "ID do cliente é obrigatório" })
        .min(1, { message: "Insira um ID válido" })
        .refine((value) => /^\d+$/.test(value), { message: "O ID deve conter apenas números" }),
    origin: z
        .string({ message: "Origem é obrigatório" })
        .min(4, { message: "Insira uma origem válida" }),
    destination: z
        .string({ message: "Destino é obrigatório" })
        .min(4, { message: "Insira um destino válido" }),
}).refine(
    (data) => (data.origin).toLowerCase() !== (data.destination).toLowerCase(),
    { message: "O destino não pode ser igual à origem", path: ['destination'] }
);


export type TEstimateRideSchema = z.infer<typeof estimateRideSchema>;