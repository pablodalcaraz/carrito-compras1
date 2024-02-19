import { useEffect, useState } from 'react'
import '../App.css'

export const BuyForm = () => {

  const [provinces, setProvinces] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('');
  const [departamentos, setDepartamentos] = useState([])
  const [ciudades, setCiudades] = useState([])
  

  useEffect(() => {
    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      const provinceName = data.provincias.map(prov => prov.nombre)
      setProvinces(provinceName)
    })
    .catch(error => console.error("Error al recuperar provincia: ", error))
  }, [])

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value)
  }

  useEffect(() => {
    fetch(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${selectedProvince}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      const departamentoName = data.departamentos.map(dto => dto.nombre)
      setDepartamentos(departamentoName)
    })
    .catch(error => console.error("Error al recuperar provincia: ", error))
  }, [selectedProvince])

  useEffect(() => {
    fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${selectedProvince}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      const ciudadesName = data.localidades.map(ciudad => ciudad.nombre)
      setCiudades(ciudadesName)
    })
    .catch(error => console.error("Error al recuperar provincia: ", error))
  }, [selectedProvince])

  return (
    <div className="container">
        <div className="form-cont">
            <div className="form-title">
              <h1>Datos de envío</h1>
            </div>
            
    <form className="row g-3">
  <div className="col-md-6">
    <label htmlFor="inputEmail4" className="form-label">Nombre</label>
    <input type="email" className="form-control" id="inputEmail4" />
  </div>
  <div className="col-md-6">
    <label htmlFor="inputPassword4" className="form-label">e-mail</label>
    <input type="password" className="form-control" id="inputPassword4" />
  </div>
  <div className="col-12">
    <label htmlFor="inputAddress" className="form-label">Domicilio</label>
    <input type="text" className="form-control" id="inputAddress"  />
  </div>

  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">Provincia</label>
    <select id="inputState" className="form-select" onChange={handleProvinceChange}>
      <option selected>Elige una Provincia</option>
      {provinces.map((province, index) =>(
        <option key={index}>{province}</option>
      ))}
    </select>
  </div>

  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">Departamento</label>
    <select id="inputState" className="form-select">
      <option selected>Elige un departamento</option>
      {departamentos.map((departamento, index) =>(
        <option key={index}>{departamento}</option>
      ))}
    </select>
  </div>


  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">Ciudad</label>
    <select id="inputState" className="form-select">
      <option selected>Elige una ciudad</option>
      {ciudades.map((ciudad, index) =>(
        <option key={index}>{ciudad}</option>
      ))}
    </select>
  </div>

  <div className="col-md-2">
    <label htmlFor="inputZip" className="form-label">Código Postal</label>
    <input type="text" className="form-control" id="inputZip" />
  </div>
  
  <div className="col-12">
    <button type="submit" className="btn btn-primary">Continuar</button>
  </div>
</form>
</div>
    </div>
  )
}
