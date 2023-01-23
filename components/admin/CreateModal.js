import {Modal, useModal, Button, Text, Input, Spacer} from "@nextui-org/react";
import {useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";

export default function CreateModal(props) {
    const { setVisible, bindings } = useModal();
    let [nom,setNom] = useState("");
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
    }

    const patchData = () => {
        return {
            managerId:session.user.id,
            name: nom+"",
            matchs: matchs.map((match)=>{
                return {
                    date:new Date(),
                    ...match,
                }
            })
        }
    }

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
                <Modal.Body>
                    <Spacer y={1} />
                    <Input clearable bordered labelPlaceholder="Nom" value={nom} onChange={({target})=>setNom(target.value)}/>
                    <Spacer y={2.5} />
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
                    <div style={{justifyContent:"center",display:"flex"}}>
                        <Button ghost color={"gradient"} onClick={()=>setMatchs([...matchs,{team1:"",team2:""}])}>+</Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={close}>
                        Annuler
                    </Button>
                    <Button ghost auto color="gradient"onClick={create} disabled={loading}>
                        Creer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
