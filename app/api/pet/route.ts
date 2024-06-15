import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

export async function GET(req: NextRequest) {
    const pets = await prisma.pet.findMany({orderBy: {createdAt: "desc"}});

    if (!pets) {
        return NextResponse.error();
    }

    return NextResponse.json({  
        pets: pets,
    });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const pet = await prisma.pet.create({
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

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    const ids = body.map((id: string) => parseInt(id));
    await prisma.pet.deleteMany({
        where: {
            id: {
                in: ids,
            },
        },
    });

    return NextResponse.json({  
        message: 'Pets deleted',
    });
}