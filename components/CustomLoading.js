import {Container, Loading} from "@nextui-org/react";

export default function CustomLoading(){
    return <Container fluid css={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
        <Loading type={"points"}></Loading>
    </Container>;
}