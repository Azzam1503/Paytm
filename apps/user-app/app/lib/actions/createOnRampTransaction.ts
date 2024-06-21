"use server";

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";


export  async function createOnRampTransactoin(amount: number, provider: string){
    try {
        const session  = await getServerSession(authOptions);
        const token = (Math.random()*1000).toString();
        const userId = session?.user.id;
    
        if(!userId){
            return {
                message: "User not logged in"
            }
        }
        
        const trxn = await prisma.onRampTransaction.create({
            data: {
                userId: Number(userId),
                amount: amount * 100,
                status: "Porcessing",
                startTime: new Date(),
                provider,
                token: token
            }
        });
        console.log(trxn);
        return {
            message: "On ramp transaction added"
        }
    } catch (error) {
        console.log("error in on on ramp server action",error)
    }
}