import {Avatar, Button, Dropdown, Navbar, Text} from "@nextui-org/react";
import {signOut, useSession} from "next-auth/react"
import {useRouter} from "next/router";
import Link from "next/link";
import { APP_TITLE } from "../constants/text";
import md5 from 'md5';

export default function NavBar(){
    const { data:session, status } = useSession();
    const router = useRouter();
    const { pathname } = router;


    const avatar = () => {
        const hash = md5(
            session.user.email.trim().toLowerCase()).toString();
        return `https://www.gravatar.com/avatar/${hash}`;
    }

    const login=status==="authenticated";
    const collapseItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];
    const setActive = (path) => {
        if(pathname===path)
            return {rounded:true,css:{color:"white"},color:"gradient"}
        else return {light:true}
    }
    return(
        <Navbar isBordered variant="sticky" css={{zIndex:5000}}>
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand
                css={{
                    "@xs": {
                        w: "12%",
                    },
                }}
            >
                <Text b color="inherit" hideIn="xs">
                    {APP_TITLE}
                </Text>
            </Navbar.Brand>
            <Navbar.Content
                enableCursorHighlight
                activeColor="secondary"
                hideIn="xs"
                variant="highlight-rounded"
            >{login?
                <>
                    <Button auto as={Link} href="/" {...setActive("/")}>{"Accueil"}</Button>
                    <Button auto as={Link} href="/group" {...setActive("/group")}>{"Groupes"}</Button>
                    <Button auto as={Link} href="/friends" {...setActive("/friends")}>{"Amis"}</Button>
                </>:<></>
            }

            </Navbar.Content>
            <Navbar.Content
                css={{
                    "@xs": {
                        w: "12%",
                        jc: "flex-end",
                    },
                }}
            >
                {login?
                    <Dropdown placement="bottom-right">
                        <Navbar.Item>
                            <Dropdown.Trigger>
                                <Avatar
                                    bordered
                                    as="button"
                                    color="gradient"
                                    size="md"
                                    src={avatar()}
                                />
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="User menu actions"
                            color="secondary"
                            onAction={(actionKey) => {
                                switch (actionKey){
                                    case "logout":
                                        return signOut({callbackUrl:"/"});
                                    default:
                                        return;
                                }
                            }}
                        >
                            <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    Authentifie en tant que
                                </Text>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    {session.user.email }
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="settings" withDivider>
                                My Settings
                            </Dropdown.Item>
                            <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
                            <Dropdown.Item key="analytics" withDivider>
                                Analytics
                            </Dropdown.Item>
                            <Dropdown.Item key="system">System</Dropdown.Item>
                            <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
                            <Dropdown.Item key="help_and_feedback" withDivider>
                                Help & Feedback
                            </Dropdown.Item>
                            <Dropdown.Item key="logout" withDivider color="error">
                                Log Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    <>
                        <Navbar.Item>
                           <Button auto ghost color={"gradient"} as={Link} href={"/auth/login"}>
                               {"Se connecter"}
                           </Button>
                        </Navbar.Item>
                        <Navbar.Item>
                            <Button auto flat as={Link} css={{color:"white"}} href="/auth/register" color={"gradient"}>
                                {"S'inscrire"}
                            </Button>
                        </Navbar.Item>
                    </>
                }
            </Navbar.Content>
            <Navbar.Collapse>
                {collapseItems.map((item, index) => (
                    <Navbar.CollapseItem
                        key={item}
                        activeColor="secondary"
                        css={{
                            color: index === collapseItems.length - 1 ? "$error" : "",
                        }}
                        isActive={index === 2}
                    >
                        <Link
                            css={{
                                color:"black",
                                minWidth: "100%",
                            }}
                            href="#"
                        >
                            {item}
                        </Link>
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>
        </Navbar>
    )
}