import {Modal, useModal, Button, Text, Input, useInput} from "@nextui-org/react";
import {useMemo} from "react";
import axios from "axios";


export default function AddFriendsModal(props){
    const { setVisible, ...modal } = useModal();
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
            text: isValid ? "Email correct" : "Entrer un email valide",
            color: isValid ? "success" : "error",
        };
    }, [value]);

    const close = () => {
        reset();
        setVisible(false);
    }
    const validate = () => {
        axios.post('/api/friends/add',{email:value}).then(()=>{
            props.refresh();
        }).catch(console.error).finally(close);
    }
    return (
        <div style={{justifyContent:"center",display:"flex"}}>
            <Button auto ghost color="gradient" onClick={()=>setVisible(true)}>
                {"Ajouter un ami"}
            </Button>
            <Modal
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...modal.bindings}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Ajouter un ami via son email
                    </Text>
                </Modal.Header>
                <Modal.Body css={{minHeight:"100px"}}>
                    <Input
                        {...bindings}
                        clearable
                        onClearClick={reset}
                        status={helper.color}
                        color={helper.color}
                        helperColor={helper.color}
                        helperText={helper.text}
                        type="email"
                        label="Email"
                        placeholder="Entrez le mail de votre ami..."
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={close}>
                        Annuler
                    </Button>
                    <Button auto disabled={!validateEmail(value)} onClick={validate}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}