import AuthLayout from "../../components/AuthLayout";
import {Badge, Button, Card, Container, Input, Link, Row, Spacer, Text, useInput} from "@nextui-org/react";
import {TITLE_GRADIENT} from "../../constants/css";
import {useMemo} from "react";
import {getCsrfToken, useSession} from 'next-auth/react';
import {useRouter} from "next/router";
import CustomLoading from "../../components/CustomLoading";



export default function Login({ csrfToken }){
    //Check if user is already connected
    const {status}=useSession();
    const router=useRouter();
    const {register,error}=router.query;
    if(status!=="loading"&&status!=="unauthenticated") router.push("/");


    const { value, reset, bindings } = useInput("");

    const validateEmail = (value) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const helper = useMemo(() => {
        if (!value)
            return {
                text: "",
                color: "",
            };
        const isValid = validateEmail(value);
        return {
            text: isValid ? "Correct email" : "Enter a valid email",
            color: isValid ? "success" : "error",
        };
    }, [value]);

    if(status==="loading"||status!=="unauthenticated")
        return <CustomLoading></CustomLoading>;


    return(
        <AuthLayout>
            <Card css={{ mw: "40em",paddingTop:"5em",paddingBottom:"5em"}}>
                <Container fluid css={{justifyContent: "center", display: "flex"}}>
                    {register?
                    <Badge enableShadow disableOutline color="success" >
                        {"Création du compte effectué avec succès !"}
                    </Badge>:null}
                    {error?
                        <Badge enableShadow disableOutline color="error" >
                            {"Mot de passe ou mail incorrect!"}
                        </Badge>:null}
                </Container>
                <Card.Header>
                    <Container fluid>
                        <Container fluid css={{width:"70%"}}>
                            <Text
                                h1
                                size={30}
                                css={{...TITLE_GRADIENT,width:"100%"}}
                                weight="bold"
                            >
                                {"Se connecter"}
                            </Text>
                        </Container>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <form method="post" action={"/api/auth/callback/credentials"}>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                        <Container fluid>
                            <Container fluid css={{width:"70%"}}>
                                <Row>
                                    <Input
                                        bordered
                                        name="email"
                                        css={{width:"20em"}}
                                        {...bindings}
                                        onClearClick={reset}
                                        status={helper.color}
                                        helperColor={helper.color}
                                        helperText={helper.text}
                                        type="email"
                                        label="Email"
                                        placeholder="Saisir votre email"
                                    />
                                </Row>
                                <Spacer y={1}/>
                                <Row>
                                    <Input.Password
                                        bordered
                                        name="password"
                                        css={{width:"20em"}}
                                        label="Mot de passe"
                                        placeholder={"Saisir votre mot de passe"}/>
                                </Row>
                                <Spacer y={1}/>
                                <Row css={{justifyContent:"center"}}>
                                    <Button type="submit" ghost color="gradient" auto>
                                        {"Se connecter"}
                                    </Button>
                                </Row>
                                <Spacer y={1}/>
                                <Row css={{justifyContent:"center"}}>
                                    <Link href={"/auth/register"} block color="primary">
                                        Créer un nouveau compte
                                    </Link>
                                </Row>
                            </Container>
                        </Container>
                    </form>
                </Card.Body>
            </Card>
        </AuthLayout>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context)
        },
    };
}

