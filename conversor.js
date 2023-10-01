import React, { useEffect, useState } from "react";
import { Button, FormControl, Paper, Select, TextField} from "@material-ui/core";
import  Axios  from "axios";
import { Text, View, TextInput } from "react-native";
import './styles.css';



const Main = () => {
        const [texto1, settexto1] = useState(1);
        const [texto2, settexto2] = useState(1);
        const [pais, setpais] = useState([]);
        const [pais2, setpais2] = useState([]);
        const [valor1, setvalor1] = useState(1);
        const [valor2, setvalor2] = useState(1);

        useEffect(()=> {
            getdata();
        },[]);
        async function getdata() {
            const result = await Axios.get(
                "http://data.fixer.io/api/latest?access_key=6594e53ec0f49fb273ee9a339d8cf97a")
            console.log(result.data);
            setpais(result.data.rates);
            setpais2(result.data.rates);
        }
        function converter(e) {
            e.preventDefault();
            let num = (valor2 / valor1) * texto1;
            settexto2(num);
        }
    return (
        <div>
            <Paper>
                <View>
                    <Text> Arthur Durval e Luís Artur - 523 </Text>
                    <TextInput placeholder="Digite seu nome" value="Seu Nome"/> 
                </View>
                <h3>Conversor de Moedas</h3>
                <form onSubmit={converter}>
                <div>
                    <TextField 
                    variant="outlined" 
                    value={texto1 || ""} 
                    onChange={(e)=>settexto1(e.target.value)} 
                    autoComplete="off" />
                    <FormControl 
                    className="dropdown" 
                    variant="outlined" 
                    onChange={(e)=>setvalor1(e.target.value)}
                    >
                        <Select native>
                            {Object.keys(pais).map((value, index)=> (
                            <option key={index} value={pais[value]}>
                                {value} 
                            </option>
                            ))}
                            
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField variant="outlined" value={texto2 || ""}/>
                    <FormControl 
                    className="dropdown" 
                    variant="outlined" 
                    onChange={(e)=>setvalor2(e.target.value)}>
                        <Select native>
                            {Object.keys(pais2).map((value, index)=> (
                            <option key={index} value={pais[value]}>{value}</option>))}
                        </Select>
                    </FormControl>
                </div>
                <Button type="submit" className="botão" variant="contained">Converter</Button>
                </form> 
            </Paper>
        </div>
    );

    
};

export default Main;