import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import {StyledBadge} from "../icons/StyledBadge";
import {IconButton} from "../icons/IconButton";
import {DeleteIcon} from "../icons/DeleteIcon";


export default function FriendsTable({friends}) {

    const columns = [
        { name: "NOM", uid: "name" },
        { name: "STATUS", uid: "status" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "name":
                return (
                    <User squared src={user.avatar} name={cellValue} css={{ p: 0 }}>
                        {user.email}
                    </User>
                );
            case "status":
                return <StyledBadge type={user.status}>{cellValue==="friend"?"AMI":"EN ATTENTE"}</StyledBadge>;

            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Supprimer cet ami"
                                color="error"
                                onClick={() => console.log("Delete user", user.id)}>
                                <IconButton>
                                    <DeleteIcon size={20} fill="#FF0080" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
        }
    };

    return (
        <Table
            aria-label="Example table with custom cells"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            selectionMode="none"
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column
                        key={column.uid}
                        hideHeader={column.uid === "actions"}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={friends}>
                {(item) => (
                    <Table.Row>
                        {(columnKey) => (
                            <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
}
