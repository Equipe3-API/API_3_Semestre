import { Component, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Aircraft from "../Models/aircraft";
import '../Style/App.css';
import aviao from "../Icons/aviao.png";
import React from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import Table from "../Models/table";
import Flap from "../Models/flap";

// const selecionarFlaps = [
//     this.state.dadosFlap.map(item => {
//         return (
//             <option  key={item.id} value={item.id}>{item.tipoFlap}</option>
//         )
//     })
// ]

type state = {
    modelError: string,
    engineError: string,
    reversorError: string,
    certificationError: string,
    breakingError: string,
    weightMinError: string,
    weightMaxError: string,
    result: string,
    dadosFlap: any[]
}
class cadastroAeronave extends Component<any, state>{

    private aircraft: Aircraft = new Aircraft('', '', '', 0, 0, 0, 0, 0);
    private idFlaps: Array<string> = [];

    constructor(props: any) {
        super(props);
        this.state = {
            modelError: '',
            engineError: '',
            reversorError: '',
            certificationError: '',
            breakingError: '',
            weightMinError: '',
            weightMaxError: '',
            result: '',
            dadosFlap: []
        }
        this.modelChange = this.modelChange.bind(this);
        this.engineChange = this.engineChange.bind(this);
        this.certificationChange = this.certificationChange.bind(this);
        this.reversorChange = this.reversorChange.bind(this);
        this.flapChange = this.flapChange.bind(this);
        this.brakingLevelChange = this.brakingLevelChange.bind(this);
        this.aircraftWeightChangeMin = this.aircraftWeightChangeMin.bind(this);
        this.aircraftWeightChangeMax = this.aircraftWeightChangeMax.bind(this);
        //this.cadastrar = this.cadastrar.bind(this);
    }
    componentDidMount(): void {

        axios.get('http://localhost:3001/flap').then(response => {
            let dataFlap = response.data
            this.setState({
                dadosFlap: dataFlap
            })
        })
    }

    eventoFormulario = (evento: any) => {
        evento.preventDefault()
    }

    modelChange(event) {
        let modelError = ""
        const target = event.target;
        this.aircraft.setModel = target.value;
        if (!this.aircraft.getModel) {
            modelError = "The model is required";
        } else {
            modelError = ""
        }
        this.setState({ modelError: modelError })
    }
    engineChange(event) {
        let engineError = ""
        const target = event.target;
        this.aircraft.setEngine = target.value;
        if (!this.aircraft.getEngine) {
            engineError = "The engine is required";
        } else {
            engineError = ""
        }
        this.setState({ engineError: engineError })
    }
    certificationChange(event) {
        let certificationError
        const target = event.target;
        this.aircraft.setCertification = target.value;
        if (!this.aircraft.getCertification) {
            certificationError = "Select a certification"
        } else {
            certificationError = ""
        }
        this.setState({ certificationError: certificationError })
    }
    flapChange(event) {
        // const target = event.target;
        // let value = target.value;
        // this.aircraft.setFlapValue = target.value;
        // this.flapSelected = value;
        var checked = event.target.checked
        var value = event.target.value
        var valor = value
        if (checked){
            if (!this.idFlaps.includes(valor)){
                this.idFlaps.push(valor)
            } 
        } else {
            if (this.idFlaps.includes(valor)){
                let index = this.idFlaps.indexOf(valor)
                this.idFlaps.splice(index, 1)
            }
        }
    }
    reversorChange(event) {
        let reversorError
        const target = event.target;
        this.aircraft.setReverserAmount = target.value;
        if (!this.aircraft.getReverserAmount) {
            reversorError = "The aircraft must have at least zero(0) reversor."
        } else if (this.aircraft.getReverserAmount < 0) {
            reversorError = "The reverser amount cannot be negative"
        } else {
            reversorError = ""
        }
        this.setState({ reversorError: reversorError })
    }
    brakingLevelChange(event) {
        const target = event.target;
        this.aircraft.setBrakingApplicationLevel = target.value;
        if (this.state.breakingError.includes("Select")) {
            this.setState({ breakingError: "" })
        }
        if (this.state.result != "") this.setState({ result: "" })
    }

    aircraftWeightChangeMin(event) {
        const target = event.target;
        this.aircraft.setAircraftWeightMin = target.value;
        if (this.aircraft.getAircraftWeightMin < 10000) {
            this.setState({ weightMinError: "The minimum weight must be above 10.000 kg" })
        }

        if (this.state.weightMinError.includes("required") || this.state.weightMinError.includes("above") && this.aircraft.getAircraftWeightMin >= 5000) {
            this.setState({ weightMinError: "" })
        }
        if (this.state.result != "") this.setState({ result: "" })
    }
    aircraftWeightChangeMax(event) {
        const target = event.target;
        this.aircraft.setAircraftWeightMax = target.value;
        if (this.aircraft.getAircraftWeightMax < 10000) {
            this.setState({ weightMaxError: "The maximum weight must be above 10.000 kg" })
        }
        if (this.aircraft.getAircraftWeightMax > 1000000) {
            this.setState({ weightMaxError: "The weight must be below 1.000.000 kg" })
        }

        if (this.state.weightMaxError.includes("required") || this.state.weightMaxError.includes("above") && this.aircraft.getAircraftWeightMax >= 10000) {
            this.setState({ weightMaxError: "" })
        }
        if (this.state.result != "") this.setState({ result: "" })
    }
    /*cadastrar(event) {
        const target = event.target.value
        this.aircraft.result = //Adicionar result à aeronave novamente para colocar os valores necessários aqui
    }*/

    validate = () => {
        let modelError = "";
        let engineError = "";
        let reversorError = "";
        let certificationError = "";
        let breakingError = "";
        let weightMinError = "";
        let weightMaxError = "";

        if (!this.aircraft.getModel) {
            modelError = "The model is required"
        } else {
            modelError = ""
        }
        if (!this.aircraft.getEngine) {
            engineError = "The engine is required";
        } else {
            engineError = ""
        }
        if (!this.aircraft.getReverserAmount) {
            reversorError = "The aircraft must have at least one(1) reversor."
        } else if (this.aircraft.getReverserAmount < 0) {
            reversorError = "The reverser amount cannot be negative"
        } else {
            reversorError = ""
        }
        if (!this.aircraft.getCertification) {
            certificationError = "Select a certification"
        } else {
            certificationError = ""
        }
        if (!this.aircraft.getBrakingApplicationLevel) {
            breakingError = "Select a braking level";
        } else {
            breakingError = ""
        }
        if (!this.aircraft.getAircraftWeightMin) {
            weightMinError = "The weight is required";
        } else if (this.aircraft.getAircraftWeightMin <= 0) {
            weightMinError = "The weight must be above zero";
        } else if (this.aircraft.getAircraftWeightMin >= this.aircraft.getAircraftWeightMax) {
            weightMinError = "The weight must be bellow the maximum weight";
        } else {
            weightMinError = ""
        }
        if (!this.aircraft.getAircraftWeightMax) {
            weightMaxError = "The weight is required";
        } else if (this.aircraft.getAircraftWeightMax <= 0) {
            weightMaxError = "The weight must be above zero"
        } else if (this.aircraft.getAircraftWeightMax <= this.aircraft.getAircraftWeightMin) {
            weightMinError = "The weight must be above the minimum weight";
        } else {
            weightMaxError = ""
        }


        this.setState({
            modelError: modelError, engineError: engineError, reversorError: reversorError, certificationError: certificationError,
            breakingError: breakingError, weightMinError: weightMinError, weightMaxError: weightMaxError
        });
        if (modelError || engineError || reversorError || certificationError || breakingError || weightMinError || weightMaxError) {
            return false
        }

        return true;
    }

    // getFlap(): Flap {
    //     let dadosFlap = this.state.dadosFlap.find(item => item.id == this.idFlaps);
    //     return dadosFlap.id;
    //   }

    postClickButton = async (event: any) => {
        // let flap = this.getFlap();
        // console.log(flap);

        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            let res = -1
            await axios.post("http://localhost:3001/airplane/cadastrar", {
                model: this.aircraft.getModel,
                engine: this.aircraft.getEngine,
                certification: this.aircraft.getCertification,
                aircraftWeightMin: this.aircraft.getAircraftWeightMin,
                aircraftWeightMax: this.aircraft.getAircraftWeightMax,
                reverserAmount: this.aircraft.getReverserAmount,
                brakingApplicationLevel: this.aircraft.getBrakingApplicationLevel
            }).then((response) => {
                res = response.data.id
                //axios
                console.log(this.idFlaps)
                axios.post("http://localhost:3001/airplaneFlap/cadastrar/" + res, {
                    ids: this.idFlaps
                })
            }).catch((res) => {
                console.log("teste");
            })

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Register completed',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(function () {
                window.location.href = "/aircrafts"
            }, 1500);
        }
    }

    render() {
        return (
            <form onSubmit={this.eventoFormulario} id="form">
                <Container className="px-2 mb-5">
                    <Container>
                        <Row className="px-2 mb-5 mt-5">
                            <img src={aviao} alt="Avião." className="img col-sm-5 col-md-3 col-lg-2"></img>
                            <h1 style={{ paddingLeft: '23vh' }} className='mt-5 col-sm-7 col-md-9'>New Aircraft</h1>
                        </Row>
                    </Container>
                    <Container fluid>
                        <Row>
                            <h2 className="pb-5 text-center">Aircraft Configuration</h2>
                            <Row></Row>
                            <Col>
                                <h5 className="card-title">Aircraft model</h5>
                                <input type='text' className='input form-control form-control-lg inputGroup-sizing-sm' id="model"
                                    placeholder="Aircraft model" onChange={this.modelChange} />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.modelError}
                                </div>

                            </Col>
                            <Col>
                                <h5 className="card-title">Engine</h5>
                                <input type='text' className="input form-control form-control-lg inputGroup-sizing-sm" id='engine' placeholder='Engine' onChange={this.engineChange} />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.engineError}
                                </div>
                            </Col>
                            <Col>
                                <h5 className="card-title">Reversor</h5>
                                <input type='number' className="input form-control form-control-lg inputGroup-sizing-sm" id='reversor' placeholder='Reversor' onChange={this.reversorChange} />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.reversorError}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <h5 className="card-title">Braking application level</h5>
                                <select defaultValue="-1" className="input text-select form-select form-select-sm form-control-sm select custom-select mb-3" id="brankingLevel" onChange={this.brakingLevelChange}>
                                    <option value="-1" disabled>Select...</option>
                                    <option value="1">Maximum Manual</option>
                                    <option value="2">Autobrake High</option>
                                    <option value="3">Autobrake Med.</option>
                                    <option value="4">Autobrake Low</option>
                                </select>
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.breakingError}
                                </div>
                            </Col>
                            <Col>
                                <h5 className="card-title">Certification</h5>
                                <select defaultValue="-1" className="input text-select form-select form-select-sm form-control-sm custom-select select md-3" id="btnCertification" onChange={this.certificationChange}>
                                    <option value="-1" disabled>Select</option>
                                    <option value="ANAC">ANAC</option>
                                    <option value="EASA">EASA</option>
                                    <option value="FAA">FAA</option>
                                </select>
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.certificationError}
                                </div>
                            </Col>
                            <Col>
                                <h5 className="card-title">Flap</h5>
                                {/* <select multiple={true} className="text-select form-select form-select-sm form-control-sm custom-select select md-3"
                                onChange={this.flapChange}>
                                    {this.state.dadosFlap.map(item => {
                                        return (
                                            <option value={item.id}>{item.tipoFlap}</option>
                                        )
                                    })}
                                </select> */}
                                <Form onChange={this.flapChange} >
                                    {this.state.dadosFlap.map(item => {
                                        return (
                                            <Form.Check
                                                type={"checkbox"}
                                                value={item.id}
                                                label={item.tipoFlap}
                                            />
                                        )
                                    })}
                                </Form>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <h5 className="card-title">Aircraft Weight Min (Kg)</h5>
                                <input type='number' className='input form-control form-control-lg inputGroup-sizing-sm' id="weight" placeholder="Aircraft Weight" onChange={this.aircraftWeightChangeMin} />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.weightMinError}
                                </div>
                            </Col>
                            <Col>
                                <h5 className="card-title">Aircraft Weight Max (Kg)</h5>
                                <input type='number' className='input form-control form-control-lg inputGroup-sizing-sm' id="weight" placeholder="Aircraft Weight" onChange={this.aircraftWeightChangeMax} />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.weightMaxError}
                                </div>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <Row className="px-2 mt-5">
                            <Col />
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="danger" style={{ margin: '10px', marginTop: '0px' }} size='lg' href="/aircrafts">Back</Button>
                                <Button className="botao-resultado" style={{ margin: '10px', marginTop: '0px' }} size="lg" onClick={this.postClickButton}>Save</Button>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </Container>
                </Container>
            </form>
        );
    }
}

export default cadastroAeronave;