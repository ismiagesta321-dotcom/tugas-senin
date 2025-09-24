import React from "react";
import {Col} from 'react-bootstrap';
import {NumberWithCommas} from '../utils/utils';
import { Card } from "react-bootstrap";

const Menus = ({menu, masukkeranjang}) => {
    return (
        <Col md={4} xs={6} className = 'mb-4'>
            <Card className ='shadow'onClick = {() => masukkeranjang (menu)} style = {{widht : '18rem' , height : '18rem'}}>
                <Card.Img variant = 'top' src={'images/' + menu.category.nama.toLowerCase() + '/' + menu.gambar} />
                <Card.Body>
                    <Card.Title>{menu.nama}({menu.kode})</Card.Title>
                <Card.Text>
                    Rp. {NumberWithCommas(menu.harga)}
                </Card.Text>

                
                </Card.Body>
        </Card>
        </Col>
    )
}

export default Menus;