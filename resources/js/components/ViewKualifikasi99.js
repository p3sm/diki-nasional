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

  kirimPengajuan = () => {
    let checked = this.state.checked;
    let data = this.props.data;

    this.setState({submit_approval: true, pengajuan: false})

    Promise.all(
      checked.map( async (val, i) => {
        if (val) {
          var formData = new FormData();
          formData.append("permohonan_id", data[i].tipe_sertifikat == "SKA" ? data[i].ID_Registrasi_TK_Ahli : data[i].ID_Registrasi_TK_Trampil);
          formData.append("tanggal", data[i].Tgl_Registrasi);
          formData.append("id_personal", data[i].ID_Personal);
      
          let uri = data[i].tipe_sertifikat == "SKA" ? "/api/kualifikasi_ta/naik_status_99" : "/api/kualifikasi_tt/naik_status_99"
          
          return new Promise((resolve, reject) => {
            axios.post(uri, formData).then(response => {
              resolve(response);
            }).catch(err => {
              reject(err);
            })
          })
        };
      })
    ).then(response => {
      this.setState({ submit_approval: false })
      this.props.refreshData()
      swal({title: "Berhasil mengirim approval", icon: "success"})
    }).catch(err => {
      console.log(err)
      
      this.setState({submit_approval: false})
    })
  }

  kirimPengajuanHapus = () => {
    let checked = this.state.checked;
    let data = this.props.data;

    this.setState({submit_delete: true})

    Promise.all(
      checked.map((val, i) => {
        if (val) {
          var formData = new FormData();
          formData.append("permohonan_id", data[i].tipe_sertifikat == "SKA" ? data[i].ID_Registrasi_TK_Ahli : data[i].ID_Registrasi_TK_Trampil);
          formData.append("tanggal", data[i].Tgl_Registrasi);
          formData.append("id_personal", data[i].ID_Personal);
      
          let uri = data[i].tipe_sertifikat == "SKA" ? "/api/kualifikasi_ta/hapus_status_99" : "/api/kualifikasi_tt/hapus_status_99"
      
          return new Promise((resolve, reject) => {
            axios.post(uri, formData).then(response => {
              resolve(response);
            }).catch(err => {
              reject(err);
            })
          })
        };
      })
    ).then(response => {
      this.setState({ submit_delete: false })
      this.props.refreshData()
      swal({title: "Berhasil mengajukan hapus", icon: "success"})
    }).catch(err => {
      console.log(err)
      
      this.setState({submit_delete: false})
    })
  }

  confirmPengajuan = () => {
    let selected = 0;
    let checked = this.state.checked;
    let data = this.props.data;
    let fail_status = false;
    let fail_approval = false;

    checked.map((val, i) => {
      if (val) {
        selected++;

        if (data[i].status_terbaru !== null) {
          fail_status = true;
        }
        if (data[i].diajukan == 1) {
          fail_approval = true;
        }
      }
    })

    if (fail_status) {
      swal({text: 'Data sudah naik status tidak bisa diajukan kembali', icon: "error"});
    } else if (fail_approval) {
      swal({text: 'Data sudah pernah diajukan', icon: "error"});
    } else if (selected == 0) {
      swal({text: 'Pilih data yang akan diajukan', icon: "error"});
    } else {
      this.setState({ pengajuan: true });
    }
  }

  confirmPenghapusan = () => {
    let selected = 0;
    let checked = this.state.checked;
    let data = this.props.data;
    let fail_status = false;
    let fail_approval = false;
    let fail_hapus = false;

    checked.map((val, i) => {
      if (val) {
        selected++;

        if (data[i].status_terbaru === null && data[i].diajukan === null) {
          fail_status = true;
        }
        if (data[i].status_terbaru === null && data[i].diajukan == 1) {
          fail_approval = true;
        }
        if (data[i].diajukan_hapus == 1) {
          fail_hapus = true;
        }
      }
    })

    if (fail_status) {
      swal({text: 'Data belum dapat diajukan untuk penghapusan', icon: "error"});
    } else if (fail_approval) {
      swal({text: 'Data sedang diajukan naik status', icon: "error"});
    } else if (fail_hapus) {
      swal({text: 'Data sudah diajukan untuk penghapusan', icon: "error"});
    } else if (selected == 0) {
      swal({text: 'Pilih data yang akan diajukan untuk penghapusan', icon: "error"});
    } else {
      swal({
        title: "Hapus Data?",
        icon: "warning",
        text: "Anda yakin akan mengajukan permohonan hapus data?",
        buttons: true,
        dangerMode: true
      })
      .then((confirm) => {
        if (confirm) {
          this.kirimPengajuanHapus()
        }
      });
    }
  }

  onAllCheckboxClick = (e) => {
    let checked = [];
    this.props.data.map((d, i) => {
      checked.push(e.target.checked);
    })
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
        <button className="btn btn-danger mb-3 float-right" disabled={this.state.submit_delete} style={{height: 40}} onClick={() => this.confirmPenghapusan()}>{this.state.submit_delete ? "Mengirim..." : "Minta Hapus"}</button>
        <button className="btn btn-primary mb-3 float-right mr-2" disabled={this.state.submit_approval} style={{height: 40}} onClick={() => this.confirmPengajuan()}>{this.state.submit_approval ? "Mengirim..." : "Minta Approval"}</button>
        <Table bordered>
          <tbody>
            <tr>
              <th>Aksi <br></br><input type="checkbox" onClick={this.onAllCheckboxClick}/></th>
              <th>No</th>
              <th>Sts Mohon</th>
              <th>Tgl Mohon</th>
              <th>Jns Mohon</th>
              <th>Tim Prod</th>
              <th>Tim Mktg</th>
              <th>Asosiasi</th>
              <th>USTK</th>
              <th>Prov Reg</th>
              <th>Nama</th>
              <th>NIK</th>
              <th>Prov P</th>
              <th>Sub Klasfks</th>
              <th>Sub Kualfks</th>
              <th>Sts Akhir</th>
              <th>Dokumen</th>
              {/* <th>Dokumen</th> */}
              {/* <th>Naik Status 99</th> */}
            </tr>
            {this.props.data.map((d, i) => (
              <tr key={i}>
                <td><input type="checkbox" checked={this.state.checked[i]} onClick={(e) => this.onCheckboxClick(i, e)} /></td>
                <td>{i + 1}</td>
                <td>{
                  d.deleted == 1 ?
                    <span class="badge badge-danger">Dihapus</span> :
                    (
                      d.diajukan_hapus == 1 ?
                        <span class="badge badge-warning">Minta Hapus</span> :
                        (
                          d.diajukan == 1 && d.status_terbaru == null ?
                            <span class="badge badge-primary">Minta Setuju</span> :
                            (
                              d.diajukan == 1 && d.status_terbaru == 99 ?
                                <span class="badge badge-success">Setuju</span> :
                                ''
                            )
                        )
                    )
                }</td>
                <td>{d.Tgl_Registrasi}</td>
                <td>{d.id_permohonan == 1 ? "Baru" : d.id_permohonan == 2 ? "Perpanjangan" : "Perubahan"}</td>
                <td>{d.user.marketing ? d.user.marketing.produksi.nama : (d.user.produksi ? d.user.produksi.nama : "-")}</td>
                <td>{d.user.marketing ? d.user.marketing.nama : "-"}</td>
                <td>{d.ID_Asosiasi_Profesi}</td>
                <td>{d.id_unit_sertifikasi}</td>
                <td>{d.tipe_sertifikat == "SKA" ? d.ID_Propinsi_reg : d.ID_propinsi_reg}</td>
                <td>{d.personal.Nama}</td>
                <td>{d.ID_Personal}</td>
                <td>{d.personal.provinsi ? d.personal.provinsi.nama_singkat : ''}</td>
                <td>{d.ID_Sub_Bidang}</td>
                <td>{d.ID_Kualifikasi}</td>
                <td>{d.status_terbaru}</td>
                <td><a className="fancybox" data-fancybox data-type="iframe" data-src={"/pdf/?src=document&profesi=" + (d.tipe_sertifikat == "SKA" ? "1" : "2") + "&data=" + d.doc_url} href="javascript:;">View</a></td>
                {/* <td><a className="fancybox" data-fancybox data-type="iframe" data-src={"/document?profesi= " + this.props.tipe_profesi + "&data=" + d.doc_url} href="javascript:;">View</a></td> */}
                {/* <td className="text-center">
                  {d.status_terbaru == null && d.diajukan != "1" && !this.state.diajukan[i] && !this.state.submiting[i] && (
                    <Button variant="outline-success" size="sm" onClick={() => this.confirmPengajuan(i, (this.props.tipe_profesi == 1 ? d.ID_Registrasi_TK_Ahli : d.ID_Registrasi_TK_Trampil), d.Tgl_Registrasi, d.ID_Personal)}>Ajukan</Button>
                  )}
                  {((d.diajukan == "1" && d.status_terbaru == null) || this.state.diajukan[i]) && (
                    <span className="badge badge-success">Sudah diajukan</span>
                  )}
                  {this.state.submiting[i] && (
                    <div class="spinner-border spinner-border-sm text-success" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                  )}
                </td> */}
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
