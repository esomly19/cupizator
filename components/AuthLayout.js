import {Container, Text} from "@nextui-org/react";
import {TITLE_GRADIENT} from "../constants/css";
import {APP_TITLE} from "../constants/text";

export default function AuthLayout({children}){
    return(
        <Container fluid css={{
            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignContent:"center",
            flexDirection:"column"
        }}>
            <div style={{justifyContent:"center",display:"flex"}}>
                <Text
                    h1
                    size={40}
                    css={{...TITLE_GRADIENT, width:"fit-content"}}
                >
                    {APP_TITLE}
                </Text>
            </div>
            {children}
        </Container>
    )
}