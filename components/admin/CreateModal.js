import {Modal, useModal, Button, Text, Input, Spacer} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";

export default function CreateModal(props) {
    const { setVisible, bindings } = useModal();
    let [nom,setNom] = useState("");
    let [price,setPrice] = useState("");
    const { data: session, status } = useSession()
    let [matchs,setMatchs] = useState([]);
    let [loading,setLoading]=useState(false)

    const create = () =>{
        setLoading(true)
        axios.post("/api/group/add",{...patchData()}).then(()=>close()).catch(()=>setLoading(false))
    }

    const reset = () => {
        setMatchs([]);
        setNom("");
    }

    const close = () => {
        props.refresh();
        reset();
        setLoading(false)
        setVisible(false)
        setPrice("");
    }

    const patchData = () => {
        return {
            managerId:session.user.id,
            name: nom+"",
            price: parseInt(price),
            matchs: matchs.map((match)=>{
                return {
                    date:new Date(),
                    ...match,
                }
            })
        }
    }

    const validation = () => !matchs.find((match)=>!match.team1||!match.team2) && nom && !loading && price

    return (
        <div>
            <Button auto ghost color="gradient" onClick={() => setVisible(true)}>
                Créer un nouveau groupe
            </Button>
            <Modal
                scroll
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        {"Création d'un groupe"}
                    </Text>
                </Modal.Header>
                <Modal.Body style={{height:"70vh"}}>
                    <Spacer y={1} />
                    <Input clearable bordered labelPlaceholder="Nom" value={nom} onChange={({target})=>setNom(target.value)}/>
                    <Spacer y={1} />
                    <Input clearable bordered labelPlaceholder="Prix d'entrée" value={price} onChange={({target})=>setPrice(target.value)} type={"number"}/>
                    <Spacer y={1} />
                    <div style={{overflow:"auto"}}>
                        {matchs.map((match,index)=><>
                            <Spacer y={1} />
                            <div style={{justifyContent:"center",alignItems:"center",display:"flex"}}>
                                <Input value={match.team1} onChange={({target})=>{
                                    let array = [...matchs];
                                    array[index]={...match,team1:target.value}
                                    setMatchs(array)
                                }} placeholder={"Equipe 1"}/>
                                <span style={{marginLeft:10,marginRight:10}}> VS </span>
                                <Input value={match.team2} onChange={({target})=>{
                                    let array = [...matchs];
                                    array[index]={...match,team2:target.value}
                                    setMatchs(array)
                                }} placeholder={"Equipe 2"}/>
                            </div>
                        </>)}
                    </div>
                    <div style={{justifyContent:"center",display:"flex",marginTop:"auto"}}>
                        <Button ghost color={"gradient"} onClick={()=>setMatchs([{team1:"",team2:""},...matchs])}>+</Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={close}>
                        Annuler
                    </Button>
                    <Button ghost auto color="gradient"onClick={create} disabled={!validation()}>
                        Creer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
