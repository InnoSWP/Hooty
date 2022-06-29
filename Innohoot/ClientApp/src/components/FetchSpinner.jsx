import React from "react";
import {Modal, Ratio, Spinner} from "react-bootstrap";

export default function FetchSpinner(props) {
    
    return (
            props.status ?
                <Modal backdrop={"static"} size={"sm"} centered>
                    <Spinner animation={"border"} variant={"primary"} />
                </Modal>
                :
                null
        
    )
}