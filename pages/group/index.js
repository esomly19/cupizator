import AppLayout from "../../components/AppLayout";
import {Button, Card, Spacer, Text} from "@nextui-org/react";
import CreateModal from "../../components/admin/CreateModal";
import {useEffect, useState} from "react";
import axios from "axios";


export default function Group(){
    let [groups,setGroups]=useState([]);

    useEffect(()=>{
       refresh();
    },[])

    const refresh = () => {
        console.log("refreshss")
        axios.get("/api/group").then((res)=>setGroups(res.data));
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
                            <Card.Header><Text b>{group.name}</Text></Card.Header>
                            <Card.Divider />
                            <Card.Body>
                                Prochain match : {group.matchs[0].team1} - {group.matchs[0].team2}
                            </Card.Body>
                            <Card.Divider />
                            <Card.Footer>
                                <Button color={"gradient"}>{"S'inscrire pour 50€"}</Button>
                            </Card.Footer>
                        </Card>
                    </>)
                }
            </div>
        </div>

    </AppLayout>
}