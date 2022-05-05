import React, { Component } from "react";
import './css/antd.css';
import './css/default.less';
import './css/antd.less'; // Import Ant Design styles by less entry
import { DownloadOutlined, InboxOutlined } from '@ant-design/icons';
import readXlsxFile from "read-excel-file";
import axios from 'axios';
import { Row, Col, Table, PageHeader, Button, Tabs, Upload, message, Layout, Space } from 'antd';

var xlsx = require("xlsx")

const { TabPane } = Tabs;
const { Dragger } = Upload;
const { Header, Footer, Sider, Content } = Layout;
const columns = [

    {
        title: 'Child Part Number',
        dataIndex: 'ChildPartNumber',
        key: 'ChildPartNumber',
    },
    {
        title: 'Child Part Description',
        dataIndex: 'ChildPartDescription',
        key: 'ChildPartDescription',
    },
    {
        title: 'Item Reference Number',
        dataIndex: 'ItemReferenceNumber',
        key: 'ItemReferenceNumber',
    },
    {
        title: 'Quantity Production',
        dataIndex: 'QuantityProduction',
        key: 'QuantityProduction',
    },
];
var schema = {
    ChildPartNumber: { prop: "ChildPartNumber", type: String },
    ChildPartDescription: { prop: "ChildPartDescription", type: String },
    ItemReferenceNumber: { prop: "ItemReferenceNumber", type: String },
    QuantityProduction: { prop: "QuantityProduction", type: String },
};

class ExcelUtility extends Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: null, existingRecords: null }
    }
    onFileSelect = (e) => {
        var file = e.target.files[0];
        readXlsxFile(file, {
            schema, transformData(data) {
                return data;
            },
        }).then((fileContent) => {
            this.setState({ dataSource: fileContent.rows });
            console.log(fileContent);

        })
    }
    resetSelection = () => {

    }

    uploadFile = () => {
        axios.post('http://localhost:105/excelUtility/uploadFile', { data: this.state.dataSource })
            .then(function (response) {
                console.log(response);
            });
    }

    getRecords = () => {
        axios.post('http://localhost:105/excelUtility/getRecords', { data: this.state.existingRecords })
            .then(function (response) {
                this.setState({ existingRecords: response })
                console.log(response);
            });
    }
    render() {
        return (
            <React.Fragment>
                <PageHeader
                    className="site-page-header"
                    onBack={() => null}
                    title="Excel Utility "
                    subTitle="Bulk Data Import"
                />
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}> <Content>
                        <Row>
                            <Space>
                                <input type="file"
                                    onChange={this.onFileSelect}
                                    onClick={this.resetSelection}
                                    accept=".xlsx, .xls, .csv" ></input>
                                <Button type="primary" icon={<DownloadOutlined />} onClick={this.uploadFile} >
                                    Upload File
                                </Button>

                                <Button type="primary" onClick={this.getRecords} >
                                    Get Saved Records
                                </Button>
                            </Space>
                        </Row>
                        <br />
                        <Row>
                            <Col >
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="File Data" key="1">
                                        <Table dataSource={this.state.dataSource} columns={columns} size="small" pagination={5} />;
                                    </TabPane>
                                    <TabPane tab="Existing Records" key="2">
                                        <Table dataSource={this.state.existingRecords} columns={columns} size="small" pagination={5} />;
                                    </TabPane>
                                </Tabs>


                            </Col>

                        </Row>
                    </Content>
                    </Col>
                    <Col span={4}></Col>
                </Row>


            </React.Fragment >
        )
    }
}

export default ExcelUtility;