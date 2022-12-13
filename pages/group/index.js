import AppLayout from "../../components/AppLayout";
import {Button, Card, Spacer, Text} from "@nextui-org/react";
import CreateModal from "../../components/admin/CreateModal";


export default function Group(){
    return <AppLayout>
        <div style={{display:"flex", alignItems:"center",flexDirection:"column",width:"100%"}}>
            <Spacer/>
            <div style={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center"}}>
                <CreateModal/>
            </div>
            <div>
                <Spacer/>
                <Card css={{minWidth:"400px"}}>
                    <Card.Header><Text b>Coupe du monde - Quatar 2022</Text></Card.Header>
                    <Card.Divider />
                    <Card.Body>
                        Prochain match : France - Croatie
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                        <Button color={"gradient"}>{"S'inscrire pour 50€"}</Button>
                    </Card.Footer>
                </Card>
            </div>
        </div>

    </AppLayout>
}