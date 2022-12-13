import NavBar from "./NavBar";
import Footer from "./Footer";
import {Container} from "@nextui-org/react";

export default function AppLayout({children}){
    return(
      <div style={{height:"100vh",display:"flex",flexDirection:"column"}}>
          <NavBar/>
          <div style={{display:"flex",flex:6}}>
              {children}
          </div>
          <Footer/>
      </div>
    );
}