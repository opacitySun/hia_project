import React from 'react';

import {Button, Col, Input, message, Modal, Progress, Row, Select, Table, Upload} from 'antd';
import NetUtil from "../../../constants/httpUtil";

import {VHStrUtil} from "../../../constants/utils";
// import {TemplateService} from "../../../process/LoadService";
// import {HospitalInfo, HospitalOrg} from "../../../../admin/page/util/hospital";
// import {requestExcel} from "../../../../../constants/request";
// import XLSX from 'xlsx'
const Option = Select.Option;
// const templateService = new TemplateService();

const url = NetUtil.getUrl()+"/api/";

/**
 * 导入弹框
 *
 * 需要设置的属性：
 * 必传:            tableName：导入表名         例如 tableName="bd_charges_sta"
 * 必传:            ref="uploadModal" 固定
 * 必传：           ｛...this.props｝      需要connect过bdDict，userExt,user
 * 由于个人技术原因，需要传入props，并且connect过bdDict，userExt,user三个，目前使用到的已修改
 *
 *
 * 非必传（默认0）:  importDict:是否并提取字典，1是，0否,,    已写死为1（20180310）
 *
 *  需要弹出此弹框，设置方法内容为  this.refs.uploadModal.setState({visible:true})  即可
 *
 *
 *
 */
// @connect(state => ({
//   user: state.user,
// }))

class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorDataSource: [],//错误信息的数据
      visible:false,//Modal是否可见
      tableName:"",//导入表名
      tableDisplay:"none",//是否显示错误信息列表（有错误信息才显示）
      uploadFile:null,//浏览的需要上传的 文件
      action:"excel-upload",//url中/api/之后内容
      uploadPercent: 0,//上传进度%
      validatePercent: 0,//校验进度%
      templateName:"",//显示的模板名称
      startUpload:false,//控制开始上传的字段，选择文件后等待，此值为true后开始上传
      hospital:"",//选择的医院
      progressStatus: 'active',//进度条status
      progressLabel: "上传进度:",//进度条左侧label内容
      uploading: true,//是否正在上传，是的话，上传按钮置为不可用，防止重复点击
      importDict: 1,//是否提取字典
      accYear: "",//年度
      ...props
    };
    this.columns =[{
      title: '序号',
      dataIndex: 'key',
      width: '15%',
    },{
      title: '错误信息',
      dataIndex: 'error',
      width: '85%',
    }]
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }


  startUpload = () =>{
    if(this.checkUpload()){
      this.setState({startUpload:true})
    }
  }

  checkUpload =() =>{
    const {accYear,hospital} = this.state;
    if(VHStrUtil.isNullOrEmpty(accYear)){
      message.info("请选择年度");
      return false;
    }
    if(VHStrUtil.isNullOrEmpty(hospital)){
      message.info("所属单位请选择医院节点");
      return false;
    }
    return true;
  }


  componentWillMount(){
    // templateService.getTemplateName(this.state.tableName,(result)=>{
    //   if(result && result.length>0){
    //     this.setState({templateName:result[0].templateName})
    //   }
    // })
  }

  //校验进度刷新
  startValidate = (interval, info) => {
    setTimeout(() => {
      let {validatePercent,progressStatus} = this.state;
      if (info) {
        if (validatePercent >= 100) {
          message.success(`${info.file.name} 文件上传成功`);
          this.setState({
            validatePercent: 100,
            progressStatus: "success",
          });
          this.props.uploadSuc(this.state.accYear,this.state.hospital);
        } else {
          this.setState({validatePercent: (parseFloat(validatePercent) + 2.02).toFixed(2)});
          this.startValidate(40, info);
        }
      } else if (validatePercent < 90 && progressStatus!=="exception") {
        this.setState({validatePercent: (parseFloat(validatePercent) + 0.12).toFixed(2)});
        this.startValidate(40);
      } else if (validatePercent < 99 && progressStatus!=="exception") {
        this.setState({validatePercent: (parseFloat(validatePercent) + 0.04).toFixed(2)});
        this.startValidate(200);
      }
    }, interval)
  };

  //导入弹框隐藏时执行的方法
  onCancel =() =>{
    this.waitUpload(null,null);
    this.setState({visible: false,
      uploadFile:null,
      startUpload:false,
      uploadPercent:0,
      errorDataSource:[],
      progressLabel:"上传进度:",
      progressStatus:"active",
      uploading:true,
      validatePercent:0});
  }

  // downloadExl = (json, downName, type) => {  // 导出到excel
  //   let keyMap = [] // 获取键
  //   for (let k in json[0]) {
  //     keyMap.push(k)
  //   }
  //   console.info('keyMap', keyMap, json)
  //   let tmpdata = [] // 用来保存转换好的json
  //   json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
  //     v: v[k],
  //     position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
  //   }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
  //     tmpdata[v.position] = {
  //       v: v.v
  //     }
  //   })
  //   let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
  //   let tmpWB = {
  //     SheetNames: ['mySheet'], // 保存的表标题
  //     Sheets: {
  //       'mySheet': Object.assign({},
  //         tmpdata, // 内容
  //         {
  //           '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
  //         })
  //     }
  //   }
  //   let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
  //     {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
  //   ))], {
  //     type: ''
  //   })  // 创建二进制对象写入转换好的字节流
  //   var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
  //
  //   var a = document.createElement('a');
  //   a.href = href;
  //   a.download = downName + '.xlsx';
  //   a.click();
  //
  //   setTimeout(function () {  // 延时释放
  //     URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
  //   }, 100)
  // }

  // s2ab = (s) => { // 字符串转字符流
  //   var buf = new ArrayBuffer(s.length)
  //   var view = new Uint8Array(buf)
  //   for (var i = 0; i !== s.length; ++i) {
  //     view[i] = s.charCodeAt(i) & 0xFF
  //   }
  //   return buf
  // }

  // //导出错误信息
  // exportErrors =() =>{
  //   const {errorDataSource,templateName} = this.state
  //   this.downloadExl(errorDataSource, `${templateName}错误日志`)
  // }

  //浏览选择文件后执行的方法，等待点击“上传”
  waitUpload =(resolve,file) =>{
    const {visible,startUpload} = this.state;
    if (startUpload) {
      resolve(file);
      this.setState({startUpload: false, errorDataSource: [], progressStatus: "active", uploadPercent: 0,uploading:true});
    } else if(visible){
      setTimeout(() => {
        this.waitUpload(resolve, file)
      }, 500);
    }
  }

  //上传状态变化，包括进度改变等
  handleChange = (info) => {
    let status = info.file.status;
    const {uploadPercent} = this.state;
    const response = info.file.response;

    if (response !== undefined) {
      //收到服务器端返回内容后执行
      if (response.status !== 1) {
        this.setState({ progressStatus: "exception",uploading:false});
        status = 'error';
        const con = <div style={{display:"flex",flexDirection:'column',justifyContent:'space-between'}}>
          <span>{response.message?response.message:"未知原因"}</span>
        </div>;
        Modal.error({
          title: "验证失败",
          content: con
        })

        // this.handleErrorInfo(info);
      }
    }

    if (info.event && info.event.percent) {
      let percent = info.event.percent.toFixed(2);
      this.setState({uploadPercent: percent,progressLabel:"正在上传:"});
      if (parseFloat(percent) >= 100) {
        //上传完成，进入下一步骤
        this.setState({progressStatus: "active",progressLabel:"正在校验:"});
        this.startValidate(5)
      }
    }
    if (status === 'done') {
      this.startValidate(2, info);
    } else if (status === 'error') {
      if(Window.progress){
        Window.progress.close();
      }
      if (uploadPercent < 100) {
        message.error(`${info.file.name} 文件上传失败`);
        this.setState({progressStatus: "exception"})
      }
    }
  };

  //整理错误信息
  handleErrorInfo =(info) =>{
    const {errorDataSource} = this.state;
    const results = info.file.response?info.file.response.result:null;
    if (results!==null && results.length > 0) {
      for (let i = 0, len = results.length; i < len; i++) {
        let result = results[i];
        if (result.error !== undefined && result.error.length > 0) {
          for (let j = 0, len = result.error.length; j < len; j++) {
            let error = result.error[j];
            error.row = result.row;
            errorDataSource.push(error);
          }
        }
      }
    }
    this.setState({errorDataSource:errorDataSource.map((error,index)=>Object.assign({},{key:index+1,error:`第 ${error.row} 行的 ${error.column} ${error.message.substring(0,error.message.indexOf("/"))}`}))})
  }

  // getHospitalValue = (value)=>{
  //   this.setState({hospital:HospitalInfo.getIsHospital(value.hospitalValue)==1?HospitalInfo.getHospitalCode(value.hospitalValue):null});
  // };

  render() {

    const {visible,tableName,uploadPercent,
      validatePercent,action,uploadFile,
      errorDataSource,templateName,
      hospital,progressStatus,progressLabel,
      uploading,importDict,accYear
    } = this.state;

    const token = localStorage.getItem('token');

    if(VHStrUtil.isNullOrEmpty(action)){
      this.setState({action:"excel-upload"});
    }

    const uploadProps = {
    // action: `sso/${action}`,
    action: 'api/upload',
      accept: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      showUploadList: false,
      onChange: this.handleChange,
      headers: {token},
    // data: {
    //   pkHospital: hospital,
    //     // creator: "test",
    //     creator: this.props.user.currentUser.name,
    //     importDict: 1,
    //     accYear: accYear,
    //     dbTableName: tableName,
    // },
    // beforeUpload: (file) => {
    //   this.setState({uploadFile:file,uploading:false});
    //   return new Promise((resolve,file) => {
    //     this.waitUpload(resolve,file)
    //   });
    // },
  }
    const tableDisplay = errorDataSource.length>0?"flex":"none";

    return (
      <Modal visible={visible}
             width={600}
             destroyOnClose={true}
             maskClosable={false}
             onCancel={this.onCancel}
             footer={null}
             title={"导入"}
             closable={true}>

        {/*<Row gutter={24} type="flex" align="middle">*/}
          {/*<Col span={2}/>*/}
          {/*<Col span={4}>导入年度:</Col>*/}
          {/*<Col span={8}>*/}
            {/*/!*<Select allowClear style={{width:"100%"}} onSelect={(value)=>this.setState({accYear:value})}>*!/*/}
              {/*/!*{this.props.bdDict.yearList.map((item) => {*!/*/}
                {/*/!*return <Option key={item.codeId} value={item.codeId}>{item.codeName}</Option>*!/*/}
              {/*/!*})}*!/*/}
            {/*/!*</Select>*!/*/}
          {/*</Col>*/}
        {/*</Row>*/}

        {/*<Row gutter={24} style={{marginTop:"10px"}} type="flex" align="middle">*/}
          {/*/!*<Col span={2}/>*!/*/}
          {/*<Col span={4}>所属单位:</Col>*/}
          {/*<Col span={8}>*/}
            {/*/!*<HospitalOrg style={{width:'100%'}} getHospitalValue={this.getHospitalValue.bind(this)}/>*!/*/}
          {/*</Col>*/}
        {/*</Row>*/}

        <Row gutter={24} style={{marginTop:"10px"}} type="flex" align="middle">
          {/*<Col span={2}/>*/}
          <Col span={4}><span style={{verticalAlign: "center"}}>模板下载：</span></Col>
          <Col span={8}><a href={`/public/${templateName}`}>{templateName}</a></Col>
        </Row>

        <Row gutter={24} style={{marginTop:"10px"}} type="flex" align="middle">
          {/*<Col span={2}/>*/}
          <Col span={4} >选择文件：</Col>
          <Col span={8}><Input style={{width:"100%"}} value={uploadFile && uploadFile.name} disabled={true}/></Col>
          <Col span={3}><Upload {...uploadProps}><Button type={uploadFile!==null?"":"primary"}>浏览</Button></Upload></Col>
          <Col span={3}><Button onClick={this.startUpload} type={uploadFile!==null?"primary":""} disabled={uploading}>上传</Button></Col>
          {/*<Col span={4}><Button onClick={this.exportErrors} type={uploadFile!==null?"primary":""} disabled={errorDataSource.length===0}>导出错误日志</Button></Col>*/}
        </Row>

        <Row gutter={24} style={{marginTop:"10px"}} type="flex" align="middle">
          {/*<Col span={2}/>*/}
          <Col span={4} >{progressLabel}</Col>
          <Col span={20}><Progress percent={uploadPercent>=100?validatePercent:uploadPercent} status={progressStatus}/></Col>
        </Row>

        <Row gutter={24} style={{marginTop:"10px",display:tableDisplay}} type="flex" align="middle">
          {/*<Col span={2}/>*/}
          <Col span={24} >
            <Table columns={this.columns}
                   bordered
                   pagination={{pageSize: 5,hideOnSinglePage:true,size:"small"}}
                   size='small'
                   dataSource={this.state.errorDataSource}/>
          </Col>
        </Row>

      </Modal>
    )
  }

}

export default UploadModal;
