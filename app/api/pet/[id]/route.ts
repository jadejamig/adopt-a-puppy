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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const id = parseInt(params.id);
    console.log({id})
    const pet = await prisma.pet.update({
        where: {
            id: id,
        },
        data: {
            name: body.name,
            age: body.age,
            ageLabel: body.ageLabel,
            breed: body.breed,
            gender: body.gender,
            location: body.location,
            image: body.image,
            size: body.size,
        },
    });

    if (!pet) {
        return NextResponse.error();
    }

    return NextResponse.json({  
        pet: pet,
    });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    await prisma.pet.delete({
        where: {
            id: id,
        },
    });

    return NextResponse.json({  
        message: 'Pet deleted',
    });
}