import AppLayout from "../../components/AppLayout";
import {Button, Card, Text} from "@nextui-org/react";


export default function Group(){
    return <AppLayout>
        <div style={{display:"flex", alignItems:"center",flexDirection:"column",width:"100%"}}>
            <div>
                <Card css={{minWidth:"400px",margin:50}}>
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
            <div>
                <Card css={{minWidth:"400px",margin:50}}>
                    <Card.Header>Coupe du monde - Quatar 2022</Card.Header>
                    <Card.Body>
                        Prochain match : France - Croatie
                    </Card.Body>
                    <Card.Footer>
                        <Button color={"gradient"}>{"S'inscrire pour 50€"}</Button>
                    </Card.Footer>
                </Card>
            </div>
            <div>
                <Card css={{minWidth:"400px",margin:50}}>
                    <Card.Header>Coupe du monde - Quatar 2022</Card.Header>
                    <Card.Body>
                        Prochain match : France - Croatie
                    </Card.Body>
                    <Card.Footer>
                        <Button color={"gradient"}>{"S'inscrire pour 50€"}</Button>
                    </Card.Footer>
                </Card>
            </div>
            <div>
                <Card css={{minWidth:"400px",margin:50}}>
                    <Card.Header>Coupe du monde - Quatar 2022</Card.Header>
                    <Card.Body>
                        Prochain match : France - Croatie
                    </Card.Body>
                    <Card.Footer>
                        <Button color={"gradient"}>{"S'inscrire pour 50€"}</Button>
                    </Card.Footer>
                </Card>
            </div>
            <div>
                <Card css={{minWidth:"400px",margin:50}}>
                    <Card.Header>Coupe du monde - Quatar 2022</Card.Header>
                    <Card.Body>
                        Prochain match : France - Croatie
                    </Card.Body>
                    <Card.Footer>
                        <Button color={"gradient"}>{"S'inscrire pour 50€"}</Button>
                    </Card.Footer>
                </Card>
            </div>
        </div>

    </AppLayout>
}