import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import MaterialDatatable from "material-datatable";


const MiComponente = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [personas, setPersonas] = useState([])
    const [id,setId] = useState("");

    const handleInputChangeNombre = (event) => {
        //console.log(event.target.value)
        setNombre(event.target.value)
    }
    
    const handleInputChangeApellido = (event) => {
        //console.log(event.target.value)
        setApellido(event.target.value)

    }

    const enviarDatos = () => {
        // alert("Entro aqui")
        // console.log("Enviando datos nombre:"+nombre+" y apellido:"+apellido)
        console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`)

        guardarPersona();
     
     
        // let nuevo = {
        //     name: nombre,
        //     last: apellido
        // }
        // setPersonas(personas => [...personas, nuevo])
        // setNombre("")
        // setApellido("")
    }

    useEffect(()=>{

        getPersonas()
    },[])
    async function getPersonas() {
        try {
          const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=6');
          if(response.status == 200)
          {
            
            setPersonas(response.data.persona)
            console.log(response.data);


          }
         
        } catch (error) {
          console.error(error);
        }
      }
    
      function guardarPersona()
      {
        axios.post('http://192.99.144.232:5000/api/personas', {
            nombre: nombre,
            apellido: apellido,
            grupo:6
          })
          .then(function (response) {

                if(response.status==200)
                {
                    alert("Registro correcto")
                    getPersonas()

                }else{
                    alert("Error al guardar")
                }
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      function regPersona()
      {
        axios.put('http://192.99.144.232:5000/api/personas/' + id, {
            name: nombre,
            apellido: apellido,
            grupo:6
          })
          .then(function (response) {

                if(response.status==200)
                {
                    alert("Registro correcto")
                    getPersonas()

                }else{
                    alert("Error al guardar")
                }
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      function editPersona(eee)
      {
        axios.put('http://192.99.144.232:5000/api/personas/' + eee, {
            nombre: nombre,
            apellido: apellido,
            grupo:6
          })
          .then(function (response) {

                if(response.status==200)
                {
                    //alert("Modificacion correcta")
                    getPersonas()

                }else{
                    alert("Error al guardar")
                }
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      const columns = [
        {
         name: "Nombre",
         field: "nombre",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "Apellido",
         field: "apellido",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
        name: "User_Id",
        field: "_id",
        options: {
            filter: true,
            sort: false,
        }
        }
       ];
        
      
       const handleRowClick = (rowData) => {
        //console.log(rowData.nombre)
        //console.log(rowData._id)
        //setNombre(rowData.nombre)
        //setApellido(rowData.apellido)
        //setId(rowData.id)
        editPersona(rowData._id)

        
    };
       const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected:true,
        onRowClick: handleRowClick,
       };
      
    return (
        <Fragment>
            <h1>Formulario</h1>
            <div>
                <div>
                    <input type="text" placeholder="Nombre" name="nombre" onChange={handleInputChangeNombre} value={nombre} ></input>
                </div>

                <div>
                    <input type="text" placeholder="Apellido" name="apellido" onChange={handleInputChangeApellido} value={apellido}></input>
                </div>
                <button onClick={enviarDatos}>Enviar</button> 



                {/* <div className="users">
                    {personas.map((persona) => (
                 
                          <li>{persona.nombre} {persona.apellido}</li>
                    ))}
                </div> */}

            </div>
            <MaterialDatatable
  title={"Employee List"}
  data={personas}
  columns={columns}
  options={options}
/>

        </Fragment>

    )
}
export default MiComponente