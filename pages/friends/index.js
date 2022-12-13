import AppLayout from "../../components/AppLayout";
import {Container} from "@nextui-org/react";
import FriendsTable from "../../components/friends/FriendsTable";
import AddFriendsModal from "../../components/friends/AddFriendsModal";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Friends(){
    const [friends,setFriends]=useState([]);
    const getFriends = () =>{
        axios.get("/api/friends/all").then((res)=>{
            setFriends(res.data);
        }).catch(console.error).finally(()=>{

        });
    }
    useEffect(()=>{
        getFriends()
    },[])

    return <AppLayout>
        <Container fluid css={{
            height:"100%",
            display:"flex",
            marginTop:"2em",
            alignContent:"center",
            flexDirection:"column"
        }}>
            <AddFriendsModal refresh={getFriends}/>
            <FriendsTable friends={friends}/>
        </Container>

    </AppLayout>
}