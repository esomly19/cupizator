import AppLayout from "../../components/AppLayout";
import {Button, Card, Spacer, Text} from "@nextui-org/react";
import CreateModal from "../../components/admin/CreateModal";
import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";
import {useSession} from "next-auth/react";
import MatchsModal from "../../components/group/MatchsModal";


export default function Group(){
    let [groups,setGroups]=useState([]);
    const { data: session, status } = useSession();

    useEffect(()=>{
       refresh();
    },[])

    const refresh = () => {
        axios.get("/api/group").then((res)=>setGroups(res.data.reverse()));
    }

    const participateTour = (id) =>{
        axios.post("/api/group/addbettor",{bettor:{id:session.user.id},group:{id:id}}).finally(refresh)
    }


    return <AppLayout>
        <div style={{display:"flex", alignItems:"center",flexDirection:"column",width:"100%",paddingBottom:"50px"}}>
            <Spacer/>
            <div style={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center"}}>
                <CreateModal refresh={refresh}/>
            </div>
            <div>
                {
                    groups.map((group)=><>
                        <Spacer/>
                        <Card css={{minWidth:"400px"}}>
                            <Card.Header><Image src={"/tournoi.png"} width={30} height={30} style={{marginRight:10}}/><Text b>{group.name}</Text></Card.Header>
                            <Card.Divider />
                            <Card.Body>
                                Prochain match : {group.matchs[0].team1} - {group.matchs[0].team2}
                            </Card.Body>
                            <Card.Divider />
                            <Card.Footer>{group.members.find((member)=>member.id===session?.user.id)?
                                <MatchsModal group={group}/>
                                :
                                <Button onClick={()=>participateTour(group.id)} color={"gradient"}>{"S'inscrire pour "+group.price+"€"}</Button>
                            }
                            </Card.Footer>
                        </Card>
                    </>)
                }
            </div>
        </div>

    </AppLayout>
}