
import AuthLayout from "../../components/AuthLayout";
import {Button, Card, Col, Container, Input, Link, Row, Spacer, Text, useInput} from "@nextui-org/react";
import {TITLE_GRADIENT} from "../../constants/css";
import {useMemo, useState} from "react";
import CustomLoading from "../../components/CustomLoading";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function Register(){
    //Check if user is already connected
    const [error,setError]=useState();
    const {status}=useSession();
    const router=useRouter();
    if(status!=="loading"&&status!=="unauthenticated") router.push("/");

    const { value, reset, bindings } = useInput("");

    const validateEmail = (value) => {
        return value?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if( event.target.password.value!== event.target.password_confirm.value){
            return setError("Les deux mot de passe ne correspondent pas !")
        }
        const data = {
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            email: event.target.email.value,
            password: event.target.password.value
        }

        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/auth/register';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const {state} = await response.json();

        switch (state){
            case "CREATED":
                return router.push("/auth/login?register=SUCCESS");
            case "EXIST":
                return setError("Un utilisateur existe déjà avec ce mail !");
        }

    }

    if(status==="loading" || status!=="unauthenticated")
        return <CustomLoading></CustomLoading>;

    return(
        <AuthLayout>
            <Card css={{ mw: "40em" }}>
                <Card.Header>
                    <Container>
                        <Text
                            h1
                            size={30}
                            css={{...TITLE_GRADIENT,width:"100%"}}
                            weight="bold"
                        >
                            {"Créer un compte"}
                        </Text>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <form onSubmit={handleSubmit}>
                        <Container fluid>
                        <Row>
                            <Col>
                                <Input
                                    bordered
                                    required
                                    name="lastname"
                                    label="Nom"
                                    placeholder="Saisir votre nom"
                                />
                            </Col>
                            <Col>
                                <Input
                                    bordered
                                    required
                                    name="firstname"
                                    label="Prénom"
                                    placeholder="Saisir votre prénom"
                                />
                            </Col>
                        </Row>
                        <Spacer y={1} />
                        <Row>
                            <Input
                                bordered
                                required
                                css={{width:"20em"}}
                                {...bindings}
                                shadow={false}
                                onClearClick={reset}
                                status={helper.color}
                                helperColor={helper.color}
                                helperText={helper.text}
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="Saisir votre email"
                            />
                        </Row>
                        <Spacer y={1}/>
                        <Row>
                            <Input.Password
                                bordered
                                required
                                label="Mot de passe"
                                name="password"
                                placeholder={"Saisir votre mot de passe"}/>
                        </Row>
                        <Spacer y={1}/>
                        <Row>
                            <Input.Password
                                bordered
                                required
                                name="password_confirm"
                                label="Confirmer mot de passe"
                                placeholder={"Saisir votre mot de passe"}/>
                        </Row>
                        <Spacer y={1}/>
                        <Row>
                            <Text color="error">
                                {error}
                            </Text>
                        </Row>
                        <Spacer y={1}/>
                        <Row css={{justifyContent:"center"}}>
                            <Button type="submit" ghost color="gradient" auto>
                                {"S'inscrire"}
                            </Button>
                        </Row>
                        <Spacer y={1}/>
                        <Row css={{justifyContent:"center"}}>
                            <Link href={"/auth/login"} block color="primary">
                                Déjà inscrit?
                            </Link>
                        </Row>
                    </Container>
                    </form>
                </Card.Body>
            </Card>
        </AuthLayout>
    )
}