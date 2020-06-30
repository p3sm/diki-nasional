import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab, Form, Spinner, Col, Row, Modal } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import Alert from 'react-s-alert';
import DatePicker from "react-datepicker";
import Datetime from 'react-datetime'
import Select from 'react-select'

import MSelectProvinsi from './MSelectProvinsi'
import MSelectAsosiasi from './MSelectAsosiasi'

import ViewBiodata from './ViewBiodata';
import ViewPendidikan from './ViewPendidikan';
import ViewKursus from './ViewKursus';
import ViewOrganisasi from './ViewOrganisasi';
import ViewProyek from './ViewProyek';
import ViewKualifikasi from './ViewKualifikasi99';
import InputNewBiodata from './InputNewBiodata';

export default class Personal extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      data: [],
      loading: false,
      id_personal: '',
      filter_from: '',
      filter_to: '',
      filter_sertifikat: '',
      filter_provinsi: '',
      filter_asosiasi: '',
      biodata: null,
      pendidikan: [],
      kursus: [],
      organisasi: [],
      proyek: [],
      pengajuan: [],
      error: false,
      showFormAddBiodata: false,
    };
  }

  componentDidMount() {
    this.getKualifikasi();
  }

  getKualifikasi() {
    const { filter_from, filter_to, filter_sertifikat, filter_provinsi, filter_asosiasi } = this.state;

    this.setState({
      loading: true,
      kualifikasi_ta: [],
    });

    axios
      .get(`/api/pengajuan99?from=${filter_from}&to=${filter_to}&sertifikat=${filter_sertifikat ? filter_sertifikat.value : ''}&provinsi=${filter_provinsi}&asosiasi=${filter_asosiasi}`)
      .then(response => {
        console.log(response)
        let result = response.data;
        this.setState({
          pengajuan: result,
          loading: false,
        });
      })
      .catch(err => {
        console.log(err.response);

        this.setState({
          loading: false,
          // error: true,
          errorMsg: err.response.data.message,
        });
      });
  }

  handleChange(event) {
    this.setState({
      id_personal: event.target.value,
    });
  }

  onReset() {
    this.setState({
      filter_from: '',
      filter_to: '',
      filter_sertifikat: '',
      filter_provinsi: '',
      filter_asosiasi: '',
    }, () => this.getKualifikasi());
  }

  render() {
    return (
      <div>
        <div class="form-row align-items-center">
          <Form.Group className="mr-1">
            <Form.Label>From</Form.Label>
            <Datetime closeOnSelect={true} inputProps={{ placeholder: 'contoh: 01-01-1990'}} value={this.state.filter_from} dateFormat="DD-MM-YYYY" onChange={(e) => {
              try {
                this.setState({filter_from: e.format("DD-MM-YYYY")})
              } catch (err) {
                this.setState({filter_from: e})
              }
            }} timeFormat={false} />
          </Form.Group>
          <Form.Group className="mr-1">
            <Form.Label>To</Form.Label>
            <Datetime closeOnSelect={true} inputProps={{ placeholder: 'contoh: 01-01-1990'}} value={this.state.filter_to} dateFormat="DD-MM-YYYY" onChange={(e) => {
              try {
                this.setState({filter_to: e.format("DD-MM-YYYY")})
              } catch (err) {
                this.setState({filter_to: e})
              }
            }} timeFormat={false} />
          </Form.Group>
          <Form.Group style={{width: 200}} className="mr-1">
            <Form.Label>Sertifikat</Form.Label>
            <Select
              placeholder="-- pilih sertifikat --"
              value={this.state.filter_sertifikat}
              options={[
                { value: 'SKA', label: 'SKA' },
                { value: 'SKT', label: 'SKT' },
              ]}
              onChange={(data) => this.setState({filter_sertifikat: data})} />
          </Form.Group>
          <MSelectProvinsi style={{width: 200}} className="mr-1" value={this.state.filter_provinsi} onChange={(data) => this.setState({filter_provinsi: data.value})} />
          <MSelectAsosiasi style={{width: 200}} className="mr-1" value={this.state.filter_asosiasi} onChange={(data) => this.setState({filter_asosiasi: data.value})} />
          <button className="btn btn-outline-primary mx-2 mt-3" style={{height: 40}} onClick={() => this.onReset()}>Reset</button>
          <button className="btn btn-primary mt-3" style={{height: 40}} onClick={() => this.getKualifikasi()}>Filter</button>
        </div>
        <SweetAlert
          show={this.state.error}
          danger
          title="Maaf"
          btnSize="md"
          confirmBtnBsStyle="default"
          confirmBtnText="Close"
          onConfirm={() =>
            this.setState({
              error: false,
            })
          }
        >
          {this.state.errorMsg}
        </SweetAlert>
        <ViewKualifikasi
          tipe_profesi={1}
          id_personal={this.state.id_personal}
          data={this.state.pengajuan}
          refreshData={() => this.getKualifikasi()}
        />
        <Row
          style={{
            justifyContent: 'center',
            display: this.state.loading ? 'flex' : 'none',
          }}
        >
          <Spinner
            style={{
              alignSelf: 'center',
            }}
            animation="border"
            variant="primary"
          />
        </Row>
        <Alert
          stack={{
            limit: 3,
          }}
          position="top-right"
          offset={50}
          effect="slide"
          timeout={5000}
        />
      </div>
    );
  }
}

if (document.getElementById('pengajuan99')) {
  ReactDOM.render(<Personal />, document.getElementById('pengajuan99'));
}
