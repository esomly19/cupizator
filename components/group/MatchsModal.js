import {Modal, useModal, Button, Text, Spacer} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";

export default function MatchsModal(props) {
    const { setVisible, bindings } = useModal();
    let [matchs,setMatchs] = useState(props.group?.matchs??[]);
    let [bets,setBets] = useState([]);
    let [codes,setCodes] = useState({})

    useEffect(()=>{
        setMatchs(props.group.matchs)
    },[props.group])

    useEffect(()=>{
        axios.get("https://flagcdn.com/fr/codes.json").then(res=>setCodes(res.data));
    },[])

    const close = () => {
        setVisible(false)
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const setBet = (id,value)=>{
        let bet={
            value:value,
            matchId:id
        }
        setBets([...bets.filter((b)=>b.matchId!==id),bet])
    }
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
    return (
        <div>
            <Button onClick={()=>setVisible(true)} color={"warning"}>{"Consulter mes paris"}</Button>
            <Modal
                scroll
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        {"Paris sur les matchs"}
                    </Text>
                </Modal.Header>
                <Modal.Body style={{height:"70vh"}}>
                    <div>
                        {matchs.map((match, index)=> {
                            let bet = bets.find((b)=>b.matchId===match.id);
                            bet=bet??{value:null};
                            return (<div style={{width: "100%", justifyContent: "center", display: "flex",flexDirection:"column"}}>
                                <Text b style={{textAlign:"center"}}>Match {index+1} : {capitalizeFirstLetter(match.team1)} VS {capitalizeFirstLetter(match.team2)}</Text>
                                <div style={{width: "100%", justifyContent: "center", display: "flex"}}>
                                    <Button.Group color="gradient" rounded>
                                        <Button ghost={bet.value!==1} onClick={()=>setBet(match.id,1)}>
                                            <Image src={"https://flagcdn.com/16x12/"+getKeyByValue(codes,capitalizeFirstLetter(match.team1))+".png"} width={16} height={12} alt={"flagt1"} style={{marginRight:"10px"}}/>
                                            {capitalizeFirstLetter(match.team1)}
                                        </Button>
                                        <Button ghost={bet.value!==0} onClick={()=>setBet(match.id,0)}>Egalité</Button>
                                        <Button ghost={bet.value!==2} onClick={()=>setBet(match.id,2)}>
                                            <Image src={"https://flagcdn.com/16x12/"+getKeyByValue(codes,capitalizeFirstLetter(match.team2))+".png"} width={16} height={12} alt={"flagt2"} style={{marginRight:"10px"}}/>
                                            {capitalizeFirstLetter(match.team2)}
                                        </Button>
                                    </Button.Group>
                                </div>
                                <Spacer/>
                            </div>)
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto color="gradient" onClick={close}>
                        Fermer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
