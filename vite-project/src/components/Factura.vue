<template>
  <div class="container py-4">
    <h2 class="mb-4">Gestión de Facturas</h2>

    <!-- Crear Factura -->
    <div class="card mb-4">
      <div class="card-header">Crear Factura</div>
      <div class="card-body">
        <form @submit.prevent="crearFactura">
          <div class="mb-3">
            <label class="form-label">Número</label>
            <input v-model="nuevaFactura.numero" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Fecha</label>
            <input type="date" v-model="nuevaFactura.fecha" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Cliente</label>
            <input v-model="nuevaFactura.cliente" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Detalles</label>
            <div v-for="(detalle, index) in nuevaFactura.detalles" :key="index" class="row g-2 mb-2">
              <div class="col">
                <span>Nombre Producto</span>
                <input v-model="detalle.descripcion" placeholder="Descripción" class="form-control" />
              </div>
              <div class="col">
                <span>Cantidad</span>
                <input type="number" v-model.number="detalle.cantidad" placeholder="Cantidad" class="form-control" />
              </div>
              <div class="col">
                <span>Precio</span>
                <input type="number" v-model.number="detalle.precio" placeholder="Precio" class="form-control" />
              </div>
            </div>
            <button class="btn btn-sm btn-outline-primary" @click.prevent="agregarDetalle">Agregar Detalle</button>
          </div>

          <button type="submit" class="btn btn-success">Crear</button>
        </form>
      </div>
    </div>

    <!-- Consultar factura por número -->
    <div class="card mb-4">
      <div class="card-header">Buscar Factura</div>
      <div class="card-body">
        <form @submit.prevent="buscarFactura">
          <input v-model="numeroBusqueda" class="form-control mb-2" placeholder="Número de factura" />
          <button class="btn btn-primary">Buscar</button>
        </form>

        <div v-if="facturaBuscada" class="mt-3">
          <h5>Factura: {{ facturaBuscada.numero }}</h5>
          <p>Cliente: {{ facturaBuscada.cliente }}</p>
          <p>Fecha: {{ facturaBuscada.fecha }}</p>
          <ul>
            <li v-for="(d, i) in facturaBuscada.DetalleFacturas" :key="i">
              {{ d.descripcion }} - {{ d.cantidad }} x Q{{ d.precio }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Reporte por fechas -->
    <div class="card">
      <div class="card-header">Reporte por fechas</div>
      <div class="card-body">
        <form @submit.prevent="obtenerReporte">
          <div class="row g-2 mb-3">
            <div class="col">
              <span>Inicio</span>
              <input type="date" v-model="filtros.inicio" class="form-control" />
            </div>
            <div class="col">
              <span>Fin</span>
              <input type="date" v-model="filtros.fin" class="form-control" />
            </div>
          </div>
          <button class="btn btn-secondary">Obtener Reporte</button>
        </form>

        <ul class="mt-3" v-if="reporte.length">
          <li v-for="factura in reporte" :key="factura.id">
            {{ factura.numero }} - {{ factura.fecha }} - {{ factura.cliente }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const nuevaFactura = ref({
  numero: '',
  fecha: '',
  cliente: '',
  detalles: []
})

const agregarDetalle = () => {
  nuevaFactura.value.detalles.push({ descripcion: '', cantidad: 1, precio: 0 })
}

const crearFactura = async () => {
  try {
    const res = await axios.post('http://localhost:3200/invoice/facturas', nuevaFactura.value)
    alert('Factura creada con éxito')
    nuevaFactura.value = { numero: '', fecha: '', cliente: '', detalles: [] }
  } catch (err) {
    alert('Error al crear factura: ' + err.response.data.error)
  }
}

const numeroBusqueda = ref('')
const facturaBuscada = ref(null)

const buscarFactura = async () => {
  try {
    const res = await axios.get(`http://localhost:3200/invoice/facturas/${numeroBusqueda.value}`)
    facturaBuscada.value = res.data
  } catch (err) {
    facturaBuscada.value = null
    alert('Factura no encontrada')
  }
}

const filtros = ref({
  inicio: '',
  fin: ''
})
const reporte = ref([])

const obtenerReporte = async () => {
  try {
    const res = await axios.post('http://localhost:3200/invoice/reporte', {
      inicio: filtros.value.inicio,
      fin: filtros.value.fin
    })
    
    reporte.value = res.data
  } catch (err) {
    alert('Error al obtener reporte')
  }
}
</script>
