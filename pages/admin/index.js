import AppLayout from "../../components/AppLayout";
import {useEffect} from "react";
import axios from "axios";
import CreateModal from "../../components/admin/CreateModal";

export default function Admin(){


    return <AppLayout>
        <div style={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center"}}>
            <CreateModal/>
        </div>
    </AppLayout>
}