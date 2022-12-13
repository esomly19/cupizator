import { prisma } from ".prisma/client";

export default async function handler(req, res) {
    // By name
    const groupName = await prisma.group.findUnique({
        where: {
          name: req.body.name,
        },
      })

    // By ID
    const groupId = await prisma.group.findUnique({
      where: {
        id: req.body.id,
      },
    })
    
    // Tous les groupes auquels le user est admins
    const groupsManagers = await prisma.group.findMany({
      where: {
          managerId: req.body.managerId
      }
    })
    
    // Tous les groupes auquels l'utilisateur est associée
    const groups = await prisma.group.findMany({
        where: {
            members: {
                some: {
                    name: req.body.name
                }
            }
        }
    })
}