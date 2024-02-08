/* eslint-disable prefer-const */
import logoImg from './assets/logo.png';
import './App.css'
import { FormEvent, useState } from 'react';

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {

  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcolInput] = useState(0);
  const [info, setInfo] = useState<InfoProps> ();

  function calcular(event: FormEvent){
    event.preventDefault();

    let calculo = (alcoolInput / gasolinaInput )
    console.log(calculo);

    if(calculo <= 0.7){
     setInfo(
      {
        title: "Compensa Usar Alcool",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      }
     )
    }else{
      setInfo(
        {
          title: "Compensa Usar Gasolina",
          gasolina: formatarMoeda(gasolinaInput),
          alcool: formatarMoeda(alcoolInput)
        }
       )
    }
  }


  function formatarMoeda(valor: number) {
    let valorFormatado = valor.toLocaleString("pt-br",
    {
      style: "currency",
      currency: "BRL"
    })
    return valorFormatado;
  }
  
  return (
    <div>
      <main className='container'>
        <img className='logo' src={logoImg} alt="logo calculador " />
        <h1 className='title'>Qual melhor opção?</h1>

        <form className='form' onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>

          <input
          type='number' 
          placeholder='4,90' 
          className='input'
          min= "1"
          step= "0.01"
          required
          value={alcoolInput}
          onChange={ (e) => setAlcolInput(Number(e.target.value))}
          />

<label>Gasolinas (preço por litro):</label>

        <input
        type='number' 
        placeholder='4,90' 
        className='input'
        min= "1"
        step= "0.01"
        required
        value={gasolinaInput}
        onChange={ (e) => setGasolinaInput(Number(e.target.value))}
        />

        <input type="submit" className='button' value="Calcular"  />
        </form>

      {
        info && Object.keys(info).length > 0 && (
          <section className='result'>
              <h2 className='result-title'> {info.title} </h2>
              <span>Álcool: {info.alcool} </span>
              <span>Gasolina: {info.gasolina} </span>
          </section>
        )
      }

      </main>
    </div>
  )
}

export default App
