import React, { Component } from 'react'
import { Form, Button, Row, Col, Card, Modal, Table } from 'react-bootstrap';
import axios from 'axios'
import Select from 'react-select'

export default class MSelectAsosiasi extends Component {
  constructor(props){
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.getAsosiasi();
  }

  componentWillUnmount() {
  }

  getAsosiasi(bidang_id){
    this.setState({data: []})
    axios.get(`/api/asosiasi/`).then(response => {
      console.log(response)

      let data = []

      response.data.map((d) => {
        data.push({
          value: d.id_asosiasi,
          label: d.id_asosiasi + "-" + d.nama
        })
      })

      this.setState({
        data: data,
        loading: false
      })
    }).catch(err => {
      console.log(err.response)

      this.setState({
        loading: false,
      })
    })
  }

  render() {
    return (
      <Form.Group style={{...this.props.style}} className={this.props.className}>
        <Form.Label>Asosiasi</Form.Label>
        <Select placeholder="-- pilih asosiasi --" options={this.state.data} onChange={(val) => this.props.onChange(val)}/>
      </Form.Group>
    )
  }
}
