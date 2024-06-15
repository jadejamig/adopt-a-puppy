import prisma from './db'

async function main() {
    const rocky = await prisma.pet.create({
        data: {
            name: 'Rocky',
            age: '2',
            ageLabel: 'Puppy',
            breed: 'Labrador',
            gender: 'Male',
            location: 'New York',
            image: '/labrador.jpeg',
            size: 'Medium',
        },
    })
    const max = await prisma.pet.create({
        data: {
            name: 'Max',
            age: '3',
            ageLabel: 'Adult',
            breed: 'Chihuahua',
            gender: 'Female',
            location: 'London',
            image: '/chihuahua.jpeg',
            size: 'Small',
        },
    })
    const charlie = await prisma.pet.create({
        data: {
            name: 'Charlie',
            age: '4',
            ageLabel: 'Adult',
            breed: 'German Shepherd',
            gender: 'Male',
            location: 'Paris',
            image: '/germanshep.jpeg',
            size: 'Large',
        },
    })
    const sam = await prisma.pet.create({
        data: {
            name: 'Sam',
            age: '5',
            ageLabel: 'Senior',
            breed: 'Golden Retriever',
            gender: 'Male',
            location: 'New York',
            image: '/goldenretriever.jpeg',
            size: 'Medium',
        },
    })
    const lucy = await prisma.pet.create({
        data: {
            name: 'Lucy',
            age: '6',
            ageLabel: 'Senior',
            breed: 'Labrador',
            gender: 'Female',
            location: 'London',
            image: '/labrador2.jpeg',
            size: 'Medium',
        },
    })
    const jack = await prisma.pet.create({
        data: {
            name: 'Jack',
            age: '2',
            ageLabel: 'Puppy',
            breed: 'Beagle',
            gender: 'Male',
            location: 'Paris',
            image: '/beagle.jpeg',
            size: 'Small',
        },
    })
    const pupa = await prisma.pet.create({
        data: {
            name: 'Pupa',
            age: '8',
            ageLabel: 'Senior',
            breed: 'Poodle',
            gender: 'Female',
            location: 'New York',
            image: '/poodle.jpeg',
            size: 'Small',
        }, 
    })
    const rusty = await prisma.pet.create({
        data: {
            name: 'Rusty',
            age: '9',
            ageLabel: 'Senior',
            breed: 'Pug',
            gender: 'Male',
            location: 'Paris',
            image: '/pug.jpeg',
            size: 'Small',
        },
    })
    const billy = await prisma.pet.create({
        data: {
            name: 'Billy',
            age: '1',
            ageLabel: 'Puppy',
            breed: 'Border Collie',
            gender: 'Female',
            location: 'London',
            image: '/borderCollie.jpeg',
            size: 'Medium',
        },
    })
    const spooky = await prisma.pet.create({
        data: {
            name: 'Spooky',
            age: '6',
            ageLabel: 'Senior',
            breed: 'Bull Terrier',
            gender: 'Male',
            location: 'Paris',
            image: '/bullTerrier.jpeg',
            size: 'Medium',
        },
    })
    console.log({
        rocky,
        max,
        charlie,
        sam,
        lucy,
        jack,
        pupa,
        rusty,
        billy,
        spooky,
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })