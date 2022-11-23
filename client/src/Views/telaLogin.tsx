import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Swal from 'sweetalert2';


const Login = () => {
    const navigate = useNavigate()

    const [Email, setEmail] = useState("");
    const [Senha, setSenha] = useState("");

    function receberEmail(evento: any) {
        let entrada = evento.target.value;
        setEmail(entrada)
    }

    function receberSenha(evento: any) {
        let entrada = evento.target.value;
        setSenha(entrada)
    }

    let params = {
        email: Email,
        senha: Senha,
    }

    function handleLogin(values: any) {
        console.log(params);
        values.preventDefault();
        Axios.get(`http://localhost:3001/users/${params.email}`, {
            params: { params }
        })
            .then((response) => {
                const data = response.data;
                console.log(data);
                if (data.length === 0) {
                    Swal.fire({
                        title: `Error`,
                        html:
                            ' <b>User not found</b>'
                    })
                } else if (data.senha === params.senha) {
                    console.log("linuxxxxx");
                    if (data.tipoUsuario === 'Adm') {
                        console.log("mateusssssss");
                        localStorage.setItem('id',`${data.id}`)
                        localStorage.setItem('nome',`${data.nome}`)
                        localStorage.setItem('tipoUsuario',`${data.tipoUsuario
                        }`)
                        navigate("/aircrafts")
                        console.log("testesteste");
                        
                    }
                    else {
                        localStorage.setItem('id',`${data.id}`)
                        localStorage.setItem('nome',`${data.nome}`)
                        localStorage.setItem('tipoUsuario',`${data.tipoUsuario
                        }`)
                        navigate("/")
                        
                    }
                } else if (data.senha !== params.senha) {
                    Swal.fire({
                        title: `Error`,
                        html:
                            ' <b>Incorrect Password</b> '
                    })
                }
            });
    };

    async function recuperarSenha() {
        const { value: email } = await Swal.fire({
            title: 'To recover the password, please input your e-mail address:',
            input: 'email',
            inputPlaceholder: 'Enter your registered e-mail address'
          })
          
          if (email) {
            Swal.fire(`Entered email: ${email}`)
          };
    };

    return (
        <Container>
            <Form  onSubmit={handleLogin}>
                <Row>
                    <h1 className='text-center' style={{ marginTop: "50px" }}>Login</h1>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3}}>
                        <h5 className="card-title"  style={{ marginTop: "30px" }}>Email</h5>
                        <input type='email' className='input form-control form-control-lg inputGroup-sizing-sm' id="email" value={Email} onChange={receberEmail}
                        placeholder="Email"/>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 6, offset: 3}}>
                        <h5 className="card-title"  style={{ marginTop: "30px" }}>Password</h5>
                        <input type='password' className='input form-control form-control-lg inputGroup-sizing-sm' id="senha" value={Senha} onChange={receberSenha}
                        placeholder="Password"/>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 6, offset: 3}}>
                        <Button className="botao-resultado" style={{margin:'10px', marginTop:'15px'}} size="lg" name="submitButton" type="submit" id="btn_logar">Sing in</Button>
                    </Col>
                </Row>
                
            </Form>
        </Container>
    );
}
export default Login;