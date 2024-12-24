import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const dataStatus = [
      {
        name: "ACTIVE",
        code: "ACT",
      },
      {
        name: "REMOVED",
        code: "REM",
      },
    ];
    const dataDoctors = [
      {
        id: "doc1",
        name: "Dr. John Smith",
        specialty: "Cardiology",
        phoneNumber: "081234567890",
      },
      {
        id: "doc2",
        name: "Dr. Alice Brown",
        specialty: "Neurology",
        phoneNumber: "081987654321",
      },
    ];

    const dataPatients = [
      {
        id: "pat1",
        name: "Michael Johnson",
        age: 45,
        address: "123 Main Street",
        doctorId: "doc1", // Mengacu ke Doctor dengan id `doc1`
      },
      {
        id: "pat2",
        name: "Emily Davis",
        age: 38,
        address: "456 Elm Avenue",
        doctorId: "doc1", // Mengacu ke Doctor dengan id `doc1`
      },
      {
        id: "pat3",
        name: "William Brown",
        age: 50,
        address: "789 Oak Lane",
        doctorId: "doc2", // Mengacu ke Doctor dengan id `doc2`
      },
    ];

    await prisma.status.createMany({
      data: dataStatus,
    });

    await prisma.doctor.createMany({
      data: dataDoctors,
    });

    await prisma.patient.createMany({
      data: dataPatients,
    });

    console.log("Successfully generating data seed");
  } catch (error) {
    console.error("Something went wrong when seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
