import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const pet = await prisma.pet.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!pet) {
        return NextResponse.error();
    }

    return NextResponse.json({  
        pet: pet,
    });
}