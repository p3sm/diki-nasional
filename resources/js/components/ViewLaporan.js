import React, { Component } from 'react';
import { Form, Button, Row, Col, Card, Modal, Table } from 'react-bootstrap';
import moment from 'moment';
import Datetime from 'react-datetime'
import MSelectProvinsi from './MSelectProvinsi'
import MSelectKualifikasi from './MSelectKualifikasi'
import MSelectBidang from './MSelectBidang'
import MSelectSubBidang from './MSelectSubBidang'
import MSelectUstk from './MSelectUstk'
import axios from 'axios'
import Alert from 'react-s-alert';
import SweetAlert from 'react-bootstrap-sweetalert';
import swal from 'sweetalert';

// import { Container } from './styles';

export default class components extends Component {
  constructor(props){
    super(props)

    this.state = {
      showFormAdd: false,
      pengajuan: false,
      submiting: [],
      submit_approval: false,
      submit_delete: false,
      diajukan: [],
      checked: [],
      id_personal: this.props.id_personal,
      id_permohonan: "1",
      tgl_registrasi: moment().format('YYYY-MM-DD'),
      no_reg_asosiasi: "",
      me: null,
      delete: false
    }

  }

  componentDidMount() {
    let checked = [];
    this.props.data.map((d, i) => {
      checked.push(false);
    })
    this.setState({checked: checked})
  }

  onAllCheckboxClick = (e) => {
    let checked = [];
    this.props.data.map((d, i) => {
      checked.push(e.target.checked);
    })
    console.log(checked);
    this.setState({checked: checked})
  }

  onCheckboxClick = (i, e) => {
    let checked = this.state.checked;
    checked[i] = e.target.checked;

    this.setState({ checked: checked });
  }

  render() {
    return(
      <div>
        <Table bordered>
          <tbody>
            <tr>
              <th>Aksi <br></br><input type="checkbox" onClick={this.onAllCheckboxClick}/></th>
              <th>No</th>
              <th>Provinsi</th>
              <th>Tim Produksi</th>
              <th>Jenis SRTF</th>
              <th>No KTP</th>
              <th>Nama</th>
              <th>Sub Klasifikasi</th>
              <th>ID USTK</th>
              <th>Tgl Mohon</th>
              <th>Tgl Approval</th>
              <th>Kualifikasi</th>
              <th>Jns Mohon</th>
              <th>Kontribusi</th>
              <th>Total</th>
            </tr>
            {this.props.data.map((d, i) => (
              <tr key={i}>
                <td><input type="checkbox" checked={this.state.checked[i]} onClick={(e) => this.onCheckboxClick(i, e)} /></td>
                <td>{i + 1}</td>
                <td>{d.id_propinsi_reg}</td>
                <td>{d.created_by}</td>
                <td>{d.tipe_sertifikat}</td>
                <td>{d.id_personal}</td>
                <td>{d.nama}</td>
                <td>{d.id_sub_bidang}</td>
                <td>{d.id_unit_sertifikasi}</td>
                <td>{d.tgl_registrasi}</td>
                <td>{d.created_at}</td>
                <td>{d.id_kualifikasi}</td>
                <td>{d.id_permohonan}</td>
                <td>{d.dpp_kontribusi}</td>
                <td>{d.dpp_total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
          
        <SweetAlert
          show={this.state.pengajuan}
          warning
          showCancel
          title="Kirim Pengajuan"
          btnSize="md"
          confirmBtnBsStyle='success'
          cancelBtnText="Close"
          confirmBtnText={"Ya, Saya yakin"}
          onConfirm={() => this.kirimPengajuan()}
          onCancel={() => this.setState({pengajuan: false})}
        >Saya yakin data terisi dengan sebenar-benarnya</SweetAlert>
      </div>
    )
  }
}
